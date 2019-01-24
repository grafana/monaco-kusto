const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
  mode: 'development',
  // devtool: "cheap-module-source-map",
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 8889 }),
    // new CleanWebpackPlugin('../release/webpack', { allowExternal: true }),
    // new UglifyJSPlugin()
  ],
});