'use strict';

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
          presets: ['es2015', 'react']
        },
        include: path.join(__dirname, 'front/assets/script')
      }
    ]
  }
};
