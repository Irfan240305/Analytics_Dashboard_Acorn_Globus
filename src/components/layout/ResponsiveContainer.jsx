// src/components/layout/ResponsiveContainer.jsx - NEW

import React from 'react';

export function ResponsiveContainer({ 
  children, 
  className = '',
  spacing = 'normal'
}) {
  const spacingMap = {
    compact: 'p-4 md:p-5 lg:p-6',
    normal: 'p-6 md:p-7 lg:p-8',
    spacious: 'p-8 md:p-10 lg:p-12'
  };

  return (
    <div className={`max-w-7xl mx-auto ${spacingMap[spacing]} ${className}`}>
      {children}
    </div>
  );
}
