// src/components/metrics/MetricCard.jsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export function MetricCard({ title, value, subtitle, badge, variant = 'default' }) {
  const isDark = variant === 'dark';
  const isMinimal = variant === 'minimal';

  return (
    <div 
      className={`
        relative p-6 rounded-2xl h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${isDark 
          ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 shadow-sm'
        }
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {title}
        </h3>
        {!isMinimal && (
          <button className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors ${isDark ? 'hover:bg-gray-800' : ''}`}>
            <MoreHorizontal className="w-4 h-4 opacity-50" />
          </button>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
          {subtitle && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {badge && (
          <div className={`
            px-2.5 py-1 rounded-full text-xs font-bold tracking-wide
            ${badge.variant === 'pink' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' : ''}
            ${badge.variant === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
          `}>
            {badge.text}
          </div>
        )}
      </div>
    </div>
  );
}