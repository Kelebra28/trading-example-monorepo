const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../libs/utils/src/**/*.{ts,tsx}'),
    join(__dirname, '../../libs/ui-components/src/**/*.{ts,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /text-(red|green|blue|amber|emerald|rose|orange|yellow)-(400|500|600|700)/,
      variants: ['hover', 'focus']
    }
  ]
}