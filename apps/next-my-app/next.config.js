const withTM = require('next-transpile-modules')(['@ant-design/plots']);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
  },
});
