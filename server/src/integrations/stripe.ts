import crypto from "node:crypto";
import { Automation } from "@prisma/client";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

interface StripePaymentIntent {
  id: string;
  client_secret?: string;
  amount: number;
  currency: string;
  status: string;
}

export interface StripeEvent<T = unknown> {
  id: string;
  type: string;
  data: { object: T };
}

async function stripeRequest<T>(path: string, params: URLSearchParams): Promise<T> {
  if (!env.STRIPE_SECRET_KEY) {
    throw new AppError("Stripe is not configured", 503);
  }

  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
    },
    body: params,
  });

  const body = (await response.json()) as { error?: { message?: string } };

  if (!response.ok) {
    const message = body.error?.message ?? "Stripe request failed";
    throw new AppError(message, response.status);
  }

  return body as T;
}

export async function createAutomationPaymentIntent(
  automation: Automation,
  customerEmail?: string
) {
  const params = new URLSearchParams({
    amount: automation.setupPrice.toString(),
    currency: "usd",
    "automatic_payment_methods[enabled]": "true",
    description: `Setup fee for ${automation.name}`,
    "metadata[automationId]": String(automation.id),
    "metadata[automationSlug]": automation.slug,
    "metadata[automationName]": automation.name,
  });

  if (customerEmail) {
    params.append("receipt_email", customerEmail);
  }

  return stripeRequest<StripePaymentIntent>("payment_intents", params);
}

export function constructStripeEvent(
  signatureHeader: string | string[] | undefined,
  payload: Buffer
): StripeEvent {
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new AppError("Stripe webhook secret is not configured", 503);
  }

  if (!signatureHeader || Array.isArray(signatureHeader)) {
    throw new AppError("Invalid Stripe signature header", 400);
  }

  const parts = signatureHeader
    .split(",")
    .map((part) => part.split("=", 2))
    .reduce<Record<string, string>>((acc, [key, value]) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {});

  const timestamp = parts.t;
  const signature = parts.v1;

  if (!timestamp || !signature) {
    throw new AppError("Invalid Stripe signature header", 400);
  }

  const signedPayload = `${timestamp}.${payload.toString("utf8")}`;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload)
    .digest("hex");

  const isValid =
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(signature, "hex")
    );

  if (!isValid) {
    throw new AppError("Stripe signature verification failed", 400);
  }

  return JSON.parse(payload.toString("utf8")) as StripeEvent;
}

export const stripeService = {
  isConfigured: () => Boolean(env.STRIPE_SECRET_KEY),
  isWebhookConfigured: () => Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
};
