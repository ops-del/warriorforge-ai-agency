import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import {
  createDemoLead,
  getDemoLeadById,
  listDemoLeads,
} from "../services/demoLeads.service";
import { sendDemoLeadEmail } from "../services/email.service";
import { toDemoLeadDTO } from "../types/dto";

const requiredFields = ["automationSlug", "automationName", "name", "email"];

function validateLeadPayload(body: Record<string, unknown>) {
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== "string") {
      throw new AppError(`Missing field: ${field}`, 400);
    }
  }

  return {
    automationSlug: String(body.automationSlug),
    automationName: String(body.automationName),
    name: String(body.name),
    email: String(body.email),
    phone: body.phone ? String(body.phone) : undefined,
    company: body.company ? String(body.company) : undefined,
    website: body.website ? String(body.website) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  };
}

export async function handleCreateDemoLead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = validateLeadPayload(req.body);
    const lead = await createDemoLead(payload);

    sendDemoLeadEmail(lead).catch((error) => {
      console.error(
        "Failed to send demo lead email - demoLeads.controller.ts:47",
        error
      );
    });

    res.status(201).json(toDemoLeadDTO(lead));
  } catch (error) {
    next(error);
  }
}

export async function handleListDemoLeads(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const leads = await listDemoLeads();
    res.json(leads.map(toDemoLeadDTO));
  } catch (error) {
    next(error);
  }
}

export async function handleGetDemoLead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError("Invalid lead id", 400);
    }

    const lead = await getDemoLeadById(id);
    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    res.json(toDemoLeadDTO(lead));
  } catch (error) {
    next(error);
  }
}
