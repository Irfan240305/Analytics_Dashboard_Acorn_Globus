// src/components/sections/SalesMetricsHeader.jsx
/**
 * SalesMetricsHeader Component
 * 
 * Displays monthly sales metrics with tabbed navigation
 * Matches Codename.com design with:
 * - Horizontal scrolling metric cards
 * - Active selection indicator
 * - Month-by-month breakdown
 * 
 * @component
 * @returns {JSX.Element} Sales metrics header section
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';

export function SalesMetricsHeader() {
  const months = [
    { month: 'Sep', revenue: '$35.0K', person: 'Armin A' },
    { month: 'Oct', revenue: '$42.5K', person: 'Mikasa A' },
    { month: 'Nov', revenue: '$38.0K', person: 'Eren Y' },
    { month: 'Dec', revenue: '$51.2K', person: 'Armin A', isSelected: true },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth">
          {months.map((item, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 rounded-2xl p-6 min-w-[220px] transition cursor-pointer ${
                item.isSelected
                  ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-600 border-2 border-pink-500 shadow-lg'
                  : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-400'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.month}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{item.revenue}</p>
                </div>
                {item.isSelected && (
                  <div className="w-2 h-12 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.person}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/components/sections/TabNavigation.jsx
/**
 * TabNavigation Component
 * 
 * Tabbed navigation for metric types (Revenue, Leads, W/L)
 * Matches Codename.com design with underline indicator
 * 
 * @component
 * @param {string} activeTab - Currently active tab
 * @param {Function} onTabChange - Callback when tab is clicked
 * @returns {JSX.Element} Tab navigation component
 */

export function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'leads', label: 'Leads', icon: '📞' },
    { id: 'wl', label: 'W/L', icon: '📊' },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-4 pt-3 font-semibold text-sm relative transition group ${
                activeTab === tab.id
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-lg"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/components/sections/StatisticsGrid.jsx
/**
 * StatisticsGrid Component
 * 
 * Grid of statistics cards with different styles
 * Includes: Best Deal, Deals count, Value, Win Rate
 * 
 * @component
 * @returns {JSX.Element} Statistics grid layout
 */

export function StatisticsGrid() {
  const stats = [
    {
      type: 'best-deal',
      title: 'Best Deal',
      value: '$42,300',
      subtitle: 'Rolf Inc.',
      gradient: 'from-pink-500 to-pink-600',
      textColor: 'text-white',
    },
    {
      type: 'deals',
      title: 'Deals',
      value: '5',
      subtitle: '+2 this week',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      type: 'value',
      title: 'Value',
      value: '$289',
      subtitle: '+$45 avg',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      type: 'win-rate',
      title: 'Win Rate',
      value: '↑ 12%',
      subtitle: 'vs last month',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-2xl p-6 transition hover:shadow-lg ${
            stat.type === 'best-deal'
              ? `bg-gradient-to-br ${stat.gradient} ${stat.textColor} shadow-lg`
              : `${stat.bgColor} border border-gray-200 dark:border-gray-700`
          }`}
        >
          <p className={`text-xs font-semibold mb-3 ${
            stat.type === 'best-deal'
              ? 'text-pink-100'
              : 'text-gray-600 dark:text-gray-400 uppercase tracking-wide'
          }`}>
            {stat.title}
          </p>
          <p className={`text-3xl font-bold mb-2 ${
            stat.type === 'best-deal' ? 'text-white' : stat.textColor
          }`}>
            {stat.value}
          </p>
          <p className={`text-sm ${
            stat.type === 'best-deal'
              ? 'text-pink-100'
              : 'text-gray-600 dark:text-gray-500'
          }`}>
            {stat.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}

// src/components/sections/SalesInsights.jsx
/**
 * SalesInsights Component
 * 
 * Three-column layout for:
 * - Top Sales performers
 * - Sales Streaks
 * - Platform breakdown
 * 
 * @component
 * @returns {JSX.Element} Sales insights section
 */

export function SalesInsights() {
  const topSales = [
    { name: 'Armin A', value: '$209,633', pct: '39.63%', avatar: '👨' },
    { name: 'Mikasa A', value: '$156,841', pct: '29.65%', avatar: '👩' },
    { name: 'Eren Y', value: '$117,115', pct: '22.14%', avatar: '👨' },
  ];

  const streaks = [
    { name: 'Armin A', days: '12', avatar: '👨' },
    { name: 'Mikasa A', days: '21', avatar: '👩' },
    { name: 'Eren Y', days: '15', avatar: '👨' },
  ];

  const platforms = [
    { name: 'Dribbble', pct: '28.1%', amount: '$44,072', icon: '🎨' },
    { name: 'Instagram', pct: '14.1%', amount: '$22,114', icon: '📷' },
    { name: 'Google', pct: '5.4%', amount: '$8,469', icon: '🔍' },
    { name: 'Other', pct: '7.1%', amount: '$11,135', icon: '🌐' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top Sales */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>🔥</span>
          Top Sales
        </h3>
        <div className="space-y-4">
          {topSales.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.value}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-pink-500 transition">
                {item.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Streak */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>🔥</span>
          Sales Streak
        </h3>
        <div className="space-y-4">
          {streaks.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {item.avatar}
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
              </div>
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-full">
                {item.days} days
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Work with Platforms */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Work with platforms</h3>
        <div className="space-y-3">
          {platforms.map((platform, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center text-sm">
                  {platform.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{platform.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{platform.amount}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{platform.pct}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Revenue</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">$156,841</span>
          </div>
        </div>
      </div>
    </div>
  );
}