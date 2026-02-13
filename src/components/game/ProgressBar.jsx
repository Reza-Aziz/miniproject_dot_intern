import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex-1 mr-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm font-semibold text-indigo-600">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;