import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { automationsService } from "./automations.service";

async function createOrder(data: Prisma.OrderUncheckedCreateInput) {
  const automation = await automationsService.getAutomationById(
    data.automationId
  );

  const order = await prisma.order.create({ data });

  return { order, automation };
}

async function listOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { automation: true },
  });
}

async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: { automation: true },
  });
}

export const ordersService = {
  createOrder,
  listOrders,
  getOrderById,
};
