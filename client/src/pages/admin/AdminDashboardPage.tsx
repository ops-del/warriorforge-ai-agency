import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearAdminToken, getAdminToken } from "../../lib/api";

const navItems = [
  { label: "Overview", to: "/admin" },
  { label: "Automations", to: "/admin/automations" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Demo Leads", to: "/admin/demo-leads" },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase text-brand.blue">Admin</p>
        <h2 className="text-xl font-semibold text-slate-900">Automation Ops</h2>
        <nav className="mt-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand.blue/10 text-brand.blue"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
        >
          Log out
        </button>
        <p className="mt-4 text-[11px] text-slate-400">
          Token: {getAdminToken() ? "Active" : "Missing"}
        </p>
      </aside>
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <header className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Current view</p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {location.pathname === "/admin" ? "Overview" : "Operations"}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            {new Date().toLocaleString()}
          </p>
        </header>
        <div className="pt-6">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
