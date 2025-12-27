import React from 'react';

export const PlatformCard = ({ platform }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: platform.color + '20' }}>
          <span style={{ color: platform.color }}>●</span>
        </div>
        <span className="text-sm font-medium">{platform.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">${platform.amount.toLocaleString()}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{platform.percentage}%</span>
      </div>
    </div>
  );
};