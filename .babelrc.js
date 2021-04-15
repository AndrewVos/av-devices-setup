'use strict'
module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: [
      ['@babel/preset-env', { loose: true, modules: false }],
      '@babel/preset-react',
    ],
    plugins: [['transform-react-remove-prop-types', { mode: 'remove' }]],
    ...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
  }
}
