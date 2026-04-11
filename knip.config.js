module.exports = {
  ignore: ['commitlint.config.js'],
  ignoreDependencies: ['@commitlint/config-conventional'],
  paths: {
    '$env/static/private': ['.svelte-kit/ambient.d.ts'],
  },
};
