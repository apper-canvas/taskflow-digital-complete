/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'bounce-in': 'bounceIn 0.3s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'confetti': 'confetti 0.5s ease-out',
        'checkmark': 'checkmark 0.3s ease-out'
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' }
        },
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0' }
        },
        checkmark: {
          '0%': { strokeDashoffset: '16' },
          '100%': { strokeDashoffset: '0' }
        }
      }
    },
  },
  plugins: [],
}