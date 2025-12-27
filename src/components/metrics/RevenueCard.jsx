import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { MetricItem } from "./MetricItem";
import { SkeletonMetric } from "../ui/SkeletonMetric";

// Lazy load chart
const RevenueChart = lazy(() => import("./RevenueChart"));

const chartData = [
  { month: "Jun", revenue: 45000 },
  { month: "Jul", revenue: 52000 },
  { month: "Aug", revenue: 48000 },
  { month: "Sep", revenue: 61000 },
  { month: "Oct", revenue: 55000 },
  { month: "Nov", revenue: 67000 },
  { month: "Dec", revenue: 72000 },
];

export function RevenueCard({ timeframeEnabled, setTimeframeEnabled }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Amount", value: 209633, percentage: 39.63 },
      { label: "Top platform", value: 156841, percentage: 29.85 },
      { label: "Other", value: 117115, percentage: 22.14 },
    ],
    []
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 hover :shadow-lg transition-shadow duration-300 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Revenue</p>
          <section aria-labelledby="revenue-handling">
            <h2 id = "revenue-handling" className="text-3xl font-bold tracking-tight">$528,976</h2>
          </section>
          {/* <h2 className="text-2xl sm:text-4xl font-bold">$528,976</h2> */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm text-gray-600">vs prev.</span>
            <span className="text-sm font-semibold">$601,841.73</span>
            <span className="text-xs text-red-600 flex items-center gap-1">
              <ArrowDown className="w-3 h-3"
              aria-hidden="true" />
              7.8%
            </span>
          </div>
        </div>

        <button
          aria-label="Toggle Timeframe"
          onClick={() => setTimeframeEnabled(!timeframeEnabled)}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            timeframeEnabled ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          Timeframe
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonMetric key={i} />
            ))
          : metrics.map((item) => (
              <MetricItem
                key={item.label}
                label={item.label}
                value={item.value}
                percentage={item.percentage}
              />
            ))}
      </div>

      {/* CHART */}
      <div className="h-64">
        <Suspense
          fallback={<div className="h-full bg-gray-100 animate-pulse rounded-lg" />}
        >
          <RevenueChart data={chartData} />
        </Suspense>
      </div>
    </div>
  );
}
