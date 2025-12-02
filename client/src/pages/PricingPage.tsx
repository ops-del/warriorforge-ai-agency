import { Link } from "react-router-dom";
import { formatCurrency } from "../types/Automation";

const pricingTiers = [
  {
    name: "AI Lead Capture & Follow-Up",
    price: 2997,
    monthly: 297,
    features: [
      "24/7 lead qualification",
      "Instant auto-responses",
      "Follow-up sequences",
      "CRM integration",
      "Email & SMS automation",
      "Performance dashboard",
    ],
    cta: "Get Started",
    link: "/automations",
  },
  {
    name: "AI Appointment Setter",
    price: 3497,
    monthly: 347,
    features: [
      "Smart lead qualification",
      "Calendar integration",
      "SMS & email reminders",
      "No-show reduction AI",
      "Instant booking confirmations",
      "Multi-timezone support",
    ],
    cta: "Get Started",
    link: "/automations",
    featured: true,
  },
  {
    name: "AI Support Inbox",
    price: 2497,
    monthly: 247,
    features: [
      "FAQ automation",
      "Ticket routing & triage",
      "24/7 customer responses",
      "Escalation to human agents",
      "Multi-channel support",
      "Analytics & reports",
    ],
    cta: "Get Started",
    link: "/automations",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <p className="text-sm font-semibold uppercase text-brand.blue mb-2">
          Pricing
        </p>
        <h1 className="text-4xl font-bold mb-4">
          Choose Your Automation Arsenal
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          All systems are installed in 24–72 hours with full training, SOPs, and
          ongoing support. No contracts, cancel anytime.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 ${
              tier.featured
                ? "bg-gradient-to-br from-brand.blue to-brand.purple text-white shadow-2xl scale-105"
                : "bg-white border border-slate-200 shadow-card"
            }`}
          >
            {tier.featured && (
              <p className="text-sm font-semibold uppercase mb-2">
                ⚔️ Most Popular
              </p>
            )}
            <h2
              className={`text-2xl font-bold mb-2 ${
                tier.featured ? "text-white" : "text-slate-900"
              }`}
            >
              {tier.name}
            </h2>
            <div className="mb-6">
              <p
                className={`text-4xl font-bold ${
                  tier.featured ? "text-white" : "text-brand.blue"
                }`}
              >
                {formatCurrency(tier.price)}
              </p>
              <p
                className={`text-sm ${
                  tier.featured ? "text-white/80" : "text-slate-500"
                }`}
              >
                setup + {formatCurrency(tier.monthly)}/month
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2 text-sm ${
                    tier.featured ? "text-white/90" : "text-slate-600"
                  }`}
                >
                  <span className="text-lg">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={tier.link}
              className={`block w-full text-center rounded-full px-6 py-3 font-semibold ${
                tier.featured
                  ? "bg-white text-brand.blue"
                  : "bg-brand.blue text-white"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="rounded-3xl bg-slate-900 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
        <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
          We build bespoke AI systems tailored to your exact workflow. Book a
          call with our team to scope your custom automation.
        </p>
        <Link
          to="/contact"
          className="inline-block rounded-full bg-white text-brand.blue px-6 py-3 font-semibold"
        >
          Book a Call
        </Link>
      </section>

      <section className="mt-12 text-center">
        <p className="text-sm text-slate-500 mb-4">
          Questions? Email us at{" "}
          <a
            href="mailto:ops@warriorforgeai.com"
            className="underline text-brand.blue"
          >
            ops@warriorforgeai.com
          </a>
        </p>
      </section>
    </div>
  );
}
