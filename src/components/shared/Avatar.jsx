import React from 'react';

export const Avatar = ({ children, className = '' }) => {
  return (
    <div className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm ${className}`}>
      {children}
    </div>
  );
};