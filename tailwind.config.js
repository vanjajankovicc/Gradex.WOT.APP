/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10263F',
          light: '#16324F',
          dark: '#0A1B2E',
        },
        blueprint: {
          DEFAULT: '#0F3B5C',
          line: '#7FB8D9',
          glow: '#BFE3F5',
        },
        paper: {
          DEFAULT: '#F1EEE4',
          line: '#D9D3BF',
          dark: '#E7E2D2',
        },
        safety: {
          DEFAULT: '#E2571F',
          dark: '#C24817',
          light: '#F4936B',
        },
        steel: {
          DEFAULT: '#5B6B78',
          light: '#8A97A2',
          dark: '#3D4A54',
        },
        stamp: {
          green: '#2C6E4F',
          red: '#B23A2E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-paper':
          'linear-gradient(rgba(16,38,63,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(16,38,63,0.055) 1px, transparent 1px)',
        'grid-blueprint':
          'linear-gradient(rgba(191,227,245,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(191,227,245,0.09) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '24px 24px',
        'grid-lg': '48px 48px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,38,63,0.06), 0 4px 16px rgba(16,38,63,0.06)',
        stamp: '0 0 0 2px rgba(44,110,79,0.15)',
      },
    },
  },
  plugins: [],
}
