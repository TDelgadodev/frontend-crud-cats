/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET: process.env.AUTH_SECRET,
  },
};

module.exports = nextConfig;
