import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brain, LogOut, Moon, Sun } from 'lucide-react';

import { getCurrentUser, logout } from '../services/authService';
import Button from './Button';

function Navbar({ toggleTheme, isDark }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  // ------------------------------

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  const isLoginPage = location.pathname === '/';

  return (
    <nav
      className={`
        w-full px-6 py-4 flex justify-between items-center 
        bg-white/90 dark:bg-dark-card/90 backdrop-blur-md shadow-sm 
        border-b border-gray-100 dark:border-gray-800 
        fixed top-0 z-50 transition-transform duration-300 ease-in-out
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-orange-200">
          <Brain size={20} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          React<span className="text-orange-500">Quiz</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        {user && !isLoginPage && (
          <>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="!py-2 !px-4 text-sm flex items-center gap-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 dark:border-red-900/30 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
