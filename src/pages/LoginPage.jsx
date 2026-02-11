import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast'; 

import Button from '../components/Button';
import { login } from '../services/authService'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const trimmed = username.trim();
    if (!trimmed) {
      toast.error('Username is required');
      return false;
    }
    if (trimmed.length > 15) {
      toast.error('Username is too long (max 15 characters)');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 600)); 
      await login(username); 
      toast.success(`Welcome, ${username}!`);
      navigate('/dashboard'); 
      
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error(error);
    } finally {
       if (!username) setLoading(false); 
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-4xl bg-white dark:bg-dark-card rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] animate-card-entrance">
        {/* --- LEFT PANEL (VISUAL) --- */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-orange-500 to-amber-600 relative p-10 text-white flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl -translate-x-10 -translate-y-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-300 opacity-20 rounded-full blur-3xl translate-x-10 translate-y-10 animate-pulse delay-1000"></div>
            <div className="relative z-10 flex items-center gap-3 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:rotate-3">
                 <Brain size={28} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-wide">QuizApp</span>
            </div>
            <div className="relative z-10 my-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl font-extrabold leading-tight mb-4">
                Challenge <br/> Yourself.
              </h1>
              <p className="text-orange-100 text-sm font-medium opacity-90">
                Play quizzes, earn points, and learn something new every day.
              </p>
            </div>
        </div>
        {/* --- RIGHT PANEL (FORM) --- */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-dark-card">
            <div className="max-w-sm mx-auto w-full">
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Login
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                  Welcome back! Please enter your details.
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Username
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within/input:text-orange-500">
                      <User className="h-5 w-5 text-gray-400 group-focus-within/input:text-orange-500" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                                 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all duration-300 font-medium"
                      autoFocus
                      autoComplete="username"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-3.5 text-base font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 
                             transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                       Signing in...
                    </span>
                  ) : (
                    <>
                      Sign In 
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <p className="text-xs text-gray-400 cursor-default hover:text-orange-500 transition-colors duration-300">
                    Ready to test your knowledge? Let's get started!
                  </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;