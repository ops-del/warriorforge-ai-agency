import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { api, type AutomationPayload } from "../../lib/api";
import type { Automation } from "../../types/Automation";
import { formatCurrency } from "../../types/Automation";

interface AutomationForm {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  setupPrice: string;
  monthlyPrice: string;
  nicheTags: string;
  isFeatured: boolean;
}

const emptyForm: AutomationForm = {
  name: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  setupPrice: "0",
  monthlyPrice: "0",
  nicheTags: "",
  isFeatured: false,
};

export default function AdminAutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [form, setForm] = useState<AutomationForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setError(null);
    api.adminAutomations
      .list()
      .then(setAutomations)
      .catch((err) => setError(err.message));
  }

  function handleEdit(automation: Automation) {
    setEditingId(automation.id);
    setForm({
      name: automation.name,
      slug: automation.slug,
      shortDescription: automation.shortDescription,
      fullDescription: automation.fullDescription,
      setupPrice: (automation.setupPrice / 100).toString(),
      monthlyPrice: automation.monthlyPrice
        ? (automation.monthlyPrice / 100).toString()
        : "",
      nicheTags: automation.nicheTags,
      isFeatured: automation.isFeatured,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function buildPayload(): AutomationPayload {
    const toCents = (value: string) => Math.round(Number(value || 0) * 100);
    return {
      name: form.name,
      slug: form.slug,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      setupPrice: toCents(form.setupPrice),
      monthlyPrice: form.monthlyPrice ? toCents(form.monthlyPrice) : null,
      nicheTags: form.nicheTags,
      isFeatured: form.isFeatured,
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = buildPayload();
      if (editingId) {
        await api.adminAutomations.update(editingId, payload);
      } else {
        await api.adminAutomations.create(payload);
      }
      resetForm();
      refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save automation"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this automation?")) return;
    try {
      await api.adminAutomations.remove(id);
      refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete automation"
      );
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-100 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">
              {editingId ? "Edit automation" : "Create new automation"}
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              {editingId ? "Update system" : "Add system"}
            </h2>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-brand.blue"
            >
              Cancel edit
            </button>
          )}
        </div>
        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="rounded-xl border border-slate-200 px-4 py-3"
            required
          />
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="Slug"
            className="rounded-xl border border-slate-200 px-4 py-3"
            required
          />
        </div>
        <input
          value={form.shortDescription}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
          placeholder="Short description"
          className="rounded-xl border border-slate-200 px-4 py-3"
          required
        />
        <textarea
          value={form.fullDescription}
          onChange={(e) =>
            setForm({ ...form, fullDescription: e.target.value })
          }
          placeholder="Full description"
          className="min-h-[120px] rounded-xl border border-slate-200 px-4 py-3"
          required
        />
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.setupPrice}
            onChange={(e) => setForm({ ...form, setupPrice: e.target.value })}
            placeholder="Setup price (USD)"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.monthlyPrice}
            onChange={(e) => setForm({ ...form, monthlyPrice: e.target.value })}
            placeholder="Monthly price (USD)"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            value={form.nicheTags}
            onChange={(e) => setForm({ ...form, nicheTags: e.target.value })}
            placeholder="Tags (comma separated)"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          Featured on landing page
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand.blue px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading
            ? "Saving…"
            : editingId
            ? "Update automation"
            : "Create automation"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Setup</th>
              <th className="px-4 py-3">Monthly</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {automations.map((automation) => (
              <tr key={automation.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {automation.name}
                  </div>
                  <p className="text-xs text-slate-500">{automation.slug}</p>
                </td>
                <td className="px-4 py-3">
                  {formatCurrency(automation.setupPrice)}
                </td>
                <td className="px-4 py-3">
                  {automation.monthlyPrice
                    ? formatCurrency(automation.monthlyPrice)
                    : "—"}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {automation.nicheTags}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(automation)}
                      className="text-brand.blue"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(automation.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!automations.length && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No automations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
