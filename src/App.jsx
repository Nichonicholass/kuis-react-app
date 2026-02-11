// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Layout from './components/Layout'; // Import Layout yang baru

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';

function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    // Kita hapus div pembungkus di sini karena sudah ada di Layout
    <Routes>
      
      {/* BUNGKUS SEMUA PAGE DENGAN LAYOUT */}
      <Route element={<Layout toggleTheme={toggleTheme} isDark={isDark} />}>
        
        {/* Child Routes (Ini yang akan masuk ke <Outlet />) */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      
      </Route>

      {/* Jika nanti ada halaman 404 (Not Found), taruh di luar Layout atau di dalamnya bebas */}
    
    </Routes>
  );
}

export default App;