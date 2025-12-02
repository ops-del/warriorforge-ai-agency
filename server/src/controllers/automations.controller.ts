import { NextFunction, Request, Response } from "express";
import { automationsService } from "../services/automations.service";
import { toAutomationDTO } from "../types/dto";
import { AppError } from "../utils/AppError";

function toId(value: string) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new AppError("Invalid identifier", 400);
  }
  return parsed;
}

export async function listAutomations(
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

export async function getAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = toId(req.params.id);
    const automation = await automationsService.getAutomationById(id);
    res.json(toAutomationDTO(automation));
  } catch (error) {
    next(error);
  }
}

export async function createAutomation(
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

export async function updateAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = toId(req.params.id);
    const automation = await automationsService.updateAutomation(id, req.body);
    res.json(toAutomationDTO(automation));
  } catch (error) {
    next(error);
  }
}

export async function deleteAutomation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = toId(req.params.id);
    await automationsService.deleteAutomation(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
