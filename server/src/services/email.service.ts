import nodemailer from "nodemailer";
import { Automation, DemoLead, Order } from "@prisma/client";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendNewOrderEmail(order: Order, automation: Automation) {
  const subject = `New Automation Order: ${automation.name} - ${order.businessName}`;
  const segments = [
    `Automation: ${automation.name}`,
    `Business: ${order.businessName}`,
    `Contact: ${order.contactName}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Website: ${order.website ?? "n/a"}`,
    `Business Type: ${order.businessType}`,
    `Maintenance: ${order.wantsMaintenance ? "Yes" : "No"}`,
    `Submitted: ${new Date(order.createdAt).toLocaleString()}`,
    `Notes:\n${order.notes ?? "None"}`,
  ];

  await transporter.sendMail({
    to: env.ADMIN_EMAIL,
    from: env.SMTP_USER,
    subject,
    text: segments.join("\n"),
  });
}

export async function sendDemoLeadEmail(lead: DemoLead) {
  const subject = `New Demo Lead: ${lead.automationName} - ${
    lead.company ?? lead.name
  }`;
  const segments = [
    `Automation: ${lead.automationName} (${lead.automationSlug})`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "n/a"}`,
    `Company: ${lead.company ?? "n/a"}`,
    `Website: ${lead.website ?? "n/a"}`,
    `Notes:\n${lead.notes ?? "None"}`,
    `Submitted: ${new Date(lead.createdAt).toLocaleString()}`,
  ];

  await transporter.sendMail({
    to: env.ADMIN_EMAIL,
    from: env.SMTP_USER,
    subject,
    text: segments.join("\n"),
  });
}
