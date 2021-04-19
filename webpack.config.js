const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

// noinspection WebpackConfigHighlighting
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: { main: './example/index.js' },
  devtool: 'eval',
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
    isDevelopment &&
      new webpack.ProvidePlugin({
        React: 'react',
        useState: ['react', 'useState'],
        useEffect: ['react', 'useEffect'],
        useContext: ['react', 'useContext'],
        ReactDOM: ['react-dom'],
        PropTypes: 'prop-types',
        classes: 'classnames',
        _: 'lodash',
        Grid: ['@material-ui/core', 'Grid'],
        isMobile: ['react-device-detect', 'isMobile'],
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
