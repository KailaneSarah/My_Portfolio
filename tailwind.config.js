/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Suas cores do style guide
        bg: {
          primary:   '#0a0614', // roxo escuríssimo (dark base)
          secondary: '#3B5BDB', // azul vibrante
          tertiary:  '#E040FB', // pink/magenta
          alt:       '#EDE8F5', // lilás clarinho (white mode surface)
          purple500: '#1a0d2e', // roxo escuro mid
          purple400: '#7B2FBE', // roxo vibrante
          purple300: '#A855F7', // roxo light
          pink500:   '#CC00CC', // pink escuro
          pink400:   '#FF0090', // hot pink
        },
        brand: {
          purple:  '#7B2FBE',
          violet:  '#A855F7',
          pink:    '#FF0090',
          magenta: '#E040FB',
          white:   '#F8F5FF',
        }
      },
      fontSize: {
        'display':    ['clamp(3rem, 8vw, 7rem)',    { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1',    letterSpacing: '-0.02em' }],
        'label':      ['0.6875rem',                { lineHeight: '1',    letterSpacing: '0.12em'  }],
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
