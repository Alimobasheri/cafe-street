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
      },
      backgroundImage: {
        'building-wall-tiles': `
          linear-gradient(to right, #333 1px, transparent 1px), 
          linear-gradient(to bottom, #333 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'tile-size': '100px 50px', // Rectangular tiles (width: 100px, height: 50px)
      },
    },
  },
  plugins: [],
};
export default config;
