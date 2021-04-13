'use strict';
module.exports = {
  presets: [['@babel/env', { loose: true, modules: 'auto' }], '@babel/react'],
  plugins: [['transform-react-remove-prop-types', { mode: 'remove' }]],
};
