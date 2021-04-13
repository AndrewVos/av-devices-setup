'use strict';
module.exports = {
  presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
  plugins: [['transform-react-remove-prop-types', { mode: 'remove' }]],
};
