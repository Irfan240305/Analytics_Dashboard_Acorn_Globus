import React from 'react';
import { Search, Settings, Plus } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder='Try searching "insights"'
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center -space-x-2">
          <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
        </div>
        <button className="p-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};