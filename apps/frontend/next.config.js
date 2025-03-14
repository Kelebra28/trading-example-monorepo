const path = require('path');

module.exports = {
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.test\.ts$/,
      loader: 'ignore-loader'
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@monorepo/domain': path.resolve(__dirname, '../../libs/domain/dist'),
      '@monorepo/ui-components': path.resolve(__dirname, '../../libs/ui-components/dist'),
      '@monorepo/utils': path.resolve(__dirname, '../../libs/utils/dist')
    };
    return config;
  },
  experimental: {
    useLightningcss: false,
    externalDir: true
  },
  transpilePackages: [
    'lightningcss',
    '@monorepo/domain',
    '@monorepo/utils',
    '@monorepo/ui-components'
  ],
}