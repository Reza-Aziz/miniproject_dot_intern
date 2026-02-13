import React from 'react';

function GameSummary({ score, userAnswers, questions, onFinish }) {
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good Job! 👏';
    return 'Keep Practicing! 💪';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Game Complete!
        </h1>
        <p className="text-gray-600">Here's how you did</p>
      </div>

      {/* Score Display */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8 text-center">
        <p className={`text-6xl sm:text-7xl font-bold mb-2 ${getScoreColor(score.percentage)}`}>
          {score.percentage}%
        </p>
        <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          {getScoreMessage(score.percentage)}
        </p>
        <div className="flex justify-center gap-8 text-gray-600">
          <div>
            <p className="text-sm">Correct</p>
            <p className="text-2xl font-bold text-green-600">{score.correct}/{score.total}</p>
          </div>
          <div>
            <p className="text-sm">Time</p>
            <p className="text-2xl font-bold text-indigo-600">{score.minutes}m</p>
          </div>
          <div>
            <p className="text-sm">Answered</p>
            <p className="text-2xl font-bold text-purple-600">{score.answered}/{score.total}</p>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Answers</h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== null;

            return (
              <div 
                key={index}
                className={`
                  p-4 rounded-lg border-2
                  ${isCorrect ? 'border-green-300 bg-green-50' : 
                    wasAnswered ? 'border-red-300 bg-red-50' : 
                    'border-gray-300 bg-gray-50'}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold
                    ${isCorrect ? 'bg-green-500' : wasAnswered ? 'bg-red-500' : 'bg-gray-400'}
                  `}>
                    {isCorrect ? '✓' : wasAnswered ? '✗' : '-'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Q{index + 1}: {question.question}
                    </p>
                    <div className="text-xs text-gray-600">
                      {wasAnswered ? (
                        <>
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            Your answer: {question.options[userAnswer]}
                          </span>
                          {!isCorrect && (
                            <span className="text-green-600 ml-2">
                              • Correct: {question.options[question.correctAnswer]}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Not answered • Correct: {question.options[question.correctAnswer]}
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
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl"
      >
        Back to Menu
      </button>
    </div>
  );
}

export default GameSummary;