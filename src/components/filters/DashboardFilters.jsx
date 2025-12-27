// // src/components/filters/DashboardFilters.jsx - NEW

// import React, { useState } from 'react';
// import { Filter, X, ChevronDown, Search } from 'lucide-react';

// export function DashboardFilters({ 
//   onFilterChange, 
//   activeFilters = {}
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState(activeFilters);

//   // Filter options
//   const filterOptions = {
//     timeframe: {
//       label: 'Timeframe',
//       icon: '📅',
//       options: [
//         { id: '7d', label: 'Last 7 days', value: 7 },
//         { id: '30d', label: 'Last 30 days', value: 30 },
//         { id: '90d', label: 'Last 90 days', value: 90 },
//         { id: 'year', label: 'This Year', value: 365 },
//       ]
//     },
//     metric: {
//       label: 'Metric',
//       icon: '📈',
//       options: [
//         { id: 'revenue', label: 'Revenue', value: 'revenue' },
//         { id: 'leads', label: 'Leads', value: 'leads' },
//         { id: 'winrate', label: 'Win Rate', value: 'winrate' },
//         { id: 'kpi', label: 'KPI', value: 'kpi' },
//       ]
//     },
//     platform: {
//       label: 'Platform',
//       icon: '🌐',
//       options: [
//         { id: 'dribbble', label: 'Dribbble', value: 'dribbble' },
//         { id: 'instagram', label: 'Instagram', value: 'instagram' },
//         { id: 'behance', label: 'Behance', value: 'behance' },
//         { id: 'google', label: 'Google', value: 'google' },
//       ]
//     },
//     performance: {
//       label: 'Performance',
//       icon: '🏆',
//       options: [
//         { id: 'top', label: 'Top Performers', value: 'top' },
//         { id: 'growth', label: 'By Growth', value: 'growth' },
//         { id: 'trending', label: 'Trending Up', value: 'trending' },
//         { id: 'recent', label: 'Recently Updated', value: 'recent' },
//       ]
//     }
//   };

//   const handleFilterChange = (category, optionId) => {
//     const updated = {
//       ...selectedFilters,
//       [category]: selectedFilters[category] === optionId ? null : optionId
//     };
//     setSelectedFilters(updated);
//     onFilterChange(updated);
//   };

//   const clearAllFilters = () => {
//     setSelectedFilters({});
//     setSearchQuery('');
//     onFilterChange({});
//   };

//   const activeFilterCount = Object.values(selectedFilters).filter(v => v !== null).length;

//   // Get label for active filter
//   const getFilterLabel = (category, value) => {
//     if (!value) return null;
//     const option = filterOptions[category]?.options.find(o => o.id === value);
//     return option?.label;
//   };

//   return (
//     <>
//       {/* Filter Button */}
//       <div className="relative">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
//             isOpen || activeFilterCount > 0
//               ? 'bg-pink-50 border-pink-300 text-pink-600'
//               : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
//           }`}
//         >
//           <Filter className="w-4 h-4" />
//           <span>Filters</span>
//           {activeFilterCount > 0 && (
//             <span className="ml-2 px-2 py-0.5 bg-pink-600 text-white text-xs font-bold rounded-full">
//               {activeFilterCount}
//             </span>
//           )}
//           <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </button>

//         {/* Filter Dropdown Menu */}
//         {isOpen && (
//           <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80">
//             {/* Header */}
//             <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="font-semibold text-gray-900">Filter Dashboard</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-1 hover:bg-gray-100 rounded transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>

//             {/* Search */}
//             <div className="px-4 py-3 border-b border-gray-200">
//               <div className="relative">
//                 <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search filters..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-500"
//                 />
//               </div>
//             </div>

//             {/* Filter Groups */}
//             <div className="max-h-96 overflow-y-auto">
//               {Object.entries(filterOptions).map(([category, group]) => (
//                 <div key={category} className="border-b border-gray-100 last:border-0">
//                   {/* Category Header */}
//                   <div className="px-4 py-3 bg-gray-50">
//                     <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
//                       {group.icon} {group.label}
//                     </p>
//                   </div>

//                   {/* Options */}
//                   <div className="px-4 py-2 space-y-2">
//                     {group.options.map((option) => {
//                       const isSelected = selectedFilters[category] === option.id;
//                       return (
//                         <label
//                           key={option.id}
//                           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={isSelected}
//                             onChange={() => handleFilterChange(category, option.id)}
//                             className="w-4 h-4 rounded border-gray-300 text-pink-600 cursor-pointer"
//                           />
//                           <span className="text-sm text-gray-700 flex-1">{option.label}</span>
//                           {isSelected && (
//                             <span className="w-2 h-2 rounded-full bg-pink-600"></span>
//                           )}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex gap-2">
//               <button
//                 onClick={clearAllFilters}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="flex-1 px-3 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Active Filters Pills */}
//       {activeFilterCount > 0 && (
//         <div className="flex flex-wrap gap-2 items-center">
//           {Object.entries(selectedFilters).map(([category, value]) => {
//             if (!value) return null;
//             const label = getFilterLabel(category, value);
//             return (
//               <button
//                 key={`${category}-${value}`}
//                 onClick={() => handleFilterChange(category, value)}
//                 className="flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors"
//               >
//                 {label}
//                 <X className="w-3 h-3" />
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Filter, X, ChevronDown, Search } from 'lucide-react';

export function DashboardFilters({ onFilterChange, activeFilters = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);

  const filterOptions = {
    timeframe: {
      label: 'Timeframe',
      options: [
        { id: '7d', label: 'Last 7 days' },
        { id: '30d', label: 'Last 30 days' },
        { id: '90d', label: 'Last 90 days' },
        { id: 'year', label: 'This Year' },
      ],
    },
    metric: {
      label: 'Metric',
      options: [
        { id: 'revenue', label: 'Revenue' },
        { id: 'leads', label: 'Leads' },
        { id: 'winrate', label: 'Win Rate' },
      ],
    },
    platform: {
      label: 'Platform',
      options: [
        { id: 'dribbble', label: 'Dribbble' },
        { id: 'instagram', label: 'Instagram' },
        { id: 'behance', label: 'Behance' },
        { id: 'google', label: 'Google' },
      ],
    },
  };

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: Math.max(16, rect.right - 320),
      });
    }
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (category, value) => {
    const updated = {
      ...activeFilters,
      [category]: activeFilters[category] === value ? null : value,
    };
    onFilterChange?.(updated);
  };

  return (
    <>
      {/* Trigger */}
      <div ref={buttonRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:border-gray-300 transition"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: 320,
              zIndex: 9999,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                  placeholder="Search filters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="max-h-64 overflow-y-auto p-3 space-y-4">
              {Object.entries(filterOptions).map(([key, group]) => (
                <div key={key}>
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    {group.label}
                  </p>
                  {group.options.map(opt => (
                    <label key={opt.id} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeFilters[key] === opt.id}
                        onChange={() => handleFilterChange(key, opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex gap-2 p-3 border-t">
              <button
                className="flex-1 border rounded-md py-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-pink-600 text-white rounded-md py-2"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>,
          document.getElementById('portal-root')
        )}
    </>
  );
}
