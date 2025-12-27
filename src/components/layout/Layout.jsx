import React, { useState, useEffect, useRef } from 'react';
import { announceToScreenReader, generateId } from '../../utils/a11y';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export function Layout({ children }) {
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    reports: true,
    myReports: true,
  });

  const mainContentId = useRef(generateId('main-content')).current;

  useEffect(() => {
    const message = secondarySidebarOpen
      ? 'Secondary navigation opened'
      : 'Secondary navigation closed';
    announceToScreenReader(message, 'polite');
  }, [secondarySidebarOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    announceToScreenReader(
      expandedSections[section]
        ? `${section} section collapsed`
        : `${section} section expanded`,
      'polite'
    );
  };

  return (
    <>
      {/* Skip link */}
      <a href={`#${mainContentId}`} className="skip-link z-50">
        Skip to main content
      </a>

      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        {/* Desktop Sidebar */}
        <DesktopSidebar
          secondarySidebarOpen={secondarySidebarOpen}
          setSecondarySidebarOpen={setSecondarySidebarOpen}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />

        {/* Mobile Sidebar */}
        <MobileSidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div
          className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300
            lg:ml-20
          `}
        >
          {/* Mobile Header */}
          <header className="flex items-center justify-between p-4 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-xl"
              aria-label="Open menu"
            >
              ☰
            </button>
            <span className="font-semibold">Dashboard</span>
          </header>

          <main
            id={mainContentId}
            role="main"
            tabIndex={-1}
            className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
