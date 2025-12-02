import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const automation = params.get("automation");
  const business = params.get("business");

  function handleStripePlaceholder() {
    alert(
      "Stripe integration coming soon. We’ll email you when checkout is ready."
    );
  }

  return (
    <div className="rounded-3xl bg-white p-10 text-center shadow-card">
      <p className="text-sm font-semibold uppercase text-brand.blue">
        Order received
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Thanks! Your automation is queued.
      </h1>
      <p className="mt-4 text-slate-600">
        {business ? `${business}, we` : "We"} just sent a confirmation email
        with next steps for {automation ?? "your automation"}. Our team will
        reach out within one business day to finalize kickoff.
      </p>
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-center">
        <button
          onClick={handleStripePlaceholder}
          className="rounded-full bg-brand.blue px-6 py-3 text-sm font-semibold text-white"
        >
          Pay now (coming soon)
        </button>
        <button
          onClick={() => navigate("/automations")}
          className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
        >
          Back to automations
        </button>
      </div>
    </div>
  );
}
