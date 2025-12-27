// src/components/layout/ImprovedLayout.jsx
/**
 * ImprovedLayout Component
 * 
 * Enhanced layout matching Codename.com design with:
 * - Tabbed interface for metrics switching
 * - Sales metrics cards with stat indicators
 * - Multi-timeframe selector
 * - Platform filter integration
 * 
 * @component
 * @returns {JSX.Element} Main dashboard layout
 */

import React, { useState } from 'react';
import { ChevronDown, Filter, Download, Share2, MoreHorizontal } from 'lucide-react';

export function ImprovedLayout() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Sales metrics data
  const metricsData = {
    revenue: {
      Sep: '$35.0K',
      Oct: '$42.5K',
      Nov: '$38.0K',
      Dec: '$51.2K',
    },
    leads: {
      Sep: '2.4K',
      Oct: '3.1K',
      Nov: '2.8K',
      Dec: '3.5K',
    },
  };

  const platforms = [
    { name: 'Dribbble', logo: '🎨', color: 'bg-pink-500' },
    { name: 'Instagram', logo: '📷', color: 'bg-pink-600' },
    { name: 'Google', logo: '🔍', color: 'bg-blue-500' },
    { name: 'Behance', logo: '✨', color: 'bg-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-light text-gray-400 dark:text-gray-500">Sales Dynamic</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly performance trend across team</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Timeframe Selector */}
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <option value="month">By Month</option>
                <option value="week">By Week</option>
                <option value="day">By Day</option>
              </select>

              {/* Action Buttons */}
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Metrics Cards - Horizontal Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {Object.entries(metricsData[activeTab]).map(([month, value]) => (
              <div
                key={month}
                className="flex-shrink-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 min-w-[160px] hover:shadow-md transition cursor-pointer"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{month}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                {month === 'Dec' && (
                  <div className="mt-2 inline-block px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold rounded-full">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-8 mb-8 border-b border-gray-200 dark:border-gray-700">
          {['revenue', 'leads', 'w/l'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium text-sm transition relative ${
                activeTab === tab
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.toUpperCase()}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white rounded-t"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Large Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sales Trend</h2>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-pink-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">+12.5% vs last year</span>
              </div>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500">Chart Area - Integrate your Recharts here</p>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            {/* Primary Stat */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-sm font-medium text-pink-100 mb-2">Best Deal</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">$42,300</p>
                  <p className="text-sm text-pink-100">Rolf Inc.</p>
                </div>
                <div className="w-2 h-16 bg-pink-400 rounded-full opacity-50"></div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">DEALS</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">VALUE</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">$289</p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">WIN RATE</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">↑ 12%</p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">FORECAST</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Sales Data & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Sales */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Sales 🔥</h3>
            <div className="space-y-3">
              {[
                { name: 'Armin A', value: '$209,633', pct: '39.63%' },
                { name: 'Mikasa A', value: '$156,841', pct: '29.65%' },
                { name: 'Eren Y', value: '$117,115', pct: '22.14%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.value}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Streak */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sales Streak 🔥</h3>
            <div className="space-y-3">
              {[
                { name: 'Armin A', count: '12', unit: 'days' },
                { name: 'Mikasa A', count: '21', unit: 'days' },
                { name: 'Eren Y', count: '15', unit: 'days' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-full">
                    {item.count} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work with Platforms */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Work with platforms</h3>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${platform.color} w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm`}>
                      {platform.logo}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">14.1%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total: <span className="font-bold text-gray-900 dark:text-white">$156,841</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}