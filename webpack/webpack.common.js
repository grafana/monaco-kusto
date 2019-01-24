const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  node: {
    fs: 'empty'
  },
  entry: {
    // 'monaco.contribution': './src/monaco.contribution.ts',
    'monaco.contribution': './src/index.ts',
    // 'kusto.worker': './src/kusto.worker.ts',
    'bridge': '@kusto/language-service/bridge.js',
    'Kusto.JavaScript.Client': '@kusto/language-service/Kusto.JavaScript.Client.js',
    'Kusto.Language.Bridge': '@kusto/language-service-next/Kusto.Language.Bridge.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../release/webpack'),
    libraryTarget: 'umd',
    library: 'monaco',
    globalObject: 'self'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
    },
    modules: [
      path.resolve('node_modules')
    ],
  },
  resolveLoader: {
    alias: {
      'blob-url-loader': require.resolve('./loaders/blobUrl'),
      'compile-loader': require.resolve('./loaders/compile'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        },
      },
      {
        // https://github.com/bridgedotnet/Bridge/issues/3097
        test: /bridge\.js$/,
        loader: 'regexp-replace-loader',
        options: {
          match: {
            pattern: "globals\\.System\\s=\\s\\{\\};"
          },
          replaceWith: "$& System = globals.System; "
        }
      },
      {
        test: /Kusto\.JavaScript\.Client\.js$/,
        loader: 'regexp-replace-loader',
        options: {
          match: {
            pattern: '"use strict";'
          },
          replaceWith: "$& System = globals.System; "
        }
      },
      {
        test: /Kusto\.Language\.Bridge\.js$/,
        loader: 'regexp-replace-loader',
        options: {
          match: {
            pattern: '"use strict";'
          },
          replaceWith: "$& System = globals.System; "
        }
      },
      {
        test: /newtonsoft\.json\.js$/,
        loader: 'regexp-replace-loader',
        options: {
          match: {
            pattern: '"use strict";'
          },
          replaceWith: "$& System = globals.System; "
        }
      },
    ]
  },
  optimization: {
    usedExports: true,
    removeAvailableModules: false,
  },
  plugins: [
    // new CleanWebpackPlugin('../release/webpack', { allowExternal: true }),
    new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs\/language\/typescript\/lib/),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
