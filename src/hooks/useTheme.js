import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    // Hapus class lama, tambah class baru
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    
    // Simpan ke localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
}