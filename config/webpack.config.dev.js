// const Config = require('webpack-config');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackDevServer = require('webpack-dev-server');
const path = require('./path');

// const cssFilename = 'static/css/[name].[contenthash:8].css';
const jsFilename = 'static/js/main.[hash].js';
const PORT = 3000;

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.build,
    publicPath: '/',
    filename: jsFilename
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss'],
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
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.src,
        exclude: /node_modules/
      },
      {
        test: /(\.css|\.scss)$/,
        // HMR doesn't work with ExtractTextPlugin, so
        // in development "style" loader enables hot editing of CSS.
        use: [
          ExtractCssChunks.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 3,
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
                  browsers: ['last 2 versions', 'ie >= 11'],
                  flexbox: 'no-2009'
                }),
              ],
            },
          },
          require.resolve('resolve-url-loader'),
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
        include: [path.assets],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'Assets/images',
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
  mode: 'development',
  devtool: 'source-map',
  optimization: {
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
        reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      }
    ),
    new webpack.DefinePlugin({ '__DEVTOOLS__': true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: PORT,
    open: true
  }
};
