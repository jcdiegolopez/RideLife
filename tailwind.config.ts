import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#211214',   // Fondo principal oscuro (base del diseño)
        'secondary-dark': '#472429', // Tonos secundarios oscuros (textos o bordes)
        'accent-pink': '#C7919C',    // Rosa claro para corazones o detalles
        'accent-yellow': '#EEA70D',  // Amarillo para estrellas o highlights
        'accent-red': '#EB2945',     // Rojo para botones como "Checkout"
        'white-custom': '#FFFFFF',   // Blanco para textos o fondos claros
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};

export default config;