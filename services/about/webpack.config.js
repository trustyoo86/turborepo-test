const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: path.join(__dirname, 'containers', 'index.tsx'),
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    devMiddleware: {
      publicPath: '/',
    },
    static: {
      directory: './',
    },
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'about',
      filename: 'remoteEntry.js',
      exposes: {
        './AboutDetail': './containers/AboutDetail.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        swr: {
          singleton: true,
          eager: true,
          requiredVersion: deps.swr,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};
