var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/main.js',
  output: {
    path: __dirname,
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  },
};
