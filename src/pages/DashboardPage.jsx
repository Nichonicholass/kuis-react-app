// src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Butuh navigate buat redirect
import { History, Target, Ghost, Hand, ChevronDown, ChevronUp, Clock } from 'lucide-react';

// Import Helper & Komponen
import Navbar from '../components/Navbar'; // Pastikan Navbar dihapus dari sini kalau sudah pakai Layout di App.jsx
import CategoryCard from '../components/CategoryCard';
import ResumeModal from '../components/ResumeModal'; // IMPORT MODAL
import { useDashboard } from '../hooks/useDashboard'; 
import { CATEGORIES } from '../constants/categories'; 
import { getGameState, clearGameState, calculateGiveUpScore } from '../utils/storage';
import { saveGameToHistory } from '../services/authService';
import Button from '../components/Button';

function DashboardPage() {
  const { user, handleStartQuiz } = useDashboard();
  const [showAllHistory, setShowAllHistory] = useState(false);
  const navigate = useNavigate();

  // STATE MODAL
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  // 1. CEK STATE SAAT LOAD
  useEffect(() => {
    if (!user) return;

    // UPDATE: Panggil dengan parameter username
    const savedState = getGameState(user.username);
    // Jika ada save-an game yang belum kelar (currentIndex < total soal)
    if (savedState && savedState.questions && savedState.currentIndex < savedState.questions.length) {
      setResumeData(savedState);
      setShowResumeModal(true);
    }
  }, [user]);

  // 2. LOGIKA LANJUT
  const handleResumeGame = () => {
    navigate('/quiz'); // Langsung lempar ke quiz, dia bakal baca localStorage sendiri
  };

  // 3. LOGIKA NYERAH (GIVE UP)
  const handleGiveUp = () => {
    if (!user) return;
    
    // UPDATE: Ambil punya user ini
    const savedState = getGameState(user.username);
    if (savedState) {
      // Hitung skor akhir (sisa soal dianggap salah)
      const finalResult = calculateGiveUpScore(savedState);
      
      // Simpan ke history user
      saveGameToHistory(finalResult);

      // Hapus data gantung
      clearGameState(user.username);

      // Refresh halaman biar history terupdate & modal hilang
      window.location.reload();
    }
  };

  if (!user) return null;

  const displayedHistory = showAllHistory ? user.history : user.history.slice(0, 4);

  return (
    <div className="w-full min-h-screenfont-sans transition-colors duration-300">
      
      {/* MODAL INTERCEPTOR */}
      <ResumeModal 
        isOpen={showResumeModal} 
        data={resumeData}
        onResume={handleResumeGame} 
        onGiveUp={handleGiveUp} 
      />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* --- HEADER --- */}
        <header className="mb-10 text-center md:text-left" data-aos="fade-right">
            {/* ... Kode Header Sama ... */}
             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center justify-center md:justify-start gap-3">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{user.username}</span>
            <Hand className="text-orange-400 animate-pulse" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Ready to challenge your brain today?
          </p>
        </header>

        {/* --- SECTION 1: CATEGORIES --- */}
        <section className="mb-12">
            {/* ... Kode Kategori Sama ... */}
             <div className="flex items-center gap-2 mb-6 border-l-4 border-orange-500 pl-4" data-aos="fade-right" data-aos-delay="100">
            <Target className="text-orange-500" />
            <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
              Pick a Topic
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, index) => (
              <div 
                key={cat.id || 'random'} 
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                // DISABLE KLIK KALAU MODAL MUNCUL (BIAR GAK CURANG)
                className={showResumeModal ? 'pointer-events-none opacity-50 filter blur-sm' : ''}
              >
                <CategoryCard 
                  category={cat} 
                  onClick={handleStartQuiz} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: HISTORY --- */}
        <section>
             {/* ... Kode History Sama ... */}
             <div className="flex items-center justify-between mb-6 border-l-4 border-gray-400 pl-4" data-aos="fade-right" data-aos-offset="50">
            <div className="flex items-center gap-2">
              <History className="text-gray-600 dark:text-gray-300" />
              <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full">
              {user.history.length} Played
            </span>
          </div>

          <div 
            className="bg-white dark:bg-dark-card rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-6"
            data-aos="fade-up"
          >
            {user.history.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center opacity-60">
                <Ghost size={64} className="text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No matches played yet.</p>
                <p className="text-sm text-gray-400">Pick a topic above to start!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedHistory.map((game, index) => (
                  <div 
                    key={index} 
                    className="group flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">
                        <Clock size={12} />
                        {new Date(game.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold ${game.score >= 50 ? 'text-green-600' : 'text-orange-500'}`}>
                          {game.score}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">pts</span>
                      </div>
                    </div>

                    <div className="text-right w-1/3">
                      <div className="flex justify-end gap-3 text-xs font-bold mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <span className="text-green-600 flex items-center gap-1">✔ {game.correct}</span>
                        <span className="text-red-400 flex items-center gap-1">✖ {game.wrong}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${game.score >= 50 ? 'bg-green-500' : 'bg-orange-400'}`}
                          style={{ width: `${(game.correct / (game.correct + game.wrong)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {user.history.length > 4 && (
              <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                <Button 
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                >
                  {showAllHistory ? <>Show Less <ChevronUp size={16} /></> : <>View All History <ChevronDown size={16} /></>}
                </ Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;