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

export interface DemoLeadPayload {
  automationSlug: string;
  automationName: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  notes?: string;
}
