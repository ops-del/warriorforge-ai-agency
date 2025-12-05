"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = adminLogin;
exports.adminListAutomations = adminListAutomations;
exports.adminCreateAutomation = adminCreateAutomation;
exports.adminUpdateAutomation = adminUpdateAutomation;
exports.adminDeleteAutomation = adminDeleteAutomation;
exports.listAdminOrders = listAdminOrders;
exports.getAdminOrder = getAdminOrder;
const env_1 = require("../config/env");
const automations_service_1 = require("../services/automations.service");
const orders_service_1 = require("../services/orders.service");
const dto_1 = require("../types/dto");
const AppError_1 = require("../utils/AppError");
function parseId(value, label) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new AppError_1.AppError(`Invalid ${label}`, 400);
    }
    return parsed;
}
async function adminLogin(req, res, next) {
    try {
        const { password } = req.body;
        if (!password || password !== env_1.env.ADMIN_PASSWORD) {
            throw new AppError_1.AppError("Unauthorized", 401);
        }
        res.json({ token: env_1.env.ADMIN_PASSWORD });
    }
    catch (error) {
        next(error);
    }
}
async function adminListAutomations(_req, res, next) {
    try {
        const automations = await automations_service_1.automationsService.listAutomations();
        res.json(automations.map(dto_1.toAutomationDTO));
    }
    catch (error) {
        next(error);
    }
}
async function adminCreateAutomation(req, res, next) {
    try {
        const automation = await automations_service_1.automationsService.createAutomation(req.body);
        res.status(201).json((0, dto_1.toAutomationDTO)(automation));
    }
    catch (error) {
        next(error);
    }
}
async function adminUpdateAutomation(req, res, next) {
    try {
        const id = parseId(req.params.id, "automation id");
        const automation = await automations_service_1.automationsService.updateAutomation(id, req.body);
        res.json((0, dto_1.toAutomationDTO)(automation));
    }
    catch (error) {
        next(error);
    }
}
async function adminDeleteAutomation(req, res, next) {
    try {
        const id = parseId(req.params.id, "automation id");
        await automations_service_1.automationsService.deleteAutomation(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
async function listAdminOrders(_req, res, next) {
    try {
        const orders = await orders_service_1.ordersService.listOrders();
        res.json(orders.map(dto_1.toOrderWithAutomationDTO));
    }
    catch (error) {
        next(error);
    }
}
async function getAdminOrder(req, res, next) {
    try {
        const id = parseId(req.params.id, "order id");
        const order = await orders_service_1.ordersService.getOrderById(id);
        if (!order) {
            throw new AppError_1.AppError("Order not found", 404);
        }
        res.json((0, dto_1.toOrderWithAutomationDTO)(order));
    }
    catch (error) {
        next(error);
    }
}
