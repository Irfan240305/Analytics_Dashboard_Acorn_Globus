import React from 'react';

export const Toggle = ({ enabled, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div 
        className={`w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-gray-800' : 'bg-gray-200'}`}
        onClick={() => onChange(!enabled)}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
      </div>
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </label>
  );
};