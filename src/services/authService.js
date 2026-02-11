const KEY_USERS = 'app_users_db'; 
const KEY_SESSION = 'app_session_user'; 

// Helper: Ambil data
const getUsers = () => {
  const data = localStorage.getItem(KEY_USERS);
  return data ? JSON.parse(data) : [];
};

// 1. LOGIN (Sekaligus Auto-Register)
export const login = async (username) => {
  // Simulasi loading sebentar biar kerasa 'proses'nya
  await new Promise(resolve => setTimeout(resolve, 500));

  let users = getUsers();
  
  // Cari user berdasarkan nama (case insensitive)
  let user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  // Kalo user GAK ADA, kita buatkan otomatis (Auto-Register)
  if (!user) {
    user = {
      username, // Nama asli (misal: Nicholas)
      joinedAt: new Date().toISOString(),
      history: [] 
    };
    users.push(user);
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }

  // Set Session (Login Berhasil)
  localStorage.setItem(KEY_SESSION, user.username);
  
  return { success: true };
};

// 2. LOGOUT
export const logout = () => {
  localStorage.removeItem(KEY_SESSION);
};

// 3. GET CURRENT USER
export const getCurrentUser = () => {
  const username = localStorage.getItem(KEY_SESSION);
  if (!username) return null;

  const users = getUsers();
  // Kita cari usernya lagi buat ambil data history terbaru
  return users.find(u => u.username === username) || null;
};

// 4. SAVE GAME HISTORY
export const saveGameToHistory = (gameResult) => {
  const currentUser = localStorage.getItem(KEY_SESSION);
  if (!currentUser) return;

  const users = getUsers();
  const updatedUsers = users.map(user => {
    if (user.username === currentUser) {
      return { 
        ...user, 
        history: [gameResult, ...user.history] 
      };
    }
    return user;
  });

  localStorage.setItem(KEY_USERS, JSON.stringify(updatedUsers));
};