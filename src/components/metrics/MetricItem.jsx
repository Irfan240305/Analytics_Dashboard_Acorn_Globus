import { memo } from "react";
import { AnimatedNumber } from "../ui/AnimatedNumber";

export const MetricItem = memo(({ label, value, percentage }) => {
  return (
    <div
      tabIndex={0}
      className="space-y-2 interactive hover-glow focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <p className="text-xs text-gray-500">{label}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <AnimatedNumber
          value={value}
          prefix="$"
          className="text-xl sm:text-2xl font-bold"
        />

        <AnimatedNumber
          value={percentage}
          suffix="%"
          className="text-xs sm:text-sm text-gray-500"
        />
      </div>
    </div>
  );
});
