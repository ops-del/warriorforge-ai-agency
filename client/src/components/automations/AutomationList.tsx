import type { Automation } from "../../types/Automation";
import { AutomationCard } from "./AutomationCard";

interface AutomationListProps {
  automations: Automation[];
  showDemoButtons?: boolean;
}

export function AutomationList({
  automations,
  showDemoButtons = false,
}: AutomationListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {automations.map((automation) => (
        <AutomationCard
          key={automation.id}
          automation={automation}
          showDemoButton={showDemoButtons}
        />
      ))}
    </div>
  );
}
