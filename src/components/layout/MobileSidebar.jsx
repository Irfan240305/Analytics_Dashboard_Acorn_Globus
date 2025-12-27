// src/components/layout/MobileSidebar.jsx
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, FileText, Settings,
  HelpCircle, LogOut, Star, Clock, ShoppingCart, Target,
  ChevronDown, Plus, Folder, X, SettingsIcon
} from 'lucide-react';
import { announceToScreenReader, generateId } from '../../utils/a11y';

export function MobileSidebar({ mobileMenuOpen, setMobileMenuOpen, expandedSections, toggleSection }) {
  const sidebarId = useRef(generateId('mobile-sidebar')).current;

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
      {/* MOBILE MENU BUTTON (FIXED) */}
      <button 
        className="lg:hidden fixed top-4 left-4 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls={sidebarId}
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <span className="text-lg">☰</span>
        )}
      </button>

      {/* MOBILE SIDEBAR - FULL SCREEN OVERLAY */}
      {mobileMenuOpen && (
        <>
          {/* BACKDROP */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>

          {/* SIDEBAR CONTENT */}
          <aside
            id={sidebarId}
            className={`lg:hidden fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-gray-800 shadow-2xl flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* HEADER */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 flex-shrink-0">
              <div className="flex items-center gap-3">
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
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {/* MAIN NAV */}
              <nav className="px-3 py-6 space-y-1" aria-label="Dashboard sections">
                {mainSections.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileMenuOpen(false)}
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
                  aria-controls="mobile-reports-list"
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
                  <ul id="mobile-reports-list" className="space-y-0.5 pb-2" role="list">
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
                  aria-controls="mobile-my-reports-list"
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
                  <ul id="mobile-my-reports-list" className="space-y-0.5 pb-2" role="list">
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

            {/* BOTTOM - SETTINGS */}
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-4 backdrop-blur-sm space-y-2">
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200 font-semibold text-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md ring-1 ring-gray-200/50 dark:ring-gray-700/50" aria-label="Open settings">
                <SettingsIcon className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 text-gray-400 group-hover:text-blue-500" aria-hidden="true" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200 font-semibold text-sm group focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" aria-label="Logout">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
