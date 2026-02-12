import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStartQuiz = (categoryId) => {
    navigate('/quiz', { state: { categoryId } });
  };

  return {
    user,
    setUser,
    handleLogout,
    handleStartQuiz,
  };
};
