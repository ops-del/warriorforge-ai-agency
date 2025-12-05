"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDemoLead = createDemoLead;
exports.listDemoLeads = listDemoLeads;
exports.getDemoLeadById = getDemoLeadById;
const prisma_1 = require("../db/prisma");
function createDemoLead(data) {
    return prisma_1.prisma.demoLead.create({ data });
}
function listDemoLeads() {
    return prisma_1.prisma.demoLead.findMany({ orderBy: { createdAt: "desc" } });
}
function getDemoLeadById(id) {
    return prisma_1.prisma.demoLead.findUnique({ where: { id } });
}
