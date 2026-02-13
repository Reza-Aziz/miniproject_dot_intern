import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveScore } from "../store/slices/auth";
import QuestionCard from "../components/game/QuestionCard";
import AnswerCard from "../components/game/AnswerCard";
import Timer from "../components/game/Timer";
import ProgressBar from "../components/game/ProgressBar";
import GameSummary from "../components/game/GameSummary";

function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);

        // Coba beberapa API endpoint sampai berhasil
        const apiUrls = ["https://opentdb.com/api.php?amount=10&type=multiple", "https://opentdb.com/api.php?amount=10&category=18&type=multiple", "https://opentdb.com/api.php?amount=10&category=21&type=multiple"];

        let data = null;

        for (let i = 0; i < apiUrls.length; i++) {
          const url = apiUrls[i];
          try {
            // Add delay sebelum request untuk hindari rate limiting
            if (i > 0) {
              await new Promise(resolve => setTimeout(resolve, 1000)); // 1 detik delay
            }

            const response = await fetch(url);
            const result = await response.json();

            if (result.response_code === 0 && result.results.length > 0) {
              data = result;
              break; // Berhasil, keluar dari loop
            }
          } catch (err) {
            console.log("Trying next API...", err);
            continue; // Coba URL berikutnya
          }
        }

        if (!data || data.response_code !== 0) {
          throw new Error("Failed to fetch questions from all sources");
        }

        // Transform OpenTDB format ke format kita
        const transformedQuestions = data.results.map((item, index) => {
          // Decode HTML entities
          const decodeHTML = (html) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
          };

          // Shuffle answers
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

    fetchQuestions();
  }, [navigate]);

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

  // Total time tracker
  useEffect(() => {
    if (isLoading || isGameFinished) return;

    const interval = setInterval(() => {
      setTotalTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isGameFinished]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    handleNextQuestion(answerIndex);
  };

  // Handle next question
  const handleNextQuestion = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setIsGameFinished(true);
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
    const minutes = Math.floor(totalTimeElapsed / 60);

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

    navigate("/menu");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {!isGameFinished ? (
          <>
            {/* Cek dulu questions ada isinya */}
            {questions.length > 0 && questions[currentQuestionIndex] ? (
              <>
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                    <Timer timeLeft={timeLeft} />
                  </div>
                </div>

                {/* Question and Answers */}
                <QuestionCard question={questions[currentQuestionIndex].question} questionNumber={currentQuestionIndex + 1} />

                <AnswerCard options={questions[currentQuestionIndex].options} onAnswerSelect={handleAnswerSelect} selectedAnswer={userAnswers[currentQuestionIndex]} />
              </>
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
