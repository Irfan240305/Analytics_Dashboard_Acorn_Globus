import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-800 text-white',
    pink: 'bg-pink-500 text-white',
    light: 'bg-gray-100 text-gray-600',
    danger: 'bg-red-500 text-white'
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};