import { Toaster } from 'react-hot-toast';

import useTheme from '../../hooks/useTheme';

function CustomToaster({ offset = 90 }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      containerStyle={{
        top: offset,
        zIndex: 99999,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? '#292524' : '#fff',
          color: isDark ? '#fff' : '#1C1917',
          borderRadius: '16px',
          padding: '12px 20px',
          boxShadow: '0px 10px 30px -10px rgba(0,0,0,0.2)',
          border: isDark ? '1px solid #444' : '1px solid #f3f4f6',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#F97316',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
}

export default CustomToaster;
