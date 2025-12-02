import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import type { Automation } from "../../types/Automation";
import type { Order } from "../../types/Order";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<
    (Order & { automation?: Automation }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api.adminOrders
      .get(Number(id))
      .then(setOrder)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!order) {
    return <p>Loading order…</p>;
  }

  return (
    <div className="space-y-4">
      <Link to="/admin/orders" className="text-sm text-brand.blue">
        ← Back to orders
      </Link>
      <div className="rounded-2xl border border-slate-100 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Order ID</p>
            <h1 className="text-2xl font-semibold text-slate-900">
              #{order.id}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-500">Automation</p>
            <p className="text-lg font-semibold text-slate-900">
              {order.automation?.name ?? "Unknown"}
            </p>
            <p className="text-sm text-slate-500">
              {order.automation?.shortDescription}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">Business</p>
            <p className="text-lg font-semibold text-slate-900">
              {order.businessName}
            </p>
            <p className="text-sm text-slate-500">{order.businessType}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-500">Primary contact</p>
            <p className="text-sm text-slate-700">{order.contactName}</p>
            <p className="text-sm text-slate-500">{order.email}</p>
            <p className="text-sm text-slate-500">{order.phone}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">Website</p>
            <p className="text-sm text-slate-700">{order.website ?? "—"}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase text-slate-500">Notes</p>
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            {order.notes ?? "No notes provided."}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm">
          <span>Maintenance add-on</span>
          <span className="font-semibold text-slate-900">
            {order.wantsMaintenance ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}
