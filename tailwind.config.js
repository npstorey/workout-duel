/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00FFFF',
        'neon-pink': '#FF69B4',
        'neon-yellow': '#FFFF33',
        'lotto-green': '#00FF7F',
        'taxi-yellow': '#FFD300',
        'arcade-purple': '#A020F0',
        'pizza-red': '#FF6347',
        'winner-gold': '#FFD700',
        'silver': '#C0C0C0',
        'bronze': '#CD7F32',
        // Added for the new aesthetics
        'panna-lights': '#FF6FFF',
        'cab-yellow': '#FFD000',
        'xmas-red': '#FF3F3F',
        'diner-blue': '#439FFF'
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'lotto-sparkle': 'lotto-sparkle 2s infinite',
        'rainbow-laser': 'rainbow-laser 3s linear infinite'
      },
      keyframes: {
        'lotto-sparkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        },
        'rainbow-laser': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
};