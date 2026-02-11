// src/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStartQuiz = (categoryId) => {
    navigate('/quiz', { state: { categoryId } });
  };

  return {
    user,
    handleLogout,
    handleStartQuiz
  };
};