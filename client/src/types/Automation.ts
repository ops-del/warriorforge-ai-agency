import type { Automation as SharedAutomation } from "@shared/types";

export type Automation = SharedAutomation;

export function centsToDollars(value?: number | null) {
  if (value === null || value === undefined) return null;
  return value / 100;
}

export function formatCurrency(
  value?: number | null,
  options?: Intl.NumberFormatOptions
) {
  if (value === null || value === undefined) {
    return "—";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(value / 100);
}
