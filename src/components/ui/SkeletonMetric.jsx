export function SkeletonMetric() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-3 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
      <div className="flex justify-between gap-4">
        <div className="h-6 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
        <div className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
      </div>
    </div>
  );
}
