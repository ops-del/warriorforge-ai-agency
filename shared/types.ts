export interface Automation {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  setupPrice: number;
  monthlyPrice?: number | null;
  nicheTags: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  automationId: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string | null;
  businessType: string;
  notes?: string | null;
  wantsMaintenance: boolean;
  createdAt: string;
}

export interface DemoLead {
  id: number;
  automationSlug: string;
  automationName: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  notes?: string | null;
  createdAt: string;
}
