import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
// import { register } from '../services/authService';
import { register } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      toast.error('Password tidak sama!');
      return;
    }

    setLoading(true);
    const result = await register(formData.username, formData.password);

    if (result.success) {
      toast.success('Akun berhasil dibuat! Silakan login.');
      navigate('/'); // Balik ke Login
    } else {
      toast.error(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border-t-4 border-secondary">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Buat Akun Baru
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-dark-bg dark:border-gray-600 dark:text-white"
            onChange={(e) => setFormData({...formData, confirm: e.target.value})}
          />
          
          <Button type="submit" variant="secondary" className="w-full mt-2" disabled={loading}>
            {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{' '}
          <Link to="/" className="text-secondary font-bold hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;