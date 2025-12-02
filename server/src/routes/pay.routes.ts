import { Router } from "express";
import { stripePlaceholder } from "../integrations/stripe";

const router = Router();

router.post("/", (_req, res) => {
  // To integrate Stripe for real, install the official SDK, add STRIPE_SECRET_KEY/WEBHOOK_SECRET env vars,
  // instantiate a Stripe client here, and create Checkout Sessions or PaymentIntents before returning the URL/client secret.
  res.json(stripePlaceholder());
});

export default router;
