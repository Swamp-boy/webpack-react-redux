const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');//to check size
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, './../src'),
  dist: path.join(__dirname, './../dist'),
  assets: 'assets/',
}

module.exports = {
  experiments: {
    asset: true,
  },
  target: 'web',
  externals: {
    paths: PATHS,
  },
  entry: {
    app: ['@babel/polyfill', `${PATHS.src}/index.js`],
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },

  optimization: { // libraries
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        loader: 'babel-loader',

        exclude: [/node_modules/],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { path: './postcss.config.js' },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],

      },
      {
        test: /\.svg$/,
        type: 'asset',
        use: 'svgo-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.assets}img/`,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}fonts/`,
              // outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.xml$/,
        use: [{
          loader: 'xml-loader',
        }],
      },
      {
        test: /\.csv$/,
        use: [{
          loader: 'csv-loader',
        }],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/index.html`,
      filename: 'index.html',
    }),

    /*    //automatization HtmlWebpackPlugin
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      excludeChunks: ['app'],
    })),
    */
    /*
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img` },
      ],
    }),
    */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),  //to check size
  ],
}
