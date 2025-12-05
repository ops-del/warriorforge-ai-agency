"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersService = void 0;
const prisma_1 = require("../db/prisma");
const automations_service_1 = require("./automations.service");
async function createOrder(data) {
    const automation = await automations_service_1.automationsService.getAutomationById(data.automationId);
    const order = await prisma_1.prisma.order.create({ data });
    return { order, automation };
}
async function listOrders() {
    return prisma_1.prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { automation: true },
    });
}
async function getOrderById(id) {
    return prisma_1.prisma.order.findUnique({
        where: { id },
        include: { automation: true },
    });
}
exports.ordersService = {
    createOrder,
    listOrders,
    getOrderById,
};
