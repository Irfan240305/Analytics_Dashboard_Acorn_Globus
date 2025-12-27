// src/components/charts/BarChartComponent.jsx - WITH RECHARTS

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function BarChartComponent({ data = [], metric = 'revenue' }) {
  const getColor = (index) => {
    const colors = ['#ec4899', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#06b6d4'];
    return colors[index % colors.length];
  };

  const getMetricKey = (metric) => {
    switch(metric) {
      case 'leads':
        return 'leads';
      case 'wl':
        return 'wl';
      default:
        return 'revenue';
    }
  };

  const metricKey = getMetricKey(metric);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Bar 
            dataKey={metricKey} 
            fill="#ec4899" 
            radius={[8, 8, 0, 0]}
            name={metric === 'revenue' ? 'Revenue' : metric === 'leads' ? 'Leads' : 'W/L'}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
