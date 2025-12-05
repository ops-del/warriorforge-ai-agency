import type {
  Automation as AutomationDTO,
  DemoLead as DemoLeadDTO,
  Order as OrderDTO,
} from "./shared";
import type { Automation, DemoLead, Order } from "@prisma/client";

export function toAutomationDTO(record: Automation): AutomationDTO {
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

export function toOrderDTO(record: Order): OrderDTO {
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

export function toOrderWithAutomationDTO(
  order: Order & { automation?: Automation | null }
) {
  return {
    ...toOrderDTO(order),
    automation: order.automation
      ? toAutomationDTO(order.automation)
      : undefined,
  };
}

export function toDemoLeadDTO(record: DemoLead): DemoLeadDTO {
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
