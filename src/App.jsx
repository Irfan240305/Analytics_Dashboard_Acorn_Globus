import React, { useState, Suspense, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Filter, Download, Share2, Menu, BarChart3, ChevronDown, 
  TrendingUp, TrendingDown, DollarSign, Users, Target, Moon, Sun, X, Star, Search
} from 'lucide-react';
import { Layout } from './components/layout/Layout';
import { RevenueCard } from './components/metrics/RevenueCard';
import { MetricCard } from './components/metrics/MetricCard';
import { BarChartComponent } from './components/charts/BarChartComponent';
import { PlatformDataWithChart } from './components/charts/PlatformDataWithChart';
import { SalesLeaderboard } from './components/tables/SalesLeaderboard';
import { SalesDynamicChart } from './components/charts/SalesDynamicChart';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LoadingState } from './components/ui/LoadingState';
import { 
  contributors,
  platformData, 
  monthlyData, 
  salesData,
} from './data/mockData';
import './styles/accessibility.css';
import './styles/typography.css';
function App() {
  const [timeframeEnabled, setTimeframeEnabled] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Portal positioning state
  const searchButtonRef = useRef(null);
  const [searchDropdownPos, setSearchDropdownPos] = useState({ top: 0, left: 0 });

  const platformDistribution = [
    { name: 'Dribble', amount: 227459, pct: '43%', color: '#ec4899' },
    { name: 'Instagram', amount: 142823, pct: '27%', color: '#a855f7' },
    { name: 'Behance', amount: 89935, pct: '11%', color: '#3b82f6' },
    { name: 'Google', amount: 37028, pct: '7%', color: '#f59e0b' },
    { name: 'Other', amount: 35721, pct: '7%', color: '#9ca3af' },
  ];

  // Handle mobile search dropdown positioning
  const handleMobileSearchToggle = () => {
    if (!mobileSearchOpen && searchButtonRef.current) {
      const rect = searchButtonRef.current.getBoundingClientRect();
      setSearchDropdownPos({
        top: rect.bottom + 8,
        left: Math.max(16, rect.right - 320) // 320px dropdown width, min 16px from edge
      });
    }
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <ErrorBoundary>
      <Layout>
        {/* Main dashboard content with advanced styling */}
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          <div className="w-full px-2 sm:px-4 md:max-w-7xl md:mx-auto md:px-8 py-6">
            
            {/* HEADER - Accessible toolbar with polished UI */}
            <header className="mb-10" aria-label="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/50 dark:border-gray-700/50 mb-10">
              <div className="flex flex-col gap-4">
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Contributors avatars with hover effects */}
                  <div className="flex items-center gap-4">
                    <nav aria-label="Team members">
                      <div className="flex items-center -space-x-3 group">
                        {contributors.slice(0, 4).map((contributor, idx) => (
                          <div 
                            key={idx} 
                            className="w-10 h-10 rounded-full border-[3px] border-gray-50 dark:border-gray-900 bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shadow-sm hover:translate-y-[-2px] hover:z-10 transition-all duration-200 cursor-pointer"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${platformData[idx % platformData.length].color}, ${platformData[idx % platformData.length].color}dd)`
                            }}
                            title={contributor.name}
                            aria-label={`${contributor.name}, team member`}
                          >
                            {contributor.name.split(' ')[0][0]}
                          </div>
                        ))}
                        <button 
                          className="w-10 h-10 rounded-full border-[3px] border-gray-50 dark:border-gray-900 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-0"
                          aria-label="Add team member"
                          title="Add team member"
                        >
                          <span className="text-lg leading-none mb-0.5">+</span>
                        </button>
                      </div>
                    </nav>
                  </div>

                  {/* Center: Search Box (Desktop) */}
                  <div className="hidden md:flex items-center flex-1 max-w-md">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search dashboard..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      />
                    </div>
                  </div>

                  {/* Right: Action buttons with refined styling */}
                  <nav className="flex items-center gap-2" aria-label="Dashboard actions">
                    {/* Mobile Search Icon */}
                    <button
                      ref={searchButtonRef}
                      onClick={handleMobileSearchToggle}
                      className="md:hidden p-2.5 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
                      aria-label="Search"
                      title="Search"
                    >
                      {mobileSearchOpen ? (
                        <X className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Search className="w-5 h-5" aria-hidden="true" />
                      )}
                    </button>

                    <button 
                      className="icon-btn p-2.5 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700"
                      aria-label="Filter dashboard data"
                      title="Filter"
                    >
                      <Filter className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button 
                      className="icon-btn p-2.5 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700"
                      aria-label="Download dashboard report"
                      title="Download"
                    >
                      <Download className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button 
                      className="icon-btn p-2.5 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700"
                      aria-label="Share dashboard"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2" aria-hidden="true"></div>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="icon-btn p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 bg-white dark:bg-gray-800"
                      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                      aria-pressed={isDarkMode}
                    >
                      {isDarkMode ? (
                        <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                      ) : (
                        <Moon className="w-5 h-5 text-gray-400 fill-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </nav>
                </div>
              </div>
            </header>

            {/* Mobile Search Dropdown (Portal - Fixed Positioning) */}
            {mobileSearchOpen &&
              createPortal(
                <div
                  style={{
                    position: 'fixed',
                    top: `${searchDropdownPos.top}px`,
                    left: `${searchDropdownPos.left}px`,
                    zIndex: 'var(--z-dropdown, 1000)',
                    maxWidth: '320px',
                    width: 'calc(100% - 32px)'
                  }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg will-change-transform"
                >
                  <div className="p-3">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search dashboard..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                      />
                    </div>
                  </div>
                </div>,
                document.getElementById('portal-root')
              )
            }

            {/* Page title with refined typography */}
            <h1 className="heading-2 text-gray-400 dark:text-gray-500 mb-8 tracking-tight font-light">
              New report
            </h1>

            {/* ===== SECTION 1: REVENUE + METRICS (2 COLUMNS) ===== */}
            <section aria-label="Key metrics overview" className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                
                {/* LEFT: REVENUE CARD (2 cols) */}
                <div className="lg:col-span-2">
                  <Suspense fallback={<LoadingState type="card" />}>
                    <RevenueCard 
                      timeframeEnabled={timeframeEnabled} 
                      setTimeframeEnabled={setTimeframeEnabled} 
                    />
                  </Suspense>
                </div>

                {/* RIGHT: METRICS STACK (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Row 1: Top sales + Best deal */}
                  <div className="grid grid-cols-2 gap-6">
                    <Suspense fallback={<LoadingState type="card" />}>
                      <MetricCard 
                        title="Top sales"
                        value={salesData[0].leads}
                        subtitle={salesData[0].name}
                        variant="minimal"
                      />
                    </Suspense>

                    <Suspense fallback={<LoadingState type="card" />}>
                      <MetricCard 
                        title="Best deal"
                        value={`$${(Math.max(...salesData.map(s => s.revenue)) / 1000).toFixed(0)}K`}
                        subtitle="Rolf Inc."
                        variant="dark"
                      />
                    </Suspense>
                  </div>

                  {/* Row 2: Deals + Win rate */}
                  <div className="grid grid-cols-2 gap-6">
                    <Suspense fallback={<LoadingState type="card" />}>
                      <MetricCard 
                        title="Deals"
                        value="$288K"
                        badge={{ text: 'Value', variant: 'pink' }}
                        variant="minimal"
                      />
                    </Suspense>

                    <Suspense fallback={<LoadingState type="card" />}>
                      <MetricCard 
                        title="Win rate"
                        value="↑ 1.2%"
                        variant="minimal"
                      />
                    </Suspense>
                  </div>

                  {/* Row 3: Details Button */}
                  <button 
                    className="w-full px-4 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-black dark:hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-gray-200 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5"
                    aria-label="View detailed metrics"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </section>

            {/* ===== SECTION 2: LEADERBOARD + PLATFORMS ===== */}
            <section aria-label="Sales leaderboard and platform distribution" className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <Suspense fallback={<LoadingState type="table" />}>
                    <SalesLeaderboard data={salesData} />
                  </Suspense>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  {/* Platform distribution chart */}
                  <article className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-sm font-semibold mb-5 text-gray-500 uppercase tracking-wider">
                      Work with platforms
                    </h2>
                    <div className="space-y-4">
                      {platformDistribution.map((platform, idx) => (
                        <div key={idx} className="group">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-800 flex-shrink-0"
                                style={{ backgroundColor: platform.color }}
                                aria-label={`${platform.name} color indicator`}
                              ></div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors truncate">
                                {platform.name}
                              </span>
                            </div>

                            {/* Percentage – never shrinks */}
                            <span
                              className="text-sm font-bold text-gray-900 dark:text-white tabular-nums flex-shrink-0 self-start sm:self-auto"
                              aria-label={`${platform.name}: ${platform.pct} of distribution`}
                            >
                              {platform.pct}
                            </span>
                          </div>

                          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all duration-700 ease-out group-hover:brightness-110"
                              style={{ width: platform.pct, backgroundColor: platform.color }}
                              role="progressbar"
                              aria-valuenow={parseInt(platform.pct)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${platform.name} distribution`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  {/* Platform spotlight card */}
                  <article className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-500">
                          <span className="font-bold text-lg">Dr</span>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dribble</h2>
                      </div>
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Star 
                          className="w-5 h-5 text-yellow-400 fill-yellow-400" 
                          aria-label="Dribble is marked as favorite"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 tablet-stack gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Revenue</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                          $18,592
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Leads</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                          373
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Win/loss</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                          16%
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* ===== SECTION 3: CHARTS ===== */}
            <section aria-label="Data analysis charts" className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div>
                  <Suspense fallback={<LoadingState type="card" />}>
                    <PlatformDataWithChart platformData={platformData} />
                  </Suspense>
                </div>

                <div className="lg:col-span-2">
                  <article className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Deals amount
                      </h2>
                      <button className="text-sm text-blue-500 font-medium hover:text-blue-600 dark:hover:text-blue-400">
                        View Report
                      </button>
                    </div>
                    <Suspense fallback={<LoadingState type="card" />}>
                      <BarChartComponent data={monthlyData} metric={selectedMetric} />
                    </Suspense>
                    <div className="flex items-center justify-center gap-2 mt-8 p-1 bg-gray-100 dark:bg-gray-700/50 rounded-full w-max mx-auto">
                      {['revenue', 'leads', 'wl'].map((metric) => (
                        <button
                          key={metric}
                          onClick={() => setSelectedMetric(metric)}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            selectedMetric === metric 
                              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
                          aria-pressed={selectedMetric === metric}
                          aria-label={`View ${
                            metric === 'revenue' ? 'Revenue' :
                            metric === 'leads' ? 'Leads' : 'Win/Loss'
                          } data`}
                        >
                          {metric === 'revenue' ? 'Revenue' : metric === 'leads' ? 'Leads' : 'W/L'}
                        </button>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* ===== SECTION 4: SALES CHART ===== */}
            <section aria-label="Sales performance chart" className="pb-8">
              <Suspense fallback={<LoadingState type="card" />}>
                <SalesDynamicChart />
              </Suspense>
            </section>
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
