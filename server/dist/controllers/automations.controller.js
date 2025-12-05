"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAutomations = listAutomations;
exports.getAutomation = getAutomation;
exports.createAutomation = createAutomation;
exports.updateAutomation = updateAutomation;
exports.deleteAutomation = deleteAutomation;
const automations_service_1 = require("../services/automations.service");
const dto_1 = require("../types/dto");
const AppError_1 = require("../utils/AppError");
function toId(value) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new AppError_1.AppError("Invalid identifier", 400);
    }
    return parsed;
}
async function listAutomations(_req, res, next) {
    try {
        const automations = await automations_service_1.automationsService.listAutomations();
        res.json(automations.map(dto_1.toAutomationDTO));
    }
    catch (error) {
        next(error);
    }
}
async function getAutomation(req, res, next) {
    try {
        const id = toId(req.params.id);
        const automation = await automations_service_1.automationsService.getAutomationById(id);
        res.json((0, dto_1.toAutomationDTO)(automation));
    }
    catch (error) {
        next(error);
    }
}
async function createAutomation(req, res, next) {
    try {
        const automation = await automations_service_1.automationsService.createAutomation(req.body);
        res.status(201).json((0, dto_1.toAutomationDTO)(automation));
    }
    catch (error) {
        next(error);
    }
}
async function updateAutomation(req, res, next) {
    try {
        const id = toId(req.params.id);
        const automation = await automations_service_1.automationsService.updateAutomation(id, req.body);
        res.json((0, dto_1.toAutomationDTO)(automation));
    }
    catch (error) {
        next(error);
    }
}
async function deleteAutomation(req, res, next) {
    try {
        const id = toId(req.params.id);
        await automations_service_1.automationsService.deleteAutomation(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
