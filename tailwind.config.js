/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY: Orange Utama (Vibrant) - Digunakan untuk tombol utama, header aktif
        primary: {
          DEFAULT: '#F97316', // Orange-500
          hover: '#EA580C',   // Orange-600
          light: '#FFF7ED',   // Orange-50 (Sangat muda, untuk background tipis)
        },
        // SECONDARY: Orange Tua (Burnt) - Untuk variasi, border, atau status penting
        secondary: {
          DEFAULT: '#C2410C', // Orange-700
          hover: '#9A3412',   // Orange-800
        },
        // DARK MODE Neutral
        dark: {
          bg: '#1C1917',      // Stone-900 (Hitam kecoklatan, lebih hangat dari abu biasa)
          card: '#292524',    // Stone-800
          text: '#FAFAF9',    // Stone-50
        }
      },
      // Kustomisasi Background Pattern
      backgroundImage: {
        'grid-pattern': "radial-gradient(#F97316 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-sm': '20px 20px',
      }
    },
  },
  plugins: [],
}