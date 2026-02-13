import React, { useState } from 'react';

function AnswerCard({ options, onAnswerSelect, selectedAnswer }) {
  const [clickedAnswer, setClickedAnswer] = useState(null);

  const handleClick = (index) => {
    if (clickedAnswer !== null) return; // Prevent double click
    
    setClickedAnswer(index);
    
    // Small delay for visual feedback
    setTimeout(() => {
      onAnswerSelect(index);
      setClickedAnswer(null);
    }, 300);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          disabled={clickedAnswer !== null}
          className={`
            w-full bg-white rounded-xl border p-4 sm:p-5 text-left group
            transition-all duration-200 
            ${clickedAnswer === index 
              ? 'border-zinc-900 bg-zinc-50 shadow-none ring-1 ring-zinc-900' 
              : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 shadow-sm hover:shadow-md'
            }
            ${clickedAnswer !== null && clickedAnswer !== index ? 'opacity-50' : ''}
            disabled:cursor-not-allowed
          `}
        >
          <div className="flex items-center">
            <span className={`
              flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-medium text-sm sm:text-base mr-4 transition-colors
              ${clickedAnswer === index 
                ? 'bg-zinc-900 text-white' 
                : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
              }
            `}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className={`
              text-base sm:text-lg font-medium transition-colors
              ${clickedAnswer === index ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'}
            `}>
              {option}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default AnswerCard;