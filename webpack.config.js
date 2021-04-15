const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: { main: './example/index.js' },
  module: {
    rules: [
      { test: /\.js$/, exclude: [/node_modules/], use: 'babel-loader' },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './example/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      useState: ['react', 'useState'],
      useEffect: ['react', 'useEffect'],
      ReactDOM: ['react-dom'],
      PropTypes: 'prop-types',
      classes: 'classnames',
      _: 'lodash',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      'av-devices-setup': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
  },
}
