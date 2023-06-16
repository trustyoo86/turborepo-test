// const ModuleFederationPlugin =
//   require('webpack').container.ModuleFederationPlugin;
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'AdminApp',
          filename: 'AdminApp.js',
          remotes: {
            about: 'about@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            swr: { singleton: true, requiredVersion: deps.swr, eager: true },
          },
        }),
      );
    }

    return config;
  },
};

module.exports = nextConfig;
