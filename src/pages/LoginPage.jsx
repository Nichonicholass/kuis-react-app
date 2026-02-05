import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { saveUser, getUser } from '../utils/storage';

function LoginPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Cek kalau user sebenarnya sudah login, langsung lempar ke kuis
  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate('/quiz');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!name.trim()) return;

    saveUser(name); // Simpan nama
    navigate('/quiz'); // Pindah ke halaman kuis
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border-t-4 border-primary">
        
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          Selamat Datang! 👋
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Siap menguji wawasanmu hari ini?
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Nama Peserta
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan namamu..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         dark:bg-dark-bg dark:text-white focus:border-primary focus:ring-2 
                         focus:ring-orange-200 focus:outline-none transition-all font-medium"
              required
            />
          </div>
          
          <Button type="submit" className="w-full mt-4 py-3 text-lg shadow-orange-500/20">
            Mulai Kuis 🚀
          </Button>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;