const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@icons': path.resolve(__dirname, 'src/images/icons'),
    },
  },
};
