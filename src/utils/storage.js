const KEY_GAME_PREFIX = 'quiz_game_state_';

const getGameKey = (username) => `${KEY_GAME_PREFIX}${username}`;

export const saveGameState = (username, state) => {
  if (!username) return;
  const key = getGameKey(username);
  const dataToSave = { ...state, owner: username };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

export const getGameState = (username) => {
  if (!username) return null;
  const key = getGameKey(username);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const clearGameState = (username) => {
  if (!username) return;
  const key = getGameKey(username);
  localStorage.removeItem(key);
};

// --- HELPER: Hitung Skor Give Up ---
export const calculateGiveUpScore = (gameState) => {
  if (!gameState) return null;

  const { score } = gameState;
  
  return {
    date: new Date().toISOString(),
    score: score.correct * 10, 
    correct: score.correct,
    wrong: score.wrong + (gameState.questions.length - (score.correct + score.wrong)),
    status: 'Gave Up'
  };
};