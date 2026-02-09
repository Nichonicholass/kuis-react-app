import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getCurrentUser, logout } from '../services/authService';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      {/* Header Dashboard */}
      <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-3xl text-white shadow-lg mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Halo, {user.username}! 👋</h1>
          <p className="opacity-90">Siap mengasah otakmu hari ini?</p>
        </div>
        <Button onClick={() => navigate('/quiz')} className="bg-white !text-primary shadow-none hover:bg-gray-100">
          Mulai Kuis Baru ▶
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Stats Ringkas */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Permainan</h3>
            <p className="text-4xl font-bold text-gray-800 dark:text-white">{user.history.length}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="w-full border-red-500 text-red-500 hover:bg-red-50">
            Logout
          </Button>
        </div>

        {/* Kolom Kanan: History List */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            🕒 Riwayat Permainan
          </h2>
          
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {user.history.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Belum ada riwayat. Ayo main!</div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {user.history.map((game, index) => (
                  <div key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">
                        Skor: {game.score}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(game.date).toLocaleDateString()} • {new Date(game.date).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <span className="text-green-600 font-bold">{game.correct} Benar</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-red-500 font-bold">{game.wrong} Salah</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;