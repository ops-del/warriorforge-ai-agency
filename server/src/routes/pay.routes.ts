import { Router } from "express";
import { createPaymentIntent } from "../controllers/pay.controller";

const router = Router();

router.post("/", createPaymentIntent);

export default router;
