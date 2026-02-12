import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuestions } from '../services/api';
import QuizCard from '../components/QuizCard';
import Timer from '../components/Timer';
import Loading from '../components/Loading';
import { CATEGORIES } from '../constants/categories';
import { getCurrentUser, saveGameToHistory } from '../services/authService';
import { saveGameState, getGameState, clearGameState } from '../utils/storage';
import QuizResult from '../components/QuizResult';

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getCurrentUser();

  const categoryId = location.state?.categoryId || 9;
  const currentCategory = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const dataFetchedRef = useRef(false);

  const TOTAL_TIME = 60;
  const timeSpent = TOTAL_TIME - timeLeft;

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (dataFetchedRef.current) return;

    const savedState = getGameState(user.username);

    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentIndex(savedState.currentIndex);
      setScore(savedState.score);
      setTimeLeft(savedState.timeLeft);
      setLoading(false);
      dataFetchedRef.current = true;
    } else {
      const loadData = async () => {
        try {
          const data = await fetchQuestions(5, 'medium', categoryId);
          setQuestions(data);
          setLoading(false);
          dataFetchedRef.current = true;
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      loadData();
    }
  }, [categoryId, navigate]);

  // 2. AUTO SAVE
  useEffect(() => {
    if (user && !loading && questions.length > 0 && !isFinished) {
      saveGameState(user.username, {
        questions,
        currentIndex,
        score,
        timeLeft,
        categoryId,
      });
    }
  }, [questions, currentIndex, score, timeLeft, loading, isFinished, categoryId, user]);

  // 3. TIMER
  useEffect(() => {
    if (loading || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isFinished]);

  useEffect(() => {
    if (isFinished && timeLeft === 0) {
      handleFinish();
    }
  }, [isFinished, timeLeft]);

  const handleAnswer = (answer) => {
    if (isExiting) return;

    setIsExiting(true);
    const isCorrect = answer === questions[currentIndex].correct_answer;

    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
    }));

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsExiting(false);
      } else {
        handleFinish(isCorrect);
      }
    }, 300);
  };

  const handleFinish = (lastCorrect = null) => {
    if (user) clearGameState(user.username);

    setIsFinished(true);

    const finalCorrect = score.correct + (lastCorrect === true ? 1 : 0);
    const finalWrong = score.wrong + (lastCorrect === false ? 1 : 0);
    const finalScore = finalCorrect * 10;

    saveGameToHistory({
      date: new Date().toISOString(),
      score: finalScore,
      correct: finalCorrect,
      wrong: finalWrong,
    });
  };

  const handleBackToDashboard = () => {
    if (user) clearGameState(user.username);
    navigate('/dashboard');
  };

  const handleRestart = () => {
    if (user) clearGameState(user.username);
    window.location.reload();
  };

  if (isFinished) {
    return (
      <QuizResult
        score={score}
        totalQuestions={questions.length}
        category={currentCategory}
        timeSpent={timeSpent}
        onRestart={handleRestart}
        onHome={handleBackToDashboard}
      />
    );
  }

  if (loading) return <Loading />;

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 min-h-[70vh] flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 bg-white dark:bg-dark-card px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
          <span className={`${currentCategory.color.replace('text-', 'text-')} text-xl`}>
            {currentCategory.icon}
          </span>
          <span className="font-bold text-gray-700 dark:text-gray-200 text-sm hidden sm:block">
            {currentCategory.name}
          </span>
        </div>
        <Timer duration={timeLeft} />
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          <span>Question {currentIndex + 1}</span>
          <span>{questions.length} Total</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-500 ease-out shadow-lg shadow-orange-500/30"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Card */}
      <QuizCard
        questionData={questions[currentIndex]}
        onAnswerClick={handleAnswer}
        isExiting={isExiting}
      />
    </div>
  );
}

export default QuizPage;
