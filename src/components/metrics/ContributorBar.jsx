import React from 'react';
import { Avatar } from '../shared/Avatar';

export const ContributorBar = ({ contributor }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>{contributor.avatar}</Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">${contributor.amount.toLocaleString()}</span>
          <span className="text-xs text-gray-500">{contributor.percentage}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-500"
            style={{ width: `${contributor.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};