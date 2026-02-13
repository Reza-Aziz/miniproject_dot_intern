import React from 'react';

function GameSummary({ score, userAnswers, questions, onFinish }) {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (percentage >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent Work! 🎉';
    if (percentage >= 60) return 'Good Effort! 👏';
    return 'Keep Practicing! 💪';
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
          Session Complete
        </h1>
        <p className="text-zinc-500">Here's a summary of your performance</p>
      </div>

      {/* Score Display */}
      <div className={`rounded-2xl border p-8 mb-8 text-center ${getScoreColor(score.percentage).replace('text-', 'border-').split(' ')[2]} bg-opacity-50`}>
        <div className="mb-2">
          <span className={`text-5xl sm:text-6xl font-bold tracking-tighter ${getScoreColor(score.percentage).split(' ')[0]}`}>
            {score.percentage}%
          </span>
        </div>
        <p className="text-lg font-medium text-zinc-900 mb-6">
          {getScoreMessage(score.percentage)}
        </p>
        
        <div className="flex justify-center gap-4 sm:gap-12">
          <div className="text-center">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Correct</p>
            <p className="text-2xl font-bold text-zinc-900">{score.correct}<span className="text-zinc-400 text-lg">/{score.total}</span></p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Answered</p>
            <p className="text-2xl font-bold text-zinc-900">{score.answered}<span className="text-zinc-400 text-lg">/{score.total}</span></p>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Review Answers</h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== null;

            return (
              <div 
                key={index}
                className={`
                  p-4 rounded-xl border transition-colors
                  ${isCorrect ? 'border-zinc-200 bg-zinc-50/50' : 
                    wasAnswered ? 'border-rose-100 bg-rose-50/30' : 
                    'border-zinc-200 bg-zinc-50/50'}
                `}
              >
                <div className="flex items-start gap-4">
                  <span className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border
                    ${isCorrect ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                      wasAnswered ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                      'bg-zinc-100 text-zinc-500 border-zinc-200'}
                  `}>
                    {isCorrect ? '✓' : wasAnswered ? '✕' : '-'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 mb-1.5 leading-relaxed">
                      {question.question}
                    </p>
                    <div className="text-xs space-y-1">
                      {wasAnswered ? (
                        <>
                          <div className={isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                            Selected: {question.options[userAnswer]}
                          </div>
                          {!isCorrect && (
                            <div className="text-zinc-500">
                              Correct answer: <span className="text-emerald-700 font-medium">{question.options[question.correctAnswer]}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-zinc-400 italic">
                          Skipped • Correct: {question.options[question.correctAnswer]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={onFinish}
        className="w-full bg-zinc-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-all duration-200 shadow-sm active:scale-[0.99]"
      >
        Return to Menu
      </button>
    </div>
  );
}

export default GameSummary;