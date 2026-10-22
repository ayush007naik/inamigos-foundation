/** @type {import('tailwindcss').Config} */
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: withVar('--c-ink'),
          soft: withVar('--c-ink-soft'),
          raised: withVar('--c-ink-raised'),
        },
        bone: {
          DEFAULT: withVar('--c-bone'),
          dim: withVar('--c-bone-dim'),
          faint: withVar('--c-bone-faint'),
        },
        line: {
          DEFAULT: withVar('--c-line'),
          soft: withVar('--c-line-soft'),
        },
        ember: {
          DEFAULT: withVar('--c-ember'),
          soft: withVar('--c-ember-soft'),
          deep: withVar('--c-ember-deep'),
        },
        moss: withVar('--c-moss'),
        clay: withVar('--c-clay'),
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.035em',
        wider2: '0.16em',
        widest: '0.28em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      maxWidth: {
        shell: '84rem',
        prose: '44rem',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-vertical': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(0,-50%,0)' },
        },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'caret-blink': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
        'marquee-vertical': 'marquee-vertical 28s linear infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'caret-blink': 'caret-blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
