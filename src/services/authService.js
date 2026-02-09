const KEY_USERS = 'app_users_db'; // "Tabel" Users
const KEY_SESSION = 'app_session_user'; // "Session" User yg login

// Helper: Ambil semua user dari LocalStorage
const getUsers = () => {
  const data = localStorage.getItem(KEY_USERS);
  return data ? JSON.parse(data) : [];
};

// 1. REGISTER
export const register = async (username, password) => {
  // Simulasi delay network biar kerasa kayak real app
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getUsers();

  // Cek apakah username sudah ada?
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: 'Username sudah terpakai!' };
  }

  // Buat user baru (Password plain text gapapa untuk mock)
  const newUser = {
    username,
    password, 
    joinedAt: new Date().toISOString(),
    history: [] // Tempat simpan riwayat kuis nanti
  };

  users.push(newUser);
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
  
  return { success: true };
};

// 2. LOGIN
export const login = async (username, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem(KEY_SESSION, username); // Set Session
    return { success: true, user };
  }

  return { success: false, message: 'Username atau Password salah!' };
};

// 3. LOGOUT
export const logout = () => {
  localStorage.removeItem(KEY_SESSION);
};

// 4. GET CURRENT USER (Profile & History)
export const getCurrentUser = () => {
  const username = localStorage.getItem(KEY_SESSION);
  if (!username) return null;

  const users = getUsers();
  return users.find(u => u.username === username) || null;
};

// 5. SAVE GAME HISTORY (Fitur Penting!)
export const saveGameToHistory = (gameResult) => {
  const currentUser = localStorage.getItem(KEY_SESSION);
  if (!currentUser) return;

  const users = getUsers();
  const updatedUsers = users.map(user => {
    if (user.username === currentUser) {
      // Tambahkan hasil game ke array history user ini
      return { 
        ...user, 
        history: [gameResult, ...user.history] // Taruh paling atas (terbaru)
      };
    }
    return user;
  });

  localStorage.setItem(KEY_USERS, JSON.stringify(updatedUsers));
};