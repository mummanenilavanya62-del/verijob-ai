/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1120',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155'
        },
        brand: {
          blue: '#2563EB',
          royal: '#1D4ED8',
          purple: '#7C3AED',
          accent: '#06B6D4'
        },
        risk: {
          low: '#10B981',       // Green
          medium: '#F59E0B',    // Amber
          high: '#EF4444'       // Red
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
