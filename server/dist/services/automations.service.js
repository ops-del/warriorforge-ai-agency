"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automationsService = void 0;
const prisma_1 = require("../db/prisma");
const AppError_1 = require("../utils/AppError");
async function listAutomations() {
    return prisma_1.prisma.automation.findMany({
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
}
async function getAutomationById(id) {
    const automation = await prisma_1.prisma.automation.findUnique({ where: { id } });
    if (!automation) {
        throw new AppError_1.AppError("Automation not found", 404);
    }
    return automation;
}
async function createAutomation(data) {
    return prisma_1.prisma.automation.create({ data });
}
async function updateAutomation(id, data) {
    await getAutomationById(id);
    return prisma_1.prisma.automation.update({ where: { id }, data });
}
async function deleteAutomation(id) {
    await getAutomationById(id);
    return prisma_1.prisma.automation.delete({ where: { id } });
}
exports.automationsService = {
    listAutomations,
    getAutomationById,
    createAutomation,
    updateAutomation,
    deleteAutomation,
};
