import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { label: "Solutions", to: "/automations" },
  { label: "Order", to: "/automations" },
  { label: "Stories", to: "/#success" },
  { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition hover:text-brand.purple ${
    isActive ? "text-brand.purple" : "text-slate-600"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-brand.slate"
        >
          AI Automation Agency
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/automations"
            className="rounded-full border border-brand.blue/30 px-4 py-2 text-sm font-semibold text-brand.blue"
          >
            Browse Automations
          </Link>
          <Link
            to="/admin/login"
            className="rounded-full bg-brand.blue px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand.blue/30"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
