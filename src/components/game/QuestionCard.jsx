import React from 'react';

function QuestionCard({ question, questionNumber }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 mb-6">
      <div className="mb-4">
        <span className="inline-flex items-center justify-center bg-zinc-100 text-zinc-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Question {questionNumber}
        </span>
      </div>
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-900 leading-tight tracking-tight">
        {question}
      </h2>
    </div>
  );
}

export default QuestionCard;