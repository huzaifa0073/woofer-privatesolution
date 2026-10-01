/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#080c10',
        'surface-1': '#0e1318',
        'surface-2': '#141b22',
        'surface-3': '#1a232d',
        accent: '#2d9cf5',
        'accent-bright': '#5bb3f7',
        'accent-soft': 'rgba(45,156,245,0.12)',
        'on-accent': '#ffffff',
        fg: '#e6edf4',
        'fg-muted': '#8fa4b8',
        'fg-dim': '#586a7d',
        line: 'rgba(255,255,255,0.07)',
        'line-strong': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        control: '0.6rem',
      },
      boxShadow: {
        'glow-signal': '0 0 0 1px rgba(99,102,241,0.3), 0 0 16px rgba(99,102,241,0.15)',
      },
    },
  },
  plugins: [],
}
