"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.listOrders = listOrders;
exports.getOrder = getOrder;
const orders_service_1 = require("../services/orders.service");
const email_service_1 = require("../services/email.service");
const dto_1 = require("../types/dto");
const AppError_1 = require("../utils/AppError");
const requiredFields = [
    "automationId",
    "businessName",
    "contactName",
    "email",
    "phone",
    "businessType",
    "wantsMaintenance",
];
function validateOrderPayload(body) {
    for (const field of requiredFields) {
        if (body[field] === undefined ||
            body[field] === null ||
            body[field] === "") {
            throw new AppError_1.AppError(`Missing required field: ${field}`, 400);
        }
    }
    const wantsMaintenance = body.wantsMaintenance === true ||
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
async function createOrder(req, res, next) {
    try {
        const payload = validateOrderPayload(req.body);
        if (Number.isNaN(payload.automationId)) {
            throw new AppError_1.AppError("Invalid automationId", 400);
        }
        const { order, automation } = await orders_service_1.ordersService.createOrder(payload);
        await (0, email_service_1.sendNewOrderEmail)(order, automation);
        res
            .status(201)
            .json({ message: "Order created", order: (0, dto_1.toOrderDTO)(order) });
    }
    catch (error) {
        next(error);
    }
}
async function listOrders(_req, res, next) {
    try {
        const orders = await orders_service_1.ordersService.listOrders();
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
}
async function getOrder(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw new AppError_1.AppError("Invalid order id", 400);
        }
        const order = await orders_service_1.ordersService.getOrderById(id);
        if (!order) {
            throw new AppError_1.AppError("Order not found", 404);
        }
        res.json(order);
    }
    catch (error) {
        next(error);
    }
}
