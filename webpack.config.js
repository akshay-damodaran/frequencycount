const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: `${SRC_DIR}/app/index.js`,
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        enforce: 'pre',
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css?/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: `${DIST_DIR}/index.html`,
    }),
  ],
};

module.exports = config;
