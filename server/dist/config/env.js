"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredVars = [
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
];
requiredVars.forEach((key) => {
    if (!process.env[key]) {
        console.warn(`Warning: Environment variable ${key} is not set.`);
    }
});
function toNumber(value, fallback) {
    const parsed = value ? Number(value) : NaN;
    return Number.isFinite(parsed) ? parsed : fallback;
}
exports.env = {
    PORT: toNumber(process.env.PORT, 4000),
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.db",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "",
    SMTP_HOST: process.env.SMTP_HOST ?? "",
    SMTP_PORT: toNumber(process.env.SMTP_PORT, 587),
    SMTP_USER: process.env.SMTP_USER ?? "",
    SMTP_PASS: process.env.SMTP_PASS ?? "",
    SMTP_SECURE: (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
};
