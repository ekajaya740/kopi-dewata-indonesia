/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false, path: false };

  //   return config;
  // },

  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['api.dicebear.com'],
  },
};

module.exports = nextConfig;
