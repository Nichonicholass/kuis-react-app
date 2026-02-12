import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../components/common/Loading';
import QuizCard from '../components/features/quiz/QuizCard';
import QuizResult from '../components/features/quiz/QuizResult';
import Timer from '../components/features/quiz/Timer';
import { CATEGORIES } from '../constants/categories';
import { fetchQuestions } from '../services/api';
import { getCurrentUser, saveGameToHistory } from '../services/authService';
import { clearGameState, getGameState, saveGameState } from '../utils/storage';

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getCurrentUser();

  const categoryId = location.state?.categoryId || 9;
  const currentCategory = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const [questions, setQuestions] = useState(() => {
    const saved = getGameState(user?.username);
    return saved?.questions || [];
  });
  
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = getGameState(user?.username);
    return saved?.currentIndex || 0;
  });
  
  const [score, setScore] = useState(() => {
    const saved = getGameState(user?.username);
    return saved?.score || { correct: 0, wrong: 0 };
  });

  const [loading, setLoading] = useState(() => {
    const saved = getGameState(user?.username);
    return !saved?.questions;
  });
  
  const [endTime, setEndTime] = useState(() => {
    const saved = getGameState(user?.username);
    if (saved?.timeLeft) {
      return Date.now() + (saved.timeLeft * 1000);
    }
    return null;
  });
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = getGameState(user?.username);
    return saved?.timeLeft || 60;
  });

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
    
    if (!savedState?.questions) {
      const loadData = async () => {
        try {
          const data = await fetchQuestions(5, 'medium', categoryId);
          setQuestions(data);
          setEndTime(Date.now() + (TOTAL_TIME * 1000));
          setLoading(false);
          dataFetchedRef.current = true;
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      loadData();
    } else {
      dataFetchedRef.current = true;
    }
  }, [categoryId, navigate, user, TOTAL_TIME]);


  const handleFinish = useCallback((lastCorrect = null) => {
      if (user) clearGameState(user.username);
      setIsFinished(true);

      const finalCorrect = score.correct + (lastCorrect === true ? 1 : 0);
      const finalWrong = score.wrong + (lastCorrect === false ? 1 : 0);
      const finalScore = finalCorrect * 20;

      saveGameToHistory({
        date: new Date().toISOString(),
        score: finalScore,
        correct: finalCorrect,
        wrong: finalWrong,
      });
    }, [user, score]
  );

  useEffect(() => {
    if (user?.username && !loading && questions.length > 0 && !isFinished && endTime) {
      const currentSecondsLeft = Math.ceil((endTime - Date.now()) / 1000);
      
      saveGameState(user.username, {
        questions,
        currentIndex,
        score,
        timeLeft: currentSecondsLeft, 
        categoryId,
      });
    }
  }, [questions, currentIndex, score, loading, isFinished, categoryId, user?.username, endTime]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!user?.username || !endTime || isFinished) return;

      const currentSecondsLeft = Math.ceil((endTime - Date.now()) / 1000);
      
      saveGameState(user.username, {
        questions,
        currentIndex,
        score,
        timeLeft: currentSecondsLeft,
        categoryId,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user?.username, endTime, isFinished, questions, currentIndex, score, categoryId]);

  useEffect(() => {
    if (loading || isFinished || !endTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const remainingSeconds = Math.ceil((endTime - now) / 1000);

      if (remainingSeconds <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
        handleFinish();
      } else {
        setTimeLeft(remainingSeconds);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [loading, isFinished, handleFinish, endTime]);

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

      <QuizCard
        questionData={questions[currentIndex]}
        onAnswerClick={handleAnswer}
        isExiting={isExiting}
      />
    </div>
  );
}

export default QuizPage;