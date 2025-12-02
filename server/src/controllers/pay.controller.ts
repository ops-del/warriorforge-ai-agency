import { NextFunction, Request, Response } from "express";
import { automationsService } from "../services/automations.service";
import {
  constructStripeEvent,
  createAutomationPaymentIntent,
  stripeService,
} from "../integrations/stripe";
import { AppError } from "../utils/AppError";

export async function createPaymentIntent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!stripeService.isConfigured()) {
      throw new AppError("Stripe is not configured", 503);
    }

    const automationId = Number(req.body.automationId);
    if (Number.isNaN(automationId)) {
      throw new AppError("Invalid automationId", 400);
    }

    const automation = await automationsService.getAutomationById(automationId);

    const paymentIntent = await createAutomationPaymentIntent(
      automation,
      req.body.email
    );

    res.status(201).json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    next(error);
  }
}

export async function stripeWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const signature = req.headers["stripe-signature"];
    const event = constructStripeEvent(signature, req.body as Buffer);
    const payload = event.data.object as { id?: string };

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment succeeded", payload.id ?? "unknown");
        break;
      case "payment_intent.payment_failed":
        console.warn("Payment failed", payload.id ?? "unknown");
        break;
      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
}
