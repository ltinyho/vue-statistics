const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': [
                ['env',
                  {
                    'targets': {
                      'browsers': ['ie >= 9', 'safari >=7'],
                    },
                  },
                ],
                ['es2015'],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};