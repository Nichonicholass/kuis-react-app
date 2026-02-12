const KEY_USERS = 'app_users_db';
const KEY_SESSION = 'app_session_user';

const getUsers = () => {
  const data = localStorage.getItem(KEY_USERS);
  return data ? JSON.parse(data) : [];
};

export const login = async (username) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();

  let user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    user = {
      username,
      joinedAt: new Date().toISOString(),
      history: [],
    };
    users.push(user);
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }

  localStorage.setItem(KEY_SESSION, user.username);

  return { success: true };
};

export const logout = () => {
  localStorage.removeItem(KEY_SESSION);
};

export const getCurrentUser = () => {
  const username = localStorage.getItem(KEY_SESSION);
  if (!username) return null;

  const users = getUsers();
  return users.find((u) => u.username === username) || null;
};

export const saveGameToHistory = (gameResult) => {
  const currentUser = localStorage.getItem(KEY_SESSION);
  if (!currentUser) return;

  const users = getUsers();
  const updatedUsers = users.map((user) => {
    if (user.username === currentUser) {
      return {
        ...user,
        history: [gameResult, ...user.history],
      };
    }
    return user;
  });

  localStorage.setItem(KEY_USERS, JSON.stringify(updatedUsers));
};
