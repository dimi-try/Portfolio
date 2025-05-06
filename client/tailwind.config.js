/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#3b82f6', // Blue-500
          dark: '#60a5fa', // Blue-400
        },
        background: {
          light: '#f9fafb', // Gray-50
          dark: '#1f2937', // Gray-800
        },
        card: {
          light: '#ffffff',
          dark: '#374151', // Gray-700
        },
        text: {
          light: '#111827', // Gray-900
          dark: '#e5e7eb', // Gray-200
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Включаем поддержку тем
};