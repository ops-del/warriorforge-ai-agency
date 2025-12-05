"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewOrderEmail = sendNewOrderEmail;
exports.sendDemoLeadEmail = sendDemoLeadEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.env.SMTP_HOST,
    port: env_1.env.SMTP_PORT,
    secure: env_1.env.SMTP_SECURE,
    auth: {
        user: env_1.env.SMTP_USER,
        pass: env_1.env.SMTP_PASS,
    },
});
async function sendNewOrderEmail(order, automation) {
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
        to: env_1.env.ADMIN_EMAIL,
        from: env_1.env.SMTP_USER,
        subject,
        text: segments.join("\n"),
    });
}
async function sendDemoLeadEmail(lead) {
    const subject = `New Demo Lead: ${lead.automationName} - ${lead.company ?? lead.name}`;
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
        to: env_1.env.ADMIN_EMAIL,
        from: env_1.env.SMTP_USER,
        subject,
        text: segments.join("\n"),
    });
}
