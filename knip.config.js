module.exports = {
  ignore: ['commitlint.config.js'],
  ignoreDependencies: ['@commitlint/config-conventional'],
  entry: [
    'src/hooks.server.ts',
    'src/routes/**/*',
    'src/lib/**/*',
  ],
  paths: {
    '$env/static/private': ['.svelte-kit/ambient.d.ts'],
  },
};
