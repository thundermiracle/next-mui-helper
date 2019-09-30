const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: ['next-mui-helper'],
  distDir: '../.next',
});
