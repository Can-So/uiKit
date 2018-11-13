// @flow
/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const emptyExportPath = `${path.resolve(__dirname)}/empty.ts`;

const mode = process.env.NODE_ENV || 'development';

const envPlugins = [];

if (mode === 'production') {
  envPlugins.push(
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
        },
        output: {
          beautify: false,
        },
      },
    }),
  );
}

module.exports = {
  mode,
  entry: {
    editor: './src/editor/index.tsx',
    renderer: './src/renderer/index.tsx',
  },
  stats: {
    warnings: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/bundle'),
  },
  resolve: {
    mainFields: ['atlaskit:src', 'browser', 'main'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@atlaskit/media-picker': emptyExportPath,
      '@atlaskit/tooltip': emptyExportPath,
      '@atlaskit/modal-dialog': emptyExportPath,
      '@atlaskit/logo': emptyExportPath,
      '@atlaskit/avatar': emptyExportPath,
      '@atlaskit/avatar-group': emptyExportPath,
      '@atlaskit/profilecard': emptyExportPath,
      '@atlaskit/select': emptyExportPath,
      'react-select': emptyExportPath,
      'components/picker/EmojiPicker': emptyExportPath,
      'react-virtualized/dist/commonjs/List': emptyExportPath,
      'react-virtualized': emptyExportPath,
      '@atlaskit/emoji': emptyExportPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          babelrc: true,
          rootMode: 'upward',
          envName: 'production:cjs',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        mode === 'production' ? 'production' : 'development',
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/editor.html.ejs'),
      excludeChunks: ['renderer'],
      filename: 'editor.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/renderer.html.ejs'),
      excludeChunks: ['editor'],
      filename: 'renderer.html',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ].concat(envPlugins),
};
