import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { login } from '../services/authService'; // Import Service Baru
import toast, { Toaster } from 'react-hot-toast'; // Opsional: Kalau mau notif keren

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    setLoading(true);
    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login Berhasil!');
      navigate('/dashboard'); // Arahkan ke Dashboard, bukan langsung Kuis
    } else {
      toast.error(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border-t-4 border-primary">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login Akun
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-dark-bg dark:border-gray-600 dark:text-white"
          />
          
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk 🚀'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;