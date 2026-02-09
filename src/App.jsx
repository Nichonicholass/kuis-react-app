import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import useTheme from './hooks/useTheme';
import LoginPage from './pages/LoginPage'; // Import Login
import QuizPage from './pages/QuizPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 
                    bg-primary-light dark:bg-dark-bg 
                    bg-dot-pattern flex flex-col ${theme}`}>
      
      {/* Navbar tetap di luar Router agar selalu ada */}
      <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} />

      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <Router>
          <Routes>
            {/* Halaman Utama adalah Login */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Halaman Kuis */}
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </Router>
      </main>
      
      {/* Footer Pemanis (Opsional) */}
      <footer className="p-4 text-center text-gray-400 text-sm">
        &copy; 2026 React Quiz Challenge
      </footer>
    </div>
  );
}

export default App;