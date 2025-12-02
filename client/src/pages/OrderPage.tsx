import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Automation } from "../types/Automation";
import { formatCurrency } from "../types/Automation";

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  notes: string;
  wantsMaintenance: boolean;
  agreed: boolean;
}

const initialForm: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  notes: "",
  wantsMaintenance: true,
  agreed: false,
};

export default function OrderPage() {
  const { automationId } = useParams();
  const navigate = useNavigate();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [formState, setFormState] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!automationId) return;
    api
      .getAutomation(automationId)
      .then(setAutomation)
      .catch((err) => setError(err.message));
  }, [automationId]);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!automation) return;
    if (!formState.agreed) {
      setError("Please agree to the terms to proceed.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await api.createOrder({
        automationId: automation.id,
        businessName: formState.businessName,
        contactName: formState.contactName,
        email: formState.email,
        phone: formState.phone,
        website: formState.website || undefined,
        businessType: formState.businessType,
        notes: formState.notes || undefined,
        wantsMaintenance: formState.wantsMaintenance,
      });

      navigate(
        `/order-success?automation=${encodeURIComponent(
          automation.name
        )}&business=${encodeURIComponent(formState.businessName)}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  }

  if (error && !automation) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!automation) {
    return <p>Loading automation…</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl bg-white p-8 shadow-card"
      >
        <div>
          <p className="text-sm font-semibold uppercase text-brand.blue">
            Order form
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Reserve your build slot
          </h1>
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            required
            placeholder="Business name"
            value={formState.businessName}
            onChange={handleChange("businessName")}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            required
            placeholder="Contact name"
            value={formState.contactName}
            onChange={handleChange("contactName")}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            required
            type="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange("email")}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            required
            placeholder="Phone"
            value={formState.phone}
            onChange={handleChange("phone")}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
        </div>
        <input
          placeholder="Website"
          value={formState.website}
          onChange={handleChange("website")}
          className="rounded-2xl border border-slate-200 px-4 py-3"
        />
        <input
          required
          placeholder="Business type / niche"
          value={formState.businessType}
          onChange={handleChange("businessType")}
          className="rounded-2xl border border-slate-200 px-4 py-3"
        />
        <textarea
          placeholder="Notes / special requests"
          value={formState.notes}
          onChange={handleChange("notes")}
          className="min-h-[120px] rounded-2xl border border-slate-200 px-4 py-3"
        />
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="checkbox"
            checked={formState.wantsMaintenance}
            onChange={handleChange("wantsMaintenance")}
          />
          <span className="text-sm text-slate-700">
            Add monthly maintenance & optimization
          </span>
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={formState.agreed}
            onChange={handleChange("agreed")}
          />
          I agree to the implementation terms and understand payments are due
          upon kickoff.
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand.blue px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
        >
          {submitting ? "Submitting…" : "Submit order"}
        </button>
      </form>

      <aside className="space-y-4 rounded-3xl bg-slate-900 p-8 text-white shadow-card">
        <p className="text-sm font-semibold uppercase text-slate-300">
          Order summary
        </p>
        <h2 className="text-2xl font-semibold">{automation.name}</h2>
        <p className="text-sm text-slate-200">{automation.shortDescription}</p>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm uppercase text-slate-300">Setup investment</p>
          <p className="text-3xl font-semibold">
            {formatCurrency(automation.setupPrice)}
          </p>
          <p className="text-sm text-slate-300">
            {automation.monthlyPrice
              ? `${formatCurrency(automation.monthlyPrice)} monthly`
              : "One-time build"}
          </p>
        </div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>✔ White-glove onboarding & documentation</li>
          <li>✔ Prompt library + tone of voice kit</li>
          <li>✔ Integration testing & QA</li>
          <li>✔ Email notification on every order</li>
        </ul>
      </aside>
    </div>
  );
}
