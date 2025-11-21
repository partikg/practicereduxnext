/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  experimental: {
    turbo: {
      resolveExtensions: [".js", ".jsx", ".mjs"],
    }
  },

  // Disable source maps completely
  webpack(config) {
    config.devtool = false;
    return config;
  },

  turbopack: {},
};

export default nextConfig;
