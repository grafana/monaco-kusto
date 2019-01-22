const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  node: {
    fs: 'empty'
  },
  // mode: 'production',
  // devtool: "cheap-module-source-map",
  mode: 'development',
  entry: {
    'monaco.contribution': './src/monaco.contribution.ts',
    // 'kusto.worker': './src/kusto.worker.ts',
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
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     bridge: {
    //       test: /node_modules\/@kusto\/language-service\/bridge/,
    //       name: 'bridge',
    //       chunks: 'all',
    //     },
    //     KustoJavaScriptClient: {
    //       test: /node_modules\/@kusto\/language-service\/Kusto\.JavaScript\.Client/,
    //       name: 'Kusto.JavaScript.Client',
    //       chunks: 'all',
    //     },
    //     KustoLanguageBridge: {
    //       test: /node_modules\/@kusto\/language-service-next\/Kusto\.Language\.Bridge/,
    //       name: 'Kusto.Language.Bridge',
    //       chunks: 'all',
    //     },
    //   }
    // }
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 8889 }),
    new CleanWebpackPlugin('../release/webpack', { allowExternal: true }),
    new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs\/language\/typescript\/lib/),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // new UglifyJSPlugin()
  ],
};
