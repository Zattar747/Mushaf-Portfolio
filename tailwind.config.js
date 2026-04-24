/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           '#0B0A08',
        surface:      '#131210',
        surface2:     '#1A1815',
        gold:         '#C8A86B',
        'gold-dim':   '#8B6B3A',
        cream:        '#F2EDE4',
        'cream-dim':  '#9A9188',
        'cream-muted':'#4A453E',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm:        ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
