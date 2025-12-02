import type { Automation } from "../types/Automation";
import type { Order, OrderPayload } from "../types/Order";
import type { DemoLead, DemoLeadPayload } from "../types/DemoLead";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const ADMIN_TOKEN_KEY = "aaa_admin_token";

export interface AutomationPayload {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  setupPrice: number;
  monthlyPrice?: number | null;
  nicheTags: string;
  isFeatured: boolean;
}

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (requiresAuth) {
    const token = getAdminToken();
    if (token) {
      headers.set("x-admin-token", token);
    }
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (data as { error?: string }).error ?? "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export const api = {
  getAutomations: () => request<Automation[]>("/api/automations"),
  getAutomation: (id: number | string) =>
    request<Automation>(`/api/automations/${id}`),
  createOrder: (payload: OrderPayload) =>
    request<{ message: string; order: Order }>("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  adminLogin: async (password: string) => {
    const result = await request<{ token: string }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    setAdminToken(result.token);
    return result;
  },
  adminAutomations: {
    list: () => request<Automation[]>("/api/admin/automations", {}, true),
    create: (payload: AutomationPayload) =>
      request<Automation>(
        "/api/admin/automations",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        true
      ),
    update: (id: number, payload: Partial<AutomationPayload>) =>
      request<Automation>(
        `/api/admin/automations/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        },
        true
      ),
    remove: (id: number) =>
      request<void>(`/api/admin/automations/${id}`, { method: "DELETE" }, true),
  },
  adminOrders: {
    list: () =>
      request<(Order & { automation?: Automation })[]>(
        "/api/admin/orders",
        {},
        true
      ),
    get: (id: number) =>
      request<Order & { automation?: Automation }>(
        `/api/admin/orders/${id}`,
        {},
        true
      ),
  },
  createDemoLead: (payload: DemoLeadPayload) =>
    request<DemoLead>("/api/demo-leads", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  adminDemoLeads: {
    list: () => request<DemoLead[]>("/api/admin/demo-leads", {}, true),
    get: (id: number) =>
      request<DemoLead>(`/api/admin/demo-leads/${id}`, {}, true),
  },
};
