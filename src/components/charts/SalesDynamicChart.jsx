// src/components/charts/SalesDynamicChart.jsx - ENHANCED VERSION

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SalesDynamicChart() {
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [activeMetric, setActiveMetric] = useState('revenue');

  // Sales data for the chart
  const chartData = [
    { 
      month: 'Sep', 
      revenue: 35000, 
      leads: 245,
      representative: 'Armin A',
      initials: 'AA',
      color: '#ec4899'
    },
    { 
      month: 'Oct', 
      revenue: 42500, 
      leads: 298,
      representative: 'Mikasa A',
      initials: 'MA',
      color: '#3b82f6'
    },
    { 
      month: 'Nov', 
      revenue: 38000, 
      leads: 267,
      representative: 'Eren Y',
      initials: 'EY',
      color: '#8b5cf6'
    },
    { 
      month: 'Dec', 
      revenue: 51200, 
      leads: 356,
      representative: 'Armin A',
      initials: 'AA',
      color: '#ec4899'
    },
  ];

  // Custom tooltip with detailed info
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = activeMetric === 'revenue' ? data.revenue : data.leads;
      const unit = activeMetric === 'revenue' ? '$' : '';
      const suffix = activeMetric === 'revenue' ? '' : ' leads';

      return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xl">
          <p className="text-sm font-bold text-gray-900">{data.month}</p>
          <p className="text-xs text-gray-500 mb-2">{data.representative}</p>
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: data.color }}
            ></div>
            <p className="text-sm font-semibold text-gray-900">
              {unit}{value.toLocaleString()}{suffix}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Click for more details
          </p>
        </div>
      );
    }
    return null;
  };

  // Avatar component for data points
  const AvatarMarker = (props) => {
    const { cx, cy, payload } = props;
    if (!payload) return null;

    return (
      <g>
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill={payload.color} 
          stroke="#fff" 
          strokeWidth={2}
        />
      </g>
    );
  };

  // Get max value for scaling
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const maxLeads = Math.max(...chartData.map(d => d.leads));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Sales Dynamic</h2>
            <p className="text-sm text-gray-500 mt-1">Monthly performance trend across team</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveMetric('revenue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeMetric === 'revenue'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Revenue
            </button>
            <button 
              onClick={() => setActiveMetric('leads')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeMetric === 'leads'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Leads
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {chartData.map((data, idx) => {
            const value = activeMetric === 'revenue' ? data.revenue : data.leads;
            const isMax = activeMetric === 'revenue' 
              ? value === maxRevenue 
              : value === maxLeads;
            
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  isMax
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-gray-50 hover:border-pink-300'
                }`}
                onMouseEnter={() => setHoveredDataPoint(idx)}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <p className="text-xs text-gray-600 mb-1">{data.month}</p>
                <p className="text-lg font-bold text-gray-900">
                  {activeMetric === 'revenue' 
                    ? `$${(value / 1000).toFixed(1)}K`
                    : `${value}`
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">{data.representative}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-lg p-6 mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis 
              dataKey="month"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              label={{ value: activeMetric === 'revenue' ? '$' : 'Count', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Revenue Line */}
            {activeMetric === 'revenue' && (
              <>
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={false}
                  fill="url(#colorRevenue)"
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                {/* Avatar markers */}
                {chartData.map((data, idx) => (
                  <ReferenceDot
                    key={idx}
                    x={data.month}
                    y={data.revenue}
                    r={6}
                    fill={data.color}
                    stroke="#fff"
                    strokeWidth={2}
                    onClick={() => setHoveredDataPoint(idx)}
                  />
                ))}
              </>
            )}

            {/* Leads Line */}
            {activeMetric === 'leads' && (
              <>
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  fill="url(#colorLeads)"
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                {/* Avatar markers */}
                {chartData.map((data, idx) => (
                  <ReferenceDot
                    key={idx}
                    x={data.month}
                    y={data.leads}
                    r={6}
                    fill={data.color}
                    stroke="#fff"
                    strokeWidth={2}
                    onClick={() => setHoveredDataPoint(idx)}
                  />
                ))}
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Stats with Team Member Avatars */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Top performers */}
        <div className="col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Top Sales 🔥</h3>
          {chartData
            .sort((a, b) => {
              const aVal = activeMetric === 'revenue' ? b.revenue - a.revenue : b.leads - a.leads;
              return aVal;
            })
            .map((data, idx) => {
              const value = activeMetric === 'revenue' ? data.revenue : data.leads;
              const maxVal = activeMetric === 'revenue' ? maxRevenue : maxLeads;
              const percentage = (value / maxVal) * 100;

              return (
                <div key={idx} className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: data.color }}
                  >
                    {data.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{data.representative}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: data.color
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {activeMetric === 'revenue' 
                        ? `$${(value / 1000).toFixed(1)}K`
                        : `${value}`
                      }
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Right: Key metrics */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Insights</h3>
          <div className="bg-gradient-to-br from-pink-50 to-pink-50/50 rounded-lg p-3 border border-pink-200">
            <p className="text-xs text-gray-600 mb-1">Highest Performance</p>
            <p className="text-lg font-bold text-pink-600">
              {activeMetric === 'revenue'
                ? `$${(maxRevenue / 1000).toFixed(1)}K`
                : `${maxLeads} leads`
              }
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Average</p>
            <p className="text-lg font-bold text-blue-600">
              {activeMetric === 'revenue'
                ? `$${(chartData.reduce((sum, d) => sum + d.revenue, 0) / chartData.length / 1000).toFixed(1)}K`
                : `${Math.round(chartData.reduce((sum, d) => sum + d.leads, 0) / chartData.length)}`
              }
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-gray-600 mb-1">Growth Rate</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-lg font-bold text-green-600">+12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
