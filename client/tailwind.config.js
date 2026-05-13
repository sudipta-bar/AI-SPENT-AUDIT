/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09111f',
        glow: '#7dd3fc',
        mint: '#a7f3d0',
        sand: '#f5e7c8'
      },
      boxShadow: {
        panel: '0 24px 80px rgba(15, 23, 42, 0.28)'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(125, 211, 252, 0.16), transparent 34%), radial-gradient(circle at top right, rgba(167, 243, 208, 0.12), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)'
      }
    }
  },
  plugins: []
};
