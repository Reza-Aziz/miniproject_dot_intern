import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex-1">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Progress
        </span>
        <span className="text-xs font-semibold text-zinc-900">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-zinc-900 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;