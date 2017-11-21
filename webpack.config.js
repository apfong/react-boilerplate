const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'), // path to client-side Javascript folder, must be an absolute path
  resolve: {
    modulesDirectory: ['node_modules', 'src'],
    extensions: ['.jsx', '.js', '.scss']
  },
  entry: [
    'babel-polyfill',
    // Only load these entry points for non-production mode
    process.env.NODE_ENV !== 'production'
      ? 'react-hot-loader/patch'
      : undefined,
    /* Note: webpack-dev-server automatically adds an entry like:
     *      * 'webpack-dev-server/client?http://localhost:8080/'
     *           * If you end up using webpack-dev-middleware and webpack-hot-middleware,
     *                * you should manually add:
     *                     */
    // process.env.NODE_ENV !== 'production'
    //   ? 'webpack-hot-middleware/client'
    //   : undefined,
    process.env.NODE_ENV !== 'production'
      ? 'webpack/hot/only-dev-server'
      : undefined,
    // Switch between a production and non-production entry point
    process.env.NODE_ENV === 'production'
      ? './main.prod.jsx'
      : './main.dev.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.s?css$/,
//        use: ExtractTextPlugin.extract({ // extract text from a bundle into a separate file. If total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle
          //fallback: 'style-loader', // creates style nodes from JS strings
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['style-loader', 'css-loader', 'sass-loader'] // css-loader translates CSS into CommonJS, sass-loader compiles sass to css
//          loader: ['css-loader', 'sass-loader'] // css-loader translates CSS into CommonJS, sass-loader compiles sass to css
//        })
      }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  plugins: [
//    new ExtractTextPlugin("./dist/styles.css", {
//      allChunks: true,
//    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    process.env.NODE_ENV !== 'production' ? new HtmlWebpackPlugin({
      title: 'My App',
      template: path.join(__dirname, 'src', 'index.html'),
    }) : undefined,
    process.env.NODE_ENV !== 'production' ? new webpack.NamedModulesPlugin() : undefined,
    process.env.NODE_ENV !== 'production' ? new webpack.NoEmitOnErrorsPlugin() : undefined,
  ]
};
