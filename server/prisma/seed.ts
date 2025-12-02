import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const automations = [
  {
    name: "AI Lead Capture & Follow-Up System",
    slug: "ai-lead-capture-follow-up",
    shortDescription: "Capture, qualify, and follow up with inbound leads 24/7 across web, SMS, and email.",
    fullDescription:
      "Deploy intelligent web chat, SMS, and email sequences that instantly capture new leads, qualify them with dynamic questions, and follow up until they convert. Perfect for high-volume inbound teams that need consistent, personable outreach.",
    setupPrice: 450000,
    monthlyPrice: 120000,
    nicheTags: "lead-generation,marketing,agencies",
    isFeatured: true,
  },
  {
    name: "AI Appointment Setter",
    slug: "ai-appointment-setter",
    shortDescription: "Hands-free scheduling assistant that books qualified calls on your calendar.",
    fullDescription:
      "An omni-channel agent that responds to every inbound lead, handles objections, syncs availability across calendars, and confirms appointments automatically. Includes CRM integration and templated call frameworks.",
    setupPrice: 380000,
    monthlyPrice: 99000,
    nicheTags: "sales,services,coaches",
    isFeatured: true,
  },
  {
    name: "AI Customer Support Inbox",
    slug: "ai-customer-support-inbox",
    shortDescription: "Centralized inbox powered by AI triage, drafting, and escalation workflows.",
    fullDescription:
      "Route tickets, summarize context, draft empathetic replies, and escalate edge-cases to humans with a single click. Includes pre-trained tone and knowledge base ingestion for fast deployments.",
    setupPrice: 520000,
    monthlyPrice: 150000,
    nicheTags: "support,ecommerce,saas",
    isFeatured: false,
  },
  {
    name: "AI Review & Reputation Automation",
    slug: "ai-review-reputation-automation",
    shortDescription: "Increase 5-star reviews automatically while intercepting negative feedback.",
    fullDescription:
      "Automated post-purchase outreach via SMS/email, smart sentiment detection, and dynamic responses ensure you capture more 5-star reviews while routing unhappy customers to a live rep instantly.",
    setupPrice: 320000,
    monthlyPrice: 85000,
    nicheTags: "local-service,reviews,reputation",
    isFeatured: false,
  },
  {
    name: "AI Content Engine",
    slug: "ai-content-engine",
    shortDescription: "Always-on content system for blogs, emails, and short-form social posts.",
    fullDescription:
      "Strategize, draft, and schedule authority-building content that matches your brand voice. Includes multi-channel templates, approval workflows, and SEO optimizations baked in.",
    setupPrice: 610000,
    monthlyPrice: 175000,
    nicheTags: "content,marketing,seo",
    isFeatured: false,
  },
  {
    name: "Custom AI Automation (Request a Call)",
    slug: "custom-ai-automation",
    shortDescription: "Book a consult to scope a fully custom workflow for your team.",
    fullDescription:
      "For teams with unique processes, we partner to map SOPs, design bespoke AI agents, and integrate them with your existing stack. Includes white-glove deployment and training.",
    setupPrice: 0,
    monthlyPrice: null,
    nicheTags: "custom,enterprise,consulting",
    isFeatured: true,
  },
];

async function main() {
  await prisma.order.deleteMany();
  await prisma.automation.deleteMany();

  for (const automation of automations) {
    await prisma.automation.create({ data: automation });
  }
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
