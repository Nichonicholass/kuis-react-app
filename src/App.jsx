import { Routes, Route } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import CustomToaster from './components/Toaster';

function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <CustomToaster />
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme} isDark={isDark} />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
