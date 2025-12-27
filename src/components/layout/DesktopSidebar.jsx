// src/components/layout/DesktopSidebar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, FileText, Settings,
  HelpCircle, LogOut, Star, Clock, ShoppingCart, Target,
  ChevronDown, Plus, Sparkles, Folder, X, Menu, SettingsIcon
} from 'lucide-react';
import { announceToScreenReader, generateId } from '../../utils/a11y';

export function DesktopSidebar({ secondarySidebarOpen, setSecondarySidebarOpen, expandedSections, toggleSection }) {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const toggleButtonRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarId = useRef(generateId('sidebar')).current;

  // Keyboard shortcut: Alt+S to toggle sidebar
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setSecondarySidebarOpen(prev => !prev);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [setSecondarySidebarOpen]);

  const iconNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, color: 'from-blue-500 to-blue-600' },
    { icon: BarChart3, label: 'Analytics', active: false, color: 'from-purple-500 to-purple-600' },
    { icon: Users, label: 'Team', active: false, color: 'from-pink-500 to-pink-600' },
    { icon: FileText, label: 'Reports', active: false, color: 'from-amber-500 to-amber-600' },
    { icon: Settings, label: 'Settings', active: false, color: 'from-emerald-500 to-emerald-600' },
  ];

  const mainSections = [
    { icon: Star, label: 'Starred', active: false },
    { icon: Clock, label: 'Recent', active: false },
    { icon: ShoppingCart, label: 'Sales list', active: false },
    { icon: Target, label: 'Goals', active: false },
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
  ];

  const reportsSection = [
    { label: 'Codename', active: false },
    { label: 'Shared with me', active: false },
    { label: 'CargoSgo', active: false },
    { label: 'Cloud23r', badge: 1 },
    { label: 'Idioma', active: false },
    { label: 'Syllables', active: false },
    { label: 'x-0b', active: false },
  ];

  const myReportsSection = [
    { label: 'Emails received', active: false },
    { label: 'Deal duration', active: false },
    { label: 'New report', active: true, highlight: true },
    { label: 'Analytics', badge: 7 },
  ];

  return (
    <>
      {/* PRIMARY SIDEBAR - ICON RAIL (DESKTOP ONLY) */}
      <aside 
        className="hidden lg:flex w-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex-col items-center py-6 space-y-8 fixed h-screen z-40 shadow-xl transition-all duration-300 ease-in-out"
        role="navigation"
        aria-label="Primary navigation"
      >
        {/* LOGO WITH GLOW */}
        <div className="flex-shrink-0 relative group z-50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" aria-hidden="true"></div>
          <a
            href="/"
            className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label="Codename Dashboard Home"
          >
            C
          </a>
        </div>

        {/* MAIN ICONS */}
        <nav className="flex flex-col space-y-3" aria-label="Main sections">
          {iconNavItems.map((item, idx) => (
            <button
              key={idx}
              onMouseEnter={() => setHoveredIcon(idx)}
              onMouseLeave={() => setHoveredIcon(null)}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 relative group font-semibold text-sm ${
                item.active
                  ? `bg-gradient-to-br ${item.color} text-white shadow-lg scale-110 ring-2 ring-white/20`
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:scale-105 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.active && (
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-50" aria-hidden="true"></div>
              )}
              <item.icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${hoveredIcon === idx ? 'scale-110' : ''}`} aria-hidden="true" />
              
              {/* Advanced Tooltip */}
              <span 
                className={`absolute left-16 ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-gray-700/50 z-50`}
                role="tooltip"
                aria-hidden="true"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  {item.label}
                </span>
                <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45 border-l border-b border-gray-700/50"></span>
              </span>
            </button>
          ))}
        </nav>

        {/* SPACER */}
        <div className="flex-1" aria-hidden="true"></div>

        {/* HELP + LOGOUT */}
        <nav className="flex flex-col space-y-3 pb-2" aria-label="Utility actions">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-500 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group relative hover:scale-105"
            aria-label="Help and support"
          >
            <HelpCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            <span className="absolute left-16 ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-gray-700/50 z-50" role="tooltip" aria-hidden="true">
              Help & Support
              <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45 border-l border-b border-gray-700/50"></span>
            </span>
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group relative hover:scale-105"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            <span className="absolute left-16 ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-gray-700/50 z-50" role="tooltip" aria-hidden="true">
              Logout
              <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45 border-l border-b border-gray-700/50"></span>
            </span>
          </button>
        </nav>
      </aside>

      {/* SECONDARY SIDEBAR - WITH LABELS (DESKTOP) */}
      <aside
        id={sidebarId}
        ref={sidebarRef}
        className={`hidden lg:flex ${
          secondarySidebarOpen ? 'w-72 translate-x-0 opacity-100' : 'w-0 -translate-x-10 opacity-0'
        } bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex-col overflow-hidden ml-20 shadow-2xl relative z-30`}
        role="navigation"
        aria-label="Secondary navigation"
        aria-hidden={!secondarySidebarOpen}
      >
        {/* HEADER WITH GRADIENT */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 flex-shrink-0">
          <div className="flex items-center gap-3 transition-opacity duration-300 delay-100" style={{ opacity: secondarySidebarOpen ? 1 : 0 }}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20" aria-hidden="true">
              C
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Codename
              </p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pro Edition</p>
            </div>
          </div>
          <button
            ref={toggleButtonRef}
            onClick={() => setSecondarySidebarOpen(!secondarySidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-110 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
            aria-label={secondarySidebarOpen ? 'Close navigation menu (Alt+S)' : 'Open navigation menu (Alt+S)'}
            aria-expanded={secondarySidebarOpen}
            aria-controls={sidebarId}
          >
            {secondarySidebarOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {/* MAIN NAV */}
          <nav className="px-3 py-6 space-y-1" aria-label="Dashboard sections">
            {mainSections.map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                  item.active
                    ? 'bg-gradient-to-r from-pink-50 to-pink-50/50 dark:from-pink-900/20 dark:to-pink-800/10 text-pink-600 dark:text-pink-300 shadow-sm ring-1 ring-pink-100 dark:ring-pink-900/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
              >
                <item.icon 
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-600'}`} 
                  aria-hidden="true" 
                />
                <span className="flex-1 text-left tracking-tight">{item.label}</span>
                {item.active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50"></div>
                )}
              </button>
            ))}
          </nav>

          {/* REPORTS SECTION */}
          <div className="border-t border-gray-100 dark:border-gray-700/50 mt-2 pt-6 px-4">
            <button
              onClick={() => toggleSection('reports')}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest hover:text-gray-800 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 mb-2"
              aria-expanded={expandedSections.reports}
              aria-controls="reports-list"
            >
              <span>Reports</span>
              <div className="flex items-center gap-2">
                <span className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors" role="button" aria-label="Add report">
                  <Plus className="w-3.5 h-3.5 cursor-pointer" />
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    expandedSections.reports ? 'rotate-180 text-gray-800 dark:text-gray-300' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>

            {/* REPORTS LIST */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.reports ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul id="reports-list" className="space-y-0.5 pb-2" role="list">
                {reportsSection.map((item, idx) => (
                  <li key={idx} role="listitem">
                    <button className="flex-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group">
                      <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 flex-shrink-0" aria-hidden="true"></span>
                      <span className="truncate text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full flex-shrink-0 font-bold tracking-wide" aria-label={`${item.badge} notifications`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MY REPORTS SECTION */}
          <div className="border-t border-gray-100 dark:border-gray-700/50 mt-2 pt-6 px-4">
            <button
              onClick={() => toggleSection('myReports')}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest hover:text-gray-800 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 mb-2"
              aria-expanded={expandedSections.myReports}
              aria-controls="my-reports-list"
            >
              <span>My reports</span>
              <div className="flex items-center gap-2">
                <span className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors" role="button" aria-label="Add report">
                  <Plus className="w-3.5 h-3.5 cursor-pointer" />
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    expandedSections.myReports ? 'rotate-180 text-gray-800 dark:text-gray-300' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>

            {/* MY REPORTS LIST */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.myReports ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul id="my-reports-list" className="space-y-0.5 pb-2" role="list">
                {myReportsSection.map((item, idx) => (
                  <li key={idx} role="listitem">
                    <button
                      className={`flex-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group ${
                        item.highlight
                          ? 'text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-900/10 font-medium ring-1 ring-red-100 dark:ring-red-900/20'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                          item.highlight
                            ? 'bg-red-500 shadow-sm shadow-red-500/50 scale-110'
                            : 'bg-gray-300 group-hover:bg-gray-400'
                        }`}
                        aria-hidden="true"
                      ></span>
                      <span className="truncate text-sm">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full flex-shrink-0 font-bold tracking-wide" aria-label={`${item.badge} items`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MANAGE FOLDERS */}
          <div className="px-4 mt-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/30 dashed" aria-label="Manage report folders">
              <Folder className="w-4 h-4" aria-hidden="true" />
              <span>Manage folders</span>
            </button>
          </div>
        </div>

        {/* BOTTOM - SETTINGS WITH PREMIUM STYLE */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-4 backdrop-blur-sm">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200 font-semibold text-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-gray-200/50 dark:ring-gray-700/50" aria-label="Open settings">
            <SettingsIcon className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 text-gray-400 group-hover:text-blue-500" aria-hidden="true" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
