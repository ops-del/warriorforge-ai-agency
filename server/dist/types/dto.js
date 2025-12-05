"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAutomationDTO = toAutomationDTO;
exports.toOrderDTO = toOrderDTO;
exports.toOrderWithAutomationDTO = toOrderWithAutomationDTO;
exports.toDemoLeadDTO = toDemoLeadDTO;
function toAutomationDTO(record) {
    return {
        id: record.id,
        name: record.name,
        slug: record.slug,
        shortDescription: record.shortDescription,
        fullDescription: record.fullDescription,
        setupPrice: record.setupPrice,
        monthlyPrice: record.monthlyPrice,
        nicheTags: record.nicheTags,
        isFeatured: record.isFeatured,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
    };
}
function toOrderDTO(record) {
    return {
        id: record.id,
        automationId: record.automationId,
        businessName: record.businessName,
        contactName: record.contactName,
        email: record.email,
        phone: record.phone,
        website: record.website ?? null,
        businessType: record.businessType,
        notes: record.notes ?? null,
        wantsMaintenance: record.wantsMaintenance,
        createdAt: record.createdAt.toISOString(),
    };
}
function toOrderWithAutomationDTO(order) {
    return {
        ...toOrderDTO(order),
        automation: order.automation
            ? toAutomationDTO(order.automation)
            : undefined,
    };
}
function toDemoLeadDTO(record) {
    return {
        id: record.id,
        automationSlug: record.automationSlug,
        automationName: record.automationName,
        name: record.name,
        email: record.email,
        phone: record.phone ?? null,
        company: record.company ?? null,
        website: record.website ?? null,
        notes: record.notes ?? null,
        createdAt: record.createdAt.toISOString(),
    };
}
