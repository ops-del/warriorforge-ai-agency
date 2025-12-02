import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Automation } from "../types/Automation";
import { formatCurrency } from "../types/Automation";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getAutomations()
      .then((data) => {
        setAutomations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return automations;
    const term = search.toLowerCase();
    return automations.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.shortDescription.toLowerCase().includes(term) ||
        item.nicheTags.toLowerCase().includes(term),
    );
  }, [automations, search]);

  if (loading) {
    return <p>Loading automations…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand.blue">Automation catalog</p>
          <h1 className="text-3xl font-semibold text-slate-900">Choose the system you want to install</h1>
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, niche, tag"
          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm md:w-80"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((automation) => (
          <div key={automation.id} className="card-surface rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand.purple">{automation.nicheTags}</p>
              {automation.isFeatured && <span className="rounded-full bg-brand.blue/10 px-3 py-1 text-xs text-brand.blue">Featured</span>}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{automation.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{automation.shortDescription}</p>
            <div className="mt-4 flex flex-col gap-1 text-slate-900">
              <span className="text-lg font-semibold">{formatCurrency(automation.setupPrice)} setup</span>
              <span className="text-sm text-slate-500">
                {automation.monthlyPrice ? `${formatCurrency(automation.monthlyPrice)} monthly` : "One-time build"}
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                to={`/automations/${automation.id}`}
                className="rounded-full bg-brand.blue px-5 py-2 text-sm font-semibold text-white"
              >
                View details
              </Link>
              <Link
                to={`/order/${automation.id}`}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700"
              >
                Order now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
