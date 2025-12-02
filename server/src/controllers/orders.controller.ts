import { NextFunction, Request, Response } from "express";
import { ordersService } from "../services/orders.service";
import { sendNewOrderEmail } from "../services/email.service";
import { toOrderDTO } from "../types/dto";
import { AppError } from "../utils/AppError";

const requiredFields = [
  "automationId",
  "businessName",
  "contactName",
  "email",
  "phone",
  "businessType",
  "wantsMaintenance",
];

function validateOrderPayload(body: Record<string, unknown>) {
  for (const field of requiredFields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
    ) {
      throw new AppError(`Missing required field: ${field}`, 400);
    }
  }

  const wantsMaintenance =
    body.wantsMaintenance === true ||
    body.wantsMaintenance === "true" ||
    body.wantsMaintenance === 1;

  return {
    automationId: Number(body.automationId),
    businessName: String(body.businessName),
    contactName: String(body.contactName),
    email: String(body.email),
    phone: String(body.phone),
    website: body.website ? String(body.website) : undefined,
    businessType: String(body.businessType),
    notes: body.notes ? String(body.notes) : undefined,
    wantsMaintenance,
  };
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = validateOrderPayload(req.body);
    if (Number.isNaN(payload.automationId)) {
      throw new AppError("Invalid automationId", 400);
    }

    const { order, automation } = await ordersService.createOrder(payload);
    await sendNewOrderEmail(order, automation);

    res
      .status(201)
      .json({ message: "Order created", order: toOrderDTO(order) });
  } catch (error) {
    next(error);
  }
}

export async function listOrders(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await ordersService.listOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError("Invalid order id", 400);
    }

    const order = await ordersService.getOrderById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}
