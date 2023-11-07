import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      keyframes: {
        slide: {
          '0%': { left: '-150%' },
          '35%': { left: '50%' },
          '65%': { left: '50%' },
          '100%': { left: '150%' },
        }
      },
      
      animation: {
        slide: 'slide 2s linear',
        spinFinite: 'spin 5s '
      }, 

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
