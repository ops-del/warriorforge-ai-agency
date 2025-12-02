import { useState } from "react";
import type { FormEvent } from "react";
import type { OrderPayload } from "../../types/Order";

interface OrderFormProps {
  automationId: number;
  automationName: string;
  onSubmit: (data: OrderPayload) => void;
  isSubmitting?: boolean;
}

export function OrderForm({
  automationId,
  automationName,
  onSubmit,
  isSubmitting = false,
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    notes: "",
    wantsMaintenance: false,
    agreeToTerms: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms to continue.");
      return;
    }

    const payload: OrderPayload = {
      automationId,
      businessName: formData.businessName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || undefined,
      businessType: formData.businessType,
      notes: formData.notes || undefined,
      wantsMaintenance: formData.wantsMaintenance,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900">
          Ordering: {automationName}
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name *
        </label>
        <input
          type="text"
          required
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Name *
        </label>
        <input
          type="text"
          required
          value={formData.contactName}
          onChange={(e) =>
            setFormData({ ...formData, contactName: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone *
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Type / Niche *
        </label>
        <input
          type="text"
          required
          value={formData.businessType}
          onChange={(e) =>
            setFormData({ ...formData, businessType: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="wantsMaintenance"
          checked={formData.wantsMaintenance}
          onChange={(e) =>
            setFormData({ ...formData, wantsMaintenance: e.target.checked })
          }
          className="mr-2"
        />
        <label htmlFor="wantsMaintenance" className="text-sm text-gray-700">
          Add monthly maintenance
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeToTerms: e.target.checked })
          }
          className="mr-2"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
          I agree to the terms *
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  );
}
