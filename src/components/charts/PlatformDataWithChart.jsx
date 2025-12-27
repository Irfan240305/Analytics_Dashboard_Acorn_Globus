// src/components/charts/PlatformDataWithChart.jsx - NEW STRUCTURE

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

import { FloatingPopover } from '../ui/FloatingPopover';
export function PlatformDataWithChart({ platformData = [] }) {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const[anchorRect, setAnchorRect] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  if (!platformData.length) {
    return <div className="p-6 text-center text-gray-500">No data available</div>;
  }

  // Calculate total revenue
  const totalRevenue = platformData.reduce((sum, p) => sum + p.amount, 0);

  // Prepare chart data
  const chartData = platformData.map(platform => ({
    name: platform.name,
    value: platform.amount,
    color: platform.color
  }));

  // Get colors for pie chart
  const COLORS = platformData.map(p => p.color);


useEffect(() => {
  const closeHandler = () => setPopoverOpen(false);
  document.addEventListener("close-popover", closeHandler);
  return () => {
    document.removeEventListener("close-popover", closeHandler);
  };
}, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalRevenue / 1000).toFixed(0)}K</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          <span>≡</span>
          <span>Filters</span>
        </button>
      </div>

      {/* Platform List */}
      <div className="space-y-3 mb-6">
        {platformData.map((platform, idx) => {
          const percentage = ((platform.amount / totalRevenue) * 100).toFixed(0);
          return (
            <div key={idx} className="flex items-center gap-3">
              {/* Color Dot */}
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: platform.color }}
              ></div>

              {/* Platform Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{platform.name}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">${(platform.amount / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: platform.color 
                    }}
                  ></div>
                </div>
              </div>

              {/* Percentage */}
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 ml-2 flex-shrink-0">{percentage}%</span>
            </div>
          );
        })}
      </div>

      {/* Pie Chart */}
      <div className="h-[260px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(data, index, e) => {
                if (!data || !e) return;

                setActiveData({
                  label: data.name,
                  value: data.value,
                  percent: ((data.value / totalRevenue) * 100).toFixed(0),
                });
                setAnchorRect({
                  x: e.clientX,
                  y: e.clientY,
                });
                setPopoverOpen(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => setPopoverOpen(false), 200);
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toLocaleString()}k`}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <FloatingPopover open={popoverOpen} x={anchorRect?.x} y={anchorRect?.y}>
          {activeData && (
            <div className="space-y-1">
              <p className="text-sm font-semibold">{activeData.label}</p>
              <p className="text-gray-500 text-sm">{activeData.percent}% of total</p>
              <p className="text-lg font-bold mt-1">${Math.round(activeData.value).toLocaleString()}K</p>

              <button onClick={() => setPopoverOpen(false)} className="mt-2 w-full rounded-md bg-black text-white py-1 text-sm">Close</button>
            </div>
          )}
        </FloatingPopover>
      </div>
    </div>
  );
}