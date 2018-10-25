// const Config = require('webpack-config');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('./path');

const cssFilename = 'static/css/[name].[contenthash:8].css';
const jsFilename = 'static/js/main.[hash].min.js';

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.build,
    publicPath: '/',
    filename: jsFilename
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.src,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              minimize: true,
              sourceMap: true
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'ie >= 10'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('resolve-url-loader'),
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(svg|png|jpg|ico)$/,
        include: [path.src],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'Assets/images/',
              useRelativePath: false
            }
          }
        ]
      },
      {
        test: /\.woff$/,
        include: [path.assets],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              mimetype: 'application/font-woff',
              outputPath: 'Assets/fonts',
              useRelativePath: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      ':': path.src,
      'Api': path.api,
      'Views': path.views,
      'State': path.state,
      'Constants': path.constants,
      'Components': path.components,
      'Utils': path.utils,
    }
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    // FOR PRODUCTION
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            ascii_only: true // eslint-disable-line
          },
          compress: {
            comparisons: false
          }
        }
      })
    ],
    // END
    // NEEDED BOTH IN PROD AND DEV BUILDS
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([path.build], {
      root: path.root
    }),
    new webpack.DefinePlugin({ '__DEVTOOLS__': false }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractCssChunks({
      filename: cssFilename,
      allChunks: true
    }),
  ]
};
