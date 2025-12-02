import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Automation } from "../types/Automation";
import { formatCurrency } from "../types/Automation";

const included = [
  "Strategy and prompt workshop",
  "Custom agent personality + tone pack",
  "Integrations + QA across your stack",
  "Handoff training & playbooks",
  "First 30 days of performance monitoring",
];

const DEMO_SLUGS: Record<string, string> = {
  "ai-lead-capture-follow-up": "/demo/lead-capture",
  "ai-customer-support-inbox": "/demo/support-inbox",
  "ai-appointment-setter": "/demo/appointment-setter",
};

export default function AutomationDetailPage() {
  const { id } = useParams();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .getAutomation(id)
      .then(setAutomation)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!automation) {
    return <p>Loading automation…</p>;
  }

  const tags = automation.nicheTags.split(",").map((tag) => tag.trim());
  const demoLink = DEMO_SLUGS[automation.slug];

  return (
    <div className="space-y-10">
      <Link to="/automations" className="text-sm text-brand.blue">
        ← Back to catalog
      </Link>
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand.purple">
              {tags.join(" · ")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {automation.name}
            </h1>
            <p className="mt-2 text-slate-600">{automation.shortDescription}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-6 py-4 text-right">
            <p className="text-sm uppercase text-slate-500">Setup investment</p>
            <p className="text-3xl font-semibold text-slate-900">
              {formatCurrency(automation.setupPrice)}
            </p>
            <p className="text-sm text-slate-500">
              {automation.monthlyPrice
                ? `${formatCurrency(automation.monthlyPrice)} monthly`
                : "One-time build"}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4 text-slate-700">
          {automation.fullDescription
            .split(".")
            .filter(Boolean)
            .map((sentence) => (
              <p key={sentence}>{sentence.trim()}.</p>
            ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What’s included
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand.blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Niches</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <Link
            to={`/order/${automation.id}`}
            className="rounded-full bg-brand.blue px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Order this automation
          </Link>
          {demoLink && (
            <Link
              to={demoLink}
              className="rounded-full border border-brand.blue px-6 py-3 text-center text-sm font-semibold text-brand.blue"
            >
              Try Live Demo
            </Link>
          )}
          <Link
            to="/automations"
            className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}
