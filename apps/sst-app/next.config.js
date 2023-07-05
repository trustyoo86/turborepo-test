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
          filename: 'remoteApp.js',
          exposes: {
            AboutDetail: './pages/about/[aboutId]/index.tsx',
          },
          remotes: {
            about:
              'about@https://d2ztl5ibm2uj8u.cloudfront.net/about/remoteEntry.js',
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
