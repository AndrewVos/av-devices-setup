const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: [/node_modules/], use: 'babel-loader' },
      { test: /\.jsx$/, exclude: [/node_modules/], use: 'babel-loader' },
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
    new HtmlWebpackPlugin({
      template: 'example/index.html',
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
  ],
  resolve: {
    alias: {
      'av-devices-setup': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
  },
}
