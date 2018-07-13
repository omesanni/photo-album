const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = ENV !== 'production';

const devEntries = ['react-hot-loader/patch', 'webpack-hot-middleware/client'];
const sassLoaders = [
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
  'postcss-loader',
  'sass-loader',
];

const plugins = [
  new webpack.DefinePlugin({
    PHOTOS_API: JSON.stringify('https://jsonplaceholder.typicode.com'),
  }),
].concat(DEBUG ?
  new webpack.HotModuleReplacementPlugin() :
  new ExtractTextPlugin('app.css')
);

module.exports = {
  mode: ENV,
  target: 'web',
  entry: (DEBUG ? devEntries : []).concat([
    './src',
    './src/styles/index.scss',
  ]),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: DEBUG ? sassLoaders : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: sassLoaders.filter(f => (f !== 'style-loader'))
        }),
      },
    ],
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : undefined,
  plugins,
};
