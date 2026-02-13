import React from 'react';

function QuestionCard({ question, questionNumber }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
      <div className="mb-4">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
          Question {questionNumber}
        </span>
      </div>
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
        {question}
      </h2>
    </div>
  );
}

export default QuestionCard;