import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveScore } from "../store/slices/auth";
import QuestionCard from "../components/game/QuestionCard";
import AnswerCard from "../components/game/AnswerCard";
import Timer from "../components/game/Timer";
import ProgressBar from "../components/game/ProgressBar";
import GameSummary from "../components/game/GameSummary";

// Helper: Save game state ke localStorage
const saveGameState = (state) => {
  try {
    localStorage.setItem(
      "gameState",
      JSON.stringify({
        ...state,
        timestamp: Date.now(), // Buat validasi data expired
      }),
    );
  } catch (error) {
    console.error("Error saving game state:", error);
  }
};

// Helper: Load game state dari localStorage
const loadGameState = () => {
  try {
    const saved = localStorage.getItem("gameState");
    if (!saved) return null;

    const data = JSON.parse(saved);

    // Validasi: Buang data kalau lebih dari 24 jam
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Date.now() - data.timestamp > ONE_DAY) {
      localStorage.removeItem("gameState");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error loading game state:", error);
    return null;
  }
};

// Helper: Clear game state
const clearGameState = () => {
  localStorage.removeItem("gameState");
};

function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedGameData, setSavedGameData] = useState(null);

  // Fetch questions from API
  // Check for saved game on mount
  useEffect(() => {
    const savedGame = loadGameState();

    if (savedGame && savedGame.questions && savedGame.questions.length > 0) {
      // Ada saved game, tanya user mau resume atau ngga
      setSavedGameData(savedGame);
      setShowResumeDialog(true);
    } else {
      // Gak ada saved game, fetch baru
      fetchQuestions();
    }
  }, []);

  // Fetch questions function (dipisah dari useEffect)
  const fetchQuestions = async () => {
    try {
      setIsLoading(true);

      const apiUrls = ["https://opentdb.com/api.php?amount=10&type=multiple", "https://opentdb.com/api.php?amount=10&category=18&type=multiple", "https://opentdb.com/api.php?amount=10&category=21&type=multiple"];

      let data = null;

      for (let i = 0; i < apiUrls.length; i++) {
        const url = apiUrls[i];
        try {
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          const response = await fetch(url);
          const result = await response.json();

          if (result.response_code === 0 && result.results.length > 0) {
            data = result;
            break;
          }
        } catch (err) {
          console.log("Trying next API...", err);
          continue;
        }
      }

      if (!data || data.response_code !== 0) {
        throw new Error("Failed to fetch questions from all sources");
      }

      const transformedQuestions = data.results.map((item, index) => {
        const decodeHTML = (html) => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        };

        const allAnswers = [...item.incorrect_answers.map((ans) => decodeHTML(ans)), decodeHTML(item.correct_answer)];
        const shuffled = allAnswers.sort(() => Math.random() - 0.5);

        return {
          id: index + 1,
          question: decodeHTML(item.question),
          options: shuffled,
          correctAnswer: shuffled.indexOf(decodeHTML(item.correct_answer)),
        };
      });

      setQuestions(transformedQuestions);
      setUserAnswers(new Array(transformedQuestions.length).fill(null));
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load questions. Please try again later.");
      navigate("/menu");
    } finally {
      setIsLoading(false);
    }
  };

  // Timer per soal (countdown)
  useEffect(() => {
    if (isLoading || isGameFinished) return;

    if (timeLeft === 0) {
      handleNextQuestion(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isLoading, isGameFinished]);

  // Handle resume game
  const handleResumeGame = () => {
    if (savedGameData) {
      setQuestions(savedGameData.questions);
      setCurrentQuestionIndex(savedGameData.currentQuestionIndex);
      setUserAnswers(savedGameData.userAnswers);
      setTimeLeft(savedGameData.timeLeft);
      setTimeSpentPerQuestion(savedGameData.timeSpentPerQuestion);
      setIsLoading(false);
    }
    setShowResumeDialog(false);
  };

  // Handle start new game
  const handleStartNewGame = () => {
    clearGameState();
    setShowResumeDialog(false);
    fetchQuestions();
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    handleNextQuestion(answerIndex);
  };

  // Handle next question
  const handleNextQuestion = (answer) => {
    const timeSpent = 10 - timeLeft;
    const newTimeSpent = [...timeSpentPerQuestion, timeSpent];
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;

    const newIndex = currentQuestionIndex + 1; // ← PINDAH KESINI

    setTimeSpentPerQuestion(newTimeSpent);
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(newIndex);
      setTimeLeft(10);

      // Auto-save state setelah jawab
      saveGameState({
        questions,
        currentQuestionIndex: newIndex,
        userAnswers: newAnswers,
        timeLeft: 10,
        timeSpentPerQuestion: newTimeSpent,
      });
    } else {
      setIsGameFinished(true);
      // Clear saved game karena udah selesai
      clearGameState();
    }
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    let answered = 0;

    userAnswers.forEach((answer, index) => {
      if (answer !== null) answered++;
      if (answer === questions[index].correctAnswer) correct++;
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const totalSeconds = timeSpentPerQuestion.reduce((sum, time) => sum + time, 0);
    const minutes = Math.floor(totalSeconds / 60);

    return {
      percentage,
      minutes,
      correct,
      answered,
      total: questions.length,
    };
  };

  // Handle finish game
  const handleFinishGame = () => {
    const score = calculateScore();

    dispatch(
      saveScore({
        percentage: score.percentage,
        minutes: score.minutes,
      }),
    );

    clearGameState();

    navigate("/menu");
  };

  // Resume Dialog
  if (showResumeDialog) {
    return (
      <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center p-4 selection:bg-zinc-900 selection:text-white">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 max-w-md w-full">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight mb-2">Resume Session</h2>
            <p className="text-zinc-500 text-sm">You have an unfinished game in progress.</p>
          </div>

          {savedGameData && (
            <div className="bg-zinc-50 rounded-xl p-4 mb-6 border border-zinc-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Progress</span>
                <span className="text-sm font-semibold text-zinc-900">{savedGameData.currentQuestionIndex + 1} <span className="text-zinc-400">/</span> {savedGameData.questions.length}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-1.5">
                <div 
                  className="bg-zinc-900 h-1.5 rounded-full" 
                  style={{ width: `${((savedGameData.currentQuestionIndex + 1) / savedGameData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              onClick={handleResumeGame} 
              className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-800 transition-all duration-200 active:scale-[0.98] shadow-sm"
            >
              Resume Game
            </button>
            <button 
              onClick={handleStartNewGame} 
              className="flex-1 bg-white text-zinc-700 py-3 rounded-xl font-medium border border-zinc-200 hover:bg-zinc-50 transition-all duration-200"
            >
              Start New
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-900 border-t-transparent mx-auto mb-4"></div>
          <p className="text-zinc-500 text-sm font-medium animate-pulse">Preparing your questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-6 lg:p-8 flex items-center justify-center selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-3xl">
        {!isGameFinished ? (
          <>
            {/* Cek dulu questions ada isinya */}
            {questions.length > 0 && questions[currentQuestionIndex] ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4 sm:px-6 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-2/3">
                      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                    </div>
                    <div className="w-full sm:w-auto flex justify-end">
                      <Timer timeLeft={timeLeft} />
                    </div>
                  </div>
                </div>

                {/* Question and Answers */}
                <QuestionCard question={questions[currentQuestionIndex].question} questionNumber={currentQuestionIndex + 1} />

                <AnswerCard options={questions[currentQuestionIndex].options} onAnswerSelect={handleAnswerSelect} selectedAnswer={userAnswers[currentQuestionIndex]} />
              </div>
            ) : null}
          </>
        ) : (
          <GameSummary score={calculateScore()} userAnswers={userAnswers} questions={questions} onFinish={handleFinishGame} />
        )}
      </div>
    </div>
  );
}

export default Game;
