// src/App-Codename-FIXED.jsx
/**
 * App-Codename-FIXED.jsx
 * 
 * Updated dashboard with mobile-responsive header & search bar
 * Features:
 * - Fixed header layout (no mobile overlap)
 * - Functional search bar with icon toggle
 * - Mobile hamburger menu (ready to implement)
 * - Dark mode support
 * - Fully responsive
 * 
 * @component
 * @returns {JSX.Element} Main application
 */

import React, { useState, Suspense } from 'react';
import { Moon, Sun, Bell, Settings, Search, X } from 'lucide-react';
import { SalesMetricsHeader } from './components/sections/SalesMetricsHeader';
import { TabNavigation } from './components/sections/TabNavigation';
import { StatisticsGrid } from './components/sections/StatisticsGrid';
import { SalesInsights } from './components/sections/SalesInsights';
import { SalesDynamicChart } from './components/charts/SalesDynamicChart';
import { BarChartComponent } from './components/charts/BarChartComponent';
import { PlatformDataWithChart } from './components/charts/PlatformDataWithChart';

function LoadingState() {
  return (
    <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
  );
}

export default function AppCodename() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('revenue');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply dark mode to document
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark' : ''
    }`}>
      <div className="bg-gray-50 dark:bg-gray-900">
        {/* Header - Fixed Mobile Responsive */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-4">
              {/* Logo - Always Visible */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  Codename
                </h1>
              </div>

              {/* Search Bar - Desktop Only */}
              <div className="hidden md:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>
              </div>

              {/* Right Actions - Flexible Gap */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Mobile Search Toggle - Only on Mobile */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="md:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  aria-label="Toggle search"
                >
                  {searchOpen ? (
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Notifications */}
                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Settings - Hidden on Small Mobile */}
                <button className="hidden sm:flex p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Profile Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition flex-shrink-0">
                  A
                </div>
              </div>
            </div>

            {/* Mobile Search Bar - Dropdown */}
            {searchOpen && (
              <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          {/* Sales Metrics Header */}
          <SalesMetricsHeader />

          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Sales Dynamic Chart - Large */}
              <div className="lg:col-span-2">
                <Suspense fallback={<LoadingState />}>
                  <SalesDynamicChart />
                </Suspense>
              </div>

              {/* Statistics Grid - Side */}
              <div className="space-y-6">
                <StatisticsGrid />
              </div>
            </div>

            {/* Secondary Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <Suspense fallback={<LoadingState />}>
                <BarChartComponent 
                  data={[
                    { name: 'Oct', value: 35 },
                    { name: 'Nov', value: 42 },
                    { name: 'Dec', value: 51 },
                  ]}
                  metric="value"
                />
              </Suspense>

              {/* Platform Chart */}
              <Suspense fallback={<LoadingState />}>
                <PlatformDataWithChart 
                  platformData={[
                    { name: 'Dribbble', amount: 2840, pct: '28.1%', color: '#FF6B9D' },
                    { name: 'Instagram', amount: 1410, pct: '14.1%', color: '#E4405F' },
                    { name: 'Google', amount: 540, pct: '5.4%', color: '#4285F4' },
                    { name: 'Other', amount: 710, pct: '7.1%', color: '#34A853' },
                  ]}
                />
              </Suspense>
            </div>

            {/* Sales Insights Section */}
            <SalesInsights />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                © 2025 Codename. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition">
                  Privacy
                </a>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition">
                  Terms
                </a>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}