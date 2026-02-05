import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Butuh ini buat redirect kalau logout
import { fetchQuestions } from '../services/api';
import QuizCard from '../components/QuizCard';
import Timer from '../components/Timer';
import Button from '../components/Button';
import { saveGameState, getGameState, clearGameState, getUser, logoutUser } from '../utils/storage';

function QuizPage() {
  const navigate = useNavigate();
  const user = getUser(); // Ambil nama user

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isFinished, setIsFinished] = useState(false);

  // 1. INITIAL LOAD (Cek LocalStorage dulu, baru API)
  useEffect(() => {
    // Kalau tidak ada user login, tendang ke halaman login
    if (!user) {
      navigate('/');
      return;
    }

    const savedState = getGameState();

    if (savedState) {
      // A. JIKA ADA DATA RESUME: Pakai data yang tersimpan
      console.log("Resume kuis dari storage...");
      setQuestions(savedState.questions);
      setCurrentIndex(savedState.currentIndex);
      setScore(savedState.score);
      setTimeLeft(savedState.timeLeft);
      setLoading(false);
    } else {
      // B. JIKA TIDAK ADA: Ambil baru dari API
      console.log("Mulai kuis baru...");
      const loadData = async () => {
        try {
          const data = await fetchQuestions(5); // Request 5 soal
          setQuestions(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      loadData();
    }
  }, [user, navigate]);

  // 2. AUTO SAVE (Simpan State setiap detik / setiap jawab)
  useEffect(() => {
    if (!loading && questions.length > 0 && !isFinished) {
      const currentState = {
        questions,
        currentIndex,
        score,
        timeLeft
      };
      saveGameState(currentState);
    }
  }, [questions, currentIndex, score, timeLeft, loading, isFinished]);

  // 3. Logic Timer
  useEffect(() => {
    if (loading || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isFinished]);

  // 4. Handle Jawaban
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  // 5. Handle Finish
  const handleFinish = () => {
    setIsFinished(true);
    clearGameState(); // Hapus state resume karena sudah selesai
  };

  // 6. Handle Main Lagi / Logout
  const handleRestart = () => {
    clearGameState(); // Bersihkan data game
    window.location.reload(); // Refresh halaman untuk fetch soal baru
  };

  const handleLogout = () => {
    logoutUser(); // Hapus user & game state
    navigate('/');
  };

  // --- RENDER ---

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-primary font-bold animate-pulse">Menyiapkan Arena...</p>
    </div>
  );

  // TAMPILAN HASIL (RESULT)
  if (isFinished) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2 text-primary">Kuis Selesai! 🎉</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Kerja bagus, {user}!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score.correct}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Benar</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{score.wrong}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Salah</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleRestart}>Main Lagi 🔄</Button>
          <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-50">
            Keluar
          </Button>
        </div>
      </div>
    );
  }

  // TAMPILAN KUIS (MAIN GAME)
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-end mb-6 text-gray-600 dark:text-gray-300">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-70">Player</p>
          <p className="font-bold text-primary">{user}</p>
        </div>
        <Timer duration={timeLeft} />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Komponen Kartu */}
      <QuizCard 
        questionData={questions[currentIndex]} 
        onAnswerClick={handleAnswer} 
      />
    </div>
  );
}

export default QuizPage;