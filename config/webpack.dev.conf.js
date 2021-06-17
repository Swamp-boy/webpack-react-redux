const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV settings gonna be here
  mode: 'development',

  devServer: {
    port: 8081,
    contentBase: path.join(__dirname, './dist'),
    overlay: {
      warnings: false,
      errors: true,
    },
    open: true,
  },

  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});

// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
});
