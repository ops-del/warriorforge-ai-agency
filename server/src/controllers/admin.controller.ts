import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { automationsService } from "../services/automations.service";
import { ordersService } from "../services/orders.service";
import { toAutomationDTO, toOrderWithAutomationDTO } from "../types/dto";
import { AppError } from "../utils/AppError";

function parseId(value: string, label: string) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
  return parsed;
}

export async function adminLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password } = req.body;
    if (!password || password !== env.ADMIN_PASSWORD) {
      throw new AppError("Unauthorized", 401);
    }

    res.json({ token: env.ADMIN_PASSWORD });
  } catch (error) {
    next(error);
  }
}

export async function adminListAutomations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const automations = await automationsService.listAutomations();
    res.json(automations.map(toAutomationDTO));
  } catch (error) {
    next(error);
  }
}

export async function adminCreateAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const automation = await automationsService.createAutomation(req.body);
    res.status(201).json(toAutomationDTO(automation));
  } catch (error) {
    next(error);
  }
}

export async function adminUpdateAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseId(req.params.id, "automation id");
    const automation = await automationsService.updateAutomation(id, req.body);
    res.json(toAutomationDTO(automation));
  } catch (error) {
    next(error);
  }
}

export async function adminDeleteAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseId(req.params.id, "automation id");
    await automationsService.deleteAutomation(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listAdminOrders(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await ordersService.listOrders();
    res.json(orders.map(toOrderWithAutomationDTO));
  } catch (error) {
    next(error);
  }
}

export async function getAdminOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseId(req.params.id, "order id");
    const order = await ordersService.getOrderById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    res.json(toOrderWithAutomationDTO(order));
  } catch (error) {
    next(error);
  }
}
