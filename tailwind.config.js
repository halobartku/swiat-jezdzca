/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: '#FF3B3B',    // Red for primary accents
        'primary-text': '#000000',  // Black for text and headers
        'primary-bg': '#FFFFFF',    // White for backgrounds

        // Secondary/Supporting Colors
        'secondary-bg': '#F5F5F5',  // Light Gray for secondary backgrounds
        'secondary-border': '#E0E0E0', // Medium Gray for borders
        'secondary-text': '#4A4A4A',   // Dark Gray for secondary text

        // Accent Colors
        'accent-hover': '#CC2D2D',    // Deep Red for hover states
        'accent-subtle': '#8A8A8A',    // Cool Gray for subtle elements
        'accent-bg': '#FAFAFA',        // Off-White for layered backgrounds

        // Equestrian Theme Colors
        brown: {
          100: '#F5E6D3',
          800: '#8B4513'
        },
        copper: {
          100: '#FFE5D9',
          800: '#B87333'
        },
        bronze: {
          100: '#FFE0CC',
          800: '#CD7F32'
        },
        amber: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00'
        }
      },
    },
  },
  plugins: [],
};
