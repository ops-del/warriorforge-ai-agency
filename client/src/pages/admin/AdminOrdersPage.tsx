import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import type { Automation } from "../../types/Automation";
import type { Order } from "../../types/Order";

export type AdminOrder = Order & { automation?: Automation };

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.adminOrders
      .list()
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Order #</th>
            <th className="px-4 py-3">Automation</th>
            <th className="px-4 py-3">Business</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Placed</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => navigate(`/admin/orders/${order.id}`)}
              className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
            >
              <td className="px-4 py-3 font-semibold text-slate-900">
                #{order.id}
              </td>
              <td className="px-4 py-3">{order.automation?.name ?? "—"}</td>
              <td className="px-4 py-3">{order.businessName}</td>
              <td className="px-4 py-3">{order.email}</td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
          {!orders.length && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
