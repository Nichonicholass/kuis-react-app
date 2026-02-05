import { useState, useEffect } from 'react';
import { fetchQuestions } from './services/api';
import QuizCard from './components/QuizCard';
import Navbar from './components/Navbar';
import useTheme from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
     // ... logic fetch data SAMA SEPERTI SEBELUMNYA ...
     const loadData = async () => {
        try {
            const data = await fetchQuestions(5);
            setQuestions(data);
            setLoading(false);
        } catch (error) { setLoading(false); }
     };
     loadData();
  }, []);

  const handleAnswer = (answer) => {
    // ... logic handle answer SAMA SEPERTI SEBELUMNYA ...
    if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        alert("Selesai!");
    }
  };

  return (
    // SETUP BACKGROUND KREATIF DISINI
    // 1. bg-orange-50: Warna dasar krem tipis (biar ga putih banget)
    // 2. dark:bg-dark-bg: Warna dasar gelap (Stone-900)
    // 3. bg-dot-pattern: Pattern titik-titik yang kita buat di CSS
    <div className="min-h-screen transition-colors duration-300 
                    bg-primary-light dark:bg-dark-bg 
                    bg-dot-pattern flex flex-col w-full">
      
      <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} />

      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {loading && (
          <div className="flex flex-col items-center gap-4 mt-20">
             {/* Spinner sederhana pake Tailwind */}
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             <p className="text-xl font-bold text-primary animate-pulse">Menyiapkan Kuis...</p>
          </div>
        )}

        {!loading && questions.length > 0 && (
          <div className="w-full max-w-2xl">
            {/* Indikator Progress */}
            <div className="mb-6 flex justify-between items-end text-secondary dark:text-orange-300 font-bold">
              <span>Soal {currentIndex + 1}</span>
              <span className="text-sm opacity-70">Total {questions.length}</span>
            </div>
            
            {/* Progress Bar Visual */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700 overflow-hidden">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <QuizCard 
              questionData={questions[currentIndex]} 
              onAnswerClick={handleAnswer} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;