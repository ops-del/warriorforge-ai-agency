import type { Order as SharedOrder } from "@shared/types";

export type Order = SharedOrder;

export type OrderPayload = {
  automationId: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: string;
  notes?: string;
  wantsMaintenance: boolean;
};
