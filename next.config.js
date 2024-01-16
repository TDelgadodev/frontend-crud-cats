/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET: process.env.AUTH_SECRET,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
