const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = merge(prod, {
  plugins: [
    new CleanWebpackPlugin('../release', { allowExternal: true }),
    new CopyWebpackPlugin([
      'src/monaco.d.ts',
      'out/monaco.contribution.d.ts'
    ], {})
  ],
});