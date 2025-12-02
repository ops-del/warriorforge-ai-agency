import dotenv from "dotenv";

dotenv.config();

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = value ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function requireEnv(key: string): string {
  const value = process.env[key];

  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable: ${key}. Please set it in your .env file.`,
    );
  }

  return value;
}

const warnIfMissing = [
  "ADMIN_EMAIL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
];

warnIfMissing.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: Environment variable ${key} is not set.`);
  }
});

export const env = {
  PORT: toNumber(process.env.PORT, 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.db",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  ADMIN_PASSWORD: requireEnv("ADMIN_PASSWORD"),
  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: toNumber(process.env.SMTP_PORT, 587),
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  SMTP_SECURE: (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
} as const;
