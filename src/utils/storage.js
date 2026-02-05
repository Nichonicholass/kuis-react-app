const KEY_USER = 'quiz_user';
const KEY_GAME = 'quiz_game_state';

// --- Management User ---
export const saveUser = (name) => localStorage.setItem(KEY_USER, name);
export const getUser = () => localStorage.getItem(KEY_USER);
export const logoutUser = () => {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_GAME);
};

// --- Management Game State (Untuk Resume) ---
export const saveGameState = (state) => {
  localStorage.setItem(KEY_GAME, JSON.stringify(state));
};

export const getGameState = () => {
  const data = localStorage.getItem(KEY_GAME);
  return data ? JSON.parse(data) : null;
};

export const clearGameState = () => {
  localStorage.removeItem(KEY_GAME);
};