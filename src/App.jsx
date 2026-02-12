import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import CustomToaster from './components/Toaster';
import useTheme from './hooks/useTheme';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';

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
