import { Link } from "react-router-dom";
import type { Automation } from "../../types/Automation";

interface AutomationCardProps {
  automation: Automation;
  showDemoButton?: boolean;
}

const DEMO_SLUGS: Record<string, string> = {
  "ai-lead-capture-follow-up": "/demo/lead-capture",
  "ai-customer-support-inbox": "/demo/support-inbox",
  "ai-appointment-setter": "/demo/appointment-setter",
};

export function AutomationCard({
  automation,
  showDemoButton = false,
}: AutomationCardProps) {
  const setupPrice = (automation.setupPrice / 100).toFixed(2);
  const monthlyPrice = automation.monthlyPrice
    ? (automation.monthlyPrice / 100).toFixed(2)
    : null;
  const demoLink = DEMO_SLUGS[automation.slug];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {automation.isFeatured && (
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded mb-3">
          FEATURED
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {automation.name}
      </h3>
      <p className="text-gray-600 mb-4">{automation.shortDescription}</p>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">${setupPrice}</div>
        {monthlyPrice && (
          <div className="text-sm text-gray-600">+ ${monthlyPrice}/month</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to={`/automations/${automation.id}`}
          className="block text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          View Details
        </Link>
        {showDemoButton && demoLink && (
          <Link
            to={demoLink}
            className="block text-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Try Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}
