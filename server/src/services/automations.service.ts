import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AppError } from "../utils/AppError";

async function listAutomations() {
  return prisma.automation.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
}

async function getAutomationById(id: number) {
  const automation = await prisma.automation.findUnique({ where: { id } });

  if (!automation) {
    throw new AppError("Automation not found", 404);
  }

  return automation;
}

async function createAutomation(data: Prisma.AutomationCreateInput) {
  return prisma.automation.create({ data });
}

async function updateAutomation(
  id: number,
  data: Prisma.AutomationUpdateInput
) {
  await getAutomationById(id);

  return prisma.automation.update({ where: { id }, data });
}

async function deleteAutomation(id: number) {
  await getAutomationById(id);

  return prisma.automation.delete({ where: { id } });
}

export const automationsService = {
  listAutomations,
  getAutomationById,
  createAutomation,
  updateAutomation,
  deleteAutomation,
};
