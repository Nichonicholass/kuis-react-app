// src/components/CustomToaster.jsx
import { Toaster } from 'react-hot-toast';
import useTheme from '../hooks/useTheme'; // Asumsi kamu punya hook ini, atau oper via props

function CustomToaster({ offset = 90 }) {
  const { theme } = useTheme(); // Ambil tema otomatis
  const isDark = theme === 'dark';

  return (
    <Toaster 
      position="top-center" 
      reverseOrder={false}
      containerStyle={{
        top: offset, // Bisa diatur lewat props (default 90px buat hindari Navbar)
        zIndex: 99999,
      }}
      toastOptions={{
        duration: 3000, // Durasi default 3 detik
        style: {
          background: isDark ? '#292524' : '#fff', // Stone-800 vs White
          color: isDark ? '#fff' : '#1C1917',
          borderRadius: '16px', // Lebih bulat
          padding: '12px 20px',
          boxShadow: '0px 10px 30px -10px rgba(0,0,0,0.2)',
          border: isDark ? '1px solid #444' : '1px solid #f3f4f6',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#F97316', // Orange Theme
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444', // Red
            secondary: 'white',
          },
        },
      }}
    />
  );
}

export default CustomToaster;