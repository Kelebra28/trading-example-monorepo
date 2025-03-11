const { join } = require('path');
const sharedConfig = require('../../apps/frontend/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: [
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../apps/frontend/src/**/*.{js,ts,jsx,tsx}')
  ]
};