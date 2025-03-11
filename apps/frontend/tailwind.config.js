const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    // Añade las rutas a tus librerías compartidas
    join(__dirname, '../../libs/utils/src/**/*.{ts,tsx}'),
    join(__dirname, '../../libs/ui-components/src/**/*.{ts,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Añade esto para clases dinámicas
  safelist: [
    {
      pattern: /text-(red|green|blue|amber|emerald|rose|orange|yellow)-(400|500|600|700)/,
      variants: ['hover', 'focus']
    }
  ]
}