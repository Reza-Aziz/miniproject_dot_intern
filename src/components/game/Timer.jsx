import React from 'react';

function Timer({ timeLeft }) {
  const isUrgent = timeLeft <= 3;

  return (
    <div className={`
      flex items-center gap-2 px-4 py-2 rounded-lg
      ${isUrgent ? 'bg-red-100' : 'bg-gray-100'}
      ${isUrgent ? 'animate-pulse' : ''}
    `}>
      <svg 
        className={`w-5 h-5 ${isUrgent ? 'text-red-600' : 'text-gray-600'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className={`
        text-xl sm:text-2xl font-bold
        ${isUrgent ? 'text-red-600' : 'text-gray-700'}
      `}>
        {timeLeft}s
      </span>
    </div>
  );
}

export default Timer;