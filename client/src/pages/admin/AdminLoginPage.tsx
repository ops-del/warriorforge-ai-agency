import type { FormEvent } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string })?.from ?? "/admin";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.adminLogin(password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-card">
      <p className="text-sm font-semibold uppercase text-brand.blue">
        Admin console
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Secure login
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin password"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand.blue px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
