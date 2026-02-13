import React from 'react';

function Timer({ timeLeft }) {
  const isUrgent = timeLeft <= 3;

  return (
    <div className={`
      flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-300
      ${isUrgent 
        ? 'bg-red-50 border-red-200 text-red-600' 
        : 'bg-zinc-50 border-zinc-200 text-zinc-600'
      }
    `}>
      <svg 
        className="w-4 h-4"
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
      <span className="text-base font-semibold tabular-nums">
        {timeLeft}s
      </span>
    </div>
  );
}

export default Timer;