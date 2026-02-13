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
    <div className="space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          disabled={clickedAnswer !== null}
          className={`
            w-full bg-white rounded-xl shadow-md p-4 sm:p-6 text-left
            transition-all duration-200 transform
            hover:scale-102 hover:shadow-lg
            ${clickedAnswer === index 
              ? 'ring-4 ring-indigo-500 bg-indigo-50' 
              : 'hover:ring-2 hover:ring-indigo-300'
            }
            ${clickedAnswer !== null && clickedAnswer !== index ? 'opacity-50' : ''}
            disabled:cursor-not-allowed
          `}
        >
          <div className="flex items-center">
            <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm sm:text-base mr-4">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-base sm:text-lg text-gray-800 font-medium">
              {option}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default AnswerCard;