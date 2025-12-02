import { prisma } from "../db/prisma";

export interface DemoLeadPayload {
  automationSlug: string;
  automationName: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  notes?: string;
}

export function createDemoLead(data: DemoLeadPayload) {
  return prisma.demoLead.create({ data });
}

export function listDemoLeads() {
  return prisma.demoLead.findMany({ orderBy: { createdAt: "desc" } });
}

export function getDemoLeadById(id: number) {
  return prisma.demoLead.findUnique({ where: { id } });
}
