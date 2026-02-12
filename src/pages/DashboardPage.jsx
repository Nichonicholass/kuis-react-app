import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Target, Ghost, Hand, ChevronDown, ChevronUp } from 'lucide-react';

import CategoryCard from '../components/CategoryCard';
import ResumeModal from '../components/ResumeModal'; 
import HistoryItem from '../components/HistoryItem';
import Button from '../components/Button';

import { useDashboard } from '../hooks/useDashboard'; 
import { CATEGORIES } from '../constants/categories'; 
import { getGameState, clearGameState, calculateGiveUpScore } from '../utils/storage';
import { saveGameToHistory } from '../services/authService';

const HISTORY_DISPLAY_LIMIT = 4;

function DashboardPage() {
  const { user, handleStartQuiz, setUser } = useDashboard();
  const [showAllHistory, setShowAllHistory] = useState(false);
  const navigate = useNavigate();

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const savedState = getGameState(user.username);
    if (savedState && savedState.questions && savedState.currentIndex < savedState.questions.length) {
      const timeoutId = setTimeout(() => {
        setResumeData(savedState);
        setShowResumeModal(true);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  const handleResumeGame = useCallback(() => {
    navigate('/quiz');
  }, [navigate]);

  const handleGiveUp = useCallback(() => {
    if (!user) return;
    const savedState = getGameState(user.username);
    if (savedState) {
      const finalResult = calculateGiveUpScore(savedState);
      saveGameToHistory(finalResult);
      clearGameState(user.username);
      setShowResumeModal(false);
      setResumeData(null);
      const newHistory = [finalResult, ...(user.history || [])];
    
    setUser({
      ...user,
      history: newHistory
    });
    }
  }, [user, setUser]);

  const displayedHistory = useMemo(() => {
    if (!user?.history) return [];
    return showAllHistory ? user.history : user.history.slice(0, HISTORY_DISPLAY_LIMIT);
  }, [user, showAllHistory]);

  const hasMoreHistory = useMemo(() => {
    return (user?.history?.length ?? 0) > HISTORY_DISPLAY_LIMIT;
  }, [user]);

  if (!user) return null;

  return (
    <div className="w-full min-h-screen font-sans transition-colors duration-300">
      <ResumeModal 
        isOpen={showResumeModal} 
        data={resumeData}
        onResume={handleResumeGame} 
        onGiveUp={handleGiveUp} 
      />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <header className="mb-10 text-center md:text-left" data-aos="fade-right">
             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center justify-center md:justify-start gap-3">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{user.username}</span>
            <Hand className="text-orange-400 animate-pulse" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Ready to challenge your brain today?
          </p>
        </header>

        {/* --- SECTION: CATEGORIES --- */}
        <section className="mb-12">
             <div className="flex items-center gap-2 mb-6 border-l-4 border-orange-500 pl-4" data-aos="fade-right" data-aos-delay="100">
            <Target className="text-orange-500" />
            <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
              Pick a Topic
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, index) => (
              <div 
                key={cat.id || `category-${index}`} 
                data-aos="zoom-in"
                data-aos-delay={index * 100}
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

        {/* --- SECTION: HISTORY --- */}
        <section>
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
                  <HistoryItem key={game.timestamp || `history-${index}`} game={game} />
                ))}
              </div>
            )}
            {hasMoreHistory && (
              <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                <Button 
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center gap-2"
                >
                  {showAllHistory ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>View All History <ChevronDown size={16} /></>
                  )}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;