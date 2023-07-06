console.log('env', process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STAGE: process.env.STAGE,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
