import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff00', // Green
        secondary: '#ffffff', // White
        background: '#413d3a', // Dark Mode
        'tile-light-grey': '#d3d3d3',
        'neon-pink': '#ff007f',
        'neon-blue': '#00bfff',
        'neon-yellow': '#ffea00',
        'neon-green': '#39FF14', // Neon Green
        'dark-neon-pink': '#cc0066',
        'dark-neon-blue': '#0080bf',
        'dark-neon-yellow': '#ccb800',
        'dark-neon-green': '#2ecc10',
      },
      boxShadow: {
        'neon-pink': '0 0 20px #ff007f, 0 0 30px #ff007f',
        'neon-blue': '0 0 20px #00bfff, 0 0 30px #00bfff',
        'neon-yellow': '0 0 20px #ffea00, 0 0 30px #ffea00',
        'neon-green': '0 0 20px #39FF14, 0 0 30px #39FF14', // Neon Green Shadow
      },
      dropShadow: {
        'text-shadow': '0 1.2px 1.2px rgba(0,0,0,0.8)',
        'neon-pink': [
          '0 0 5px #ff007f',
          '0 0 10px #ff007f',
          '0 0 15px #ff007f',
        ],
        'neon-blue': [
          '0 0 5px #00bfff',
          '0 0 10px #00bfff',
          '0 0 15px #00bfff',
        ],
        'neon-yellow': [
          '0 0 5px #ffea00',
          '0 0 10px #ffea00',
          '0 0 15px #ffea00',
        ],
        'neon-green': [
          '0 0 5px #39FF14',
          '0 0 10px #39FF14',
          '0 0 15px #39FF14',
        ],
        'dark-neon-pink': [
          '0 0 1px #cc0066',
          '0 0 5px #cc0066',
          '0 2px 4px rgba(0, 0, 0, 0.9)', // Stronger black shadow for better readability
        ],
        'dark-neon-blue': [
          '0 0 1px #0080bf',
          '0 0 5px #0080bf',
          '0 2px 4px rgba(0, 0, 0, 0.9)', // Stronger shadow
        ],
        'dark-neon-yellow': [
          '0 0 1px #ccb800',
          '0 0 5px #ccb800',
          '0 2px 4px rgba(0, 0, 0, 0.9)',
        ],
        'dark-neon-green': [
          '0 0 1px #2ecc10',
          '0 0 5px #2ecc10',
          '0 2px 4px rgba(0, 0, 0, 0.9)',
        ],
      },
      backgroundImage: {
        'building-wall-tiles': `
          linear-gradient(to right, #333 1px, transparent 1px), 
          linear-gradient(to bottom, #333 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'tile-size': '100px 50px',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1.25)' },
          '50%': { opacity: '0.95', filter: 'brightness(1.7)' },
          '25%, 75%': { opacity: '1', filter: 'brightness(1.5)' },
        },
        ringColorCycle: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px rgba(57, 255, 20, 0.5), 0 0 7px rgba(57, 255, 20, 0.5)',
            ringColor: '#2ecc10',
          }, // Subtle Neon Green
          '25%': {
            boxShadow:
              '0 0 5px rgba(255, 234, 0, 0.5), 0 0 7px rgba(255, 234, 0, 0.5)',
            ringColor: '#ccb800',
          }, // Subtle Neon Yellow
          '50%': {
            boxShadow:
              '0 0 5px rgba(0, 191, 255, 0.5), 0 0 7px rgba(0, 191, 255, 0.5)',
            ringColor: '#0080bf',
          }, // Subtle Neon Blue
          '75%': {
            boxShadow:
              '0 0 5px rgba(255, 0, 127, 0.5), 0 0 7px rgba(255, 0, 127, 0.5)',
            ringColor: '#cc0066',
          }, // Subtle Neon Pink
        },
      },
      animation: {
        flicker: 'flicker 1.5s infinite',
        ringShadowColorCycle: 'ringColorCycle 20s ease-in-out infinite',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [],
};
export default config;
