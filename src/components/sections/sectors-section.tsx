import { HandoffCard } from "@/components/ui/handoff-card";
import { InvestmentSystem } from "./investment-system";

// The method follows the pinned mission statement and takes over the screen
// as an expanding card (see `HandoffCard`).
export function SectorsSection() {
  return (
    <HandoffCard>
      <InvestmentSystem />
    </HandoffCard>
  );
}
