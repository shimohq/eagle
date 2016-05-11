'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './front/assets/scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'index.bundle.js',
    publicPath: '/static/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        include: path.join(__dirname, 'front/assets/script')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass?sourceMap']
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'front/assets/styles')]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    })
  ]
};
