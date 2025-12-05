"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = require("../integrations/stripe");
const router = (0, express_1.Router)();
router.post("/", (_req, res) => {
    // To integrate Stripe for real, install the official SDK, add STRIPE_SECRET_KEY/WEBHOOK_SECRET env vars,
    // instantiate a Stripe client here, and create Checkout Sessions or PaymentIntents before returning the URL/client secret.
    res.json((0, stripe_1.stripePlaceholder)());
});
exports.default = router;
