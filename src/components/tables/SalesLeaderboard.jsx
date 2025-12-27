import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export function SalesLeaderboard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6 flex justify-between items-center border-b border-gray-50 dark:border-gray-700">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Leaderboard</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Top performing companies</p>
        </div>
        <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leads</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {data.map((item, idx) => (
              <tr 
                key={item.id} 
                className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {item.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">Global Partner</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">${(item.revenue / 1000).toFixed(0)}k</div>
                  <div className="text-xs text-green-500 font-medium">+12% vs last month</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{item.leads}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    {item.trend === 'up' ? (
                      <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        Up
                      </span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                        Down
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}