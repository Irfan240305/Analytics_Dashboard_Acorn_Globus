import React, { useState } from 'react';
import { menuItems, goals, reports, myReports } from '../../data/mockData';

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const [active, setActive] = useState('new-report');

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">C</div>
        {!collapsed && <span className="font-semibold">Codename.com</span>}
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {menuItems.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors">
            <span>{item.icon}</span>
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </div>
        ))}

        {!collapsed && (
          <>
            <div className="mt-6 mb-2">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-semibold text-gray-500">Goals</span>
                <button className="text-gray-400 hover:text-gray-600">+</button>
              </div>
              {goals.map(item => (
                <div key={item.id} className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                  <span>{item.label}</span>
                  {item.badge && <span className="w-5 h-5 bg-red-500 text-white text-xs rounded flex items-center justify-center">{item.badge}</span>}
                </div>
              ))}
            </div>

            <div className="mt-6 mb-2">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-semibold text-gray-500">Reports</span>
                <button className="text-gray-400 hover:text-gray-600">+</button>
              </div>
              <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                Share with me
              </div>
              {reports.map(item => (
                <div key={item.id} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer pl-6 transition-colors">
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-6 mb-2">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-xs font-semibold text-gray-500">My reports</span>
                <button className="text-gray-400 hover:text-gray-600">▼</button>
              </div>
              {myReports.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                    active === item.id ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActive(item.id)}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="w-5 h-5 bg-red-500 text-white text-xs rounded flex items-center justify-center">{item.badge}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">LB</div>
          {!collapsed && <span className="text-sm font-medium">Lucy Bell</span>}
        </div>
      </div>
    </div>
  );
};