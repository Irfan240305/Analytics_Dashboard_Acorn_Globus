// src/components/filters/SortControls.jsx - NEW

import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export function SortControls({ onSortChange, activeSort = 'revenue' }) {
  const [sortDirection, setSortDirection] = useState('desc');

  const sortOptions = [
    { id: 'revenue', label: 'Highest Revenue', icon: '💰' },
    { id: 'leads', label: 'Most Leads', icon: '📞' },
    { id: 'kpi', label: 'Best KPI', icon: '⭐' },
    { id: 'growth', label: 'Trending Up', icon: '📈' },
    { id: 'recent', label: 'Recently Updated', icon: '🕐' },
  ];

  const handleSort = (sortId) => {
    if (activeSort === sortId) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    }
    onSortChange(sortId, sortDirection === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Sort by:</span>
      <div className="flex items-center gap-2">
        {sortOptions.map((option) => {
          const isActive = activeSort === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSort(option.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-gray-300'
              }`}
              title={option.label}
            >
              <span className="mr-1">{option.icon}</span>
              {option.label}
              {isActive && (
                sortDirection === 'desc' 
                  ? <ArrowDown className="w-3 h-3 inline ml-1" />
                  : <ArrowUp className="w-3 h-3 inline ml-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
