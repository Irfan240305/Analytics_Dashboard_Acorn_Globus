import React, { useState, useMemo } from 'react';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { workPlatforms } from '../../data/mockData';

export const SalesTable = ({ data }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-xs text-gray-500">
              <th className="text-left p-3 font-medium">Sales</th>
              <th className="text-left p-3 font-medium cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSort('revenue')}>
                Revenue {sortKey === 'revenue' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left p-3 font-medium cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSort('leads')}>
                Leads {sortKey === 'leads' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left p-3 font-medium cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSort('kpi')}>
                KPI {sortKey === 'kpi' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left p-3 font-medium cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSort('wl')}>
                W/L {sortKey === 'wl' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Avatar>{row.avatar}</Avatar>
                    <span className="font-medium text-sm">{row.name}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${row.revenue.toLocaleString()}</span>
                    <Badge>{row.leads}</Badge>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm">{row.leads}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm">{row.kpi}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{row.wl}%</span>
                    <Badge>{row.score}</Badge>
                    <span className="text-sm text-gray-500">{row.rank}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Top sales 💪</span>
          <span className="text-sm font-medium">Sales streak 🔥</span>
          <span className="text-sm font-medium">Top review 👍</span>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Work with platforms</div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {workPlatforms.slice(0, 3).map((platform, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-sm">{platform.name}</span>
                {platform.badge && (
                  <div className="flex items-center gap-1">
                    <Badge variant="pink">⚡ {platform.badge}</Badge>
                    <Badge variant="pink">${(platform.amount / 1000).toFixed(0)}k</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Instagram</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">28.1%</span>
                <span className="text-xs text-gray-400">$44,072</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">●●</span>
                <span className="text-sm font-semibold">5.4%</span>
              </div>
              <span className="text-xs text-gray-400">$8,489</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">📊 Other</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">7.1%</span>
              <span className="text-xs text-gray-400">$11,135</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};