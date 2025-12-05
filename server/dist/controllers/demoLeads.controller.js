"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateDemoLead = handleCreateDemoLead;
exports.handleListDemoLeads = handleListDemoLeads;
exports.handleGetDemoLead = handleGetDemoLead;
const AppError_1 = require("../utils/AppError");
const demoLeads_service_1 = require("../services/demoLeads.service");
const email_service_1 = require("../services/email.service");
const dto_1 = require("../types/dto");
const requiredFields = ["automationSlug", "automationName", "name", "email"];
function validateLeadPayload(body) {
    for (const field of requiredFields) {
        if (!body[field] || typeof body[field] !== "string") {
            throw new AppError_1.AppError(`Missing field: ${field}`, 400);
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
async function handleCreateDemoLead(req, res, next) {
    try {
        const payload = validateLeadPayload(req.body);
        const lead = await (0, demoLeads_service_1.createDemoLead)(payload);
        (0, email_service_1.sendDemoLeadEmail)(lead).catch((error) => {
            console.error("Failed to send demo lead email - demoLeads.controller.ts:47", error);
        });
        res.status(201).json((0, dto_1.toDemoLeadDTO)(lead));
    }
    catch (error) {
        next(error);
    }
}
async function handleListDemoLeads(_req, res, next) {
    try {
        const leads = await (0, demoLeads_service_1.listDemoLeads)();
        res.json(leads.map(dto_1.toDemoLeadDTO));
    }
    catch (error) {
        next(error);
    }
}
async function handleGetDemoLead(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw new AppError_1.AppError("Invalid lead id", 400);
        }
        const lead = await (0, demoLeads_service_1.getDemoLeadById)(id);
        if (!lead) {
            throw new AppError_1.AppError("Lead not found", 404);
        }
        res.json((0, dto_1.toDemoLeadDTO)(lead));
    }
    catch (error) {
        next(error);
    }
}
