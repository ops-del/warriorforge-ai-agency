import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Automation } from "../../types/Automation";
import type { Order } from "../../types/Order";

export default function AdminHomePage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [orders, setOrders] = useState<(Order & { automation?: Automation })[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.adminAutomations.list(), api.adminOrders.list()])
      .then(([automationData, orderData]) => {
        setAutomations(automationData);
        setOrders(orderData);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Live automations</p>
          <p className="text-3xl font-semibold text-slate-900">
            {automations.length}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Open orders</p>
          <p className="text-3xl font-semibold text-slate-900">
            {orders.length}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Featured systems</p>
          <p className="text-3xl font-semibold text-slate-900">
            {automations.filter((item) => item.isFeatured).length}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 p-4">
        <h3 className="text-lg font-semibold text-slate-900">Latest orders</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {orders.slice(0, 5).map((order) => (
            <li
              key={order.id}
              className="flex justify-between rounded-xl bg-white px-4 py-2"
            >
              <span>{order.businessName}</span>
              <span className="text-slate-400">
                {order.automation?.name ?? "Unknown"}
              </span>
            </li>
          ))}
          {!orders.length && <li>No orders yet.</li>}
        </ul>
      </div>
    </div>
  );
}
