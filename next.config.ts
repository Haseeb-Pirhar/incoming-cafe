import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false, // avoid generating large maps
  turbopack: {},

  // Use standalone output to reduce build size (excludes unnecessary files)
  // This creates a minimal .next/standalone folder with only required files
  // next start will automatically use it if available
  output: "standalone",

  // Reduce memory usage during build
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    proxyClientMaxBodySize: "50mb",
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-icons",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/themes",
      "react-icons",
      "lucide-react",
    ],
  },
  // Optimize webpack for lower memory usage and smaller bundles
  webpack: (config, { isServer, dev }) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        // Enable tree shaking
        usedExports: true,
        // Split chunks more efficiently
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks
            framework: {
              name: "framework",
              chunks: "all",
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module: any) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module: any) {
                const hash = require("crypto")
                  .createHash("sha1")
                  .update(module.identifier())
                  .digest("hex")
                  .substring(0, 8);
                return `lib-${hash}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module: any, chunks: any) {
                return require("crypto")
                  .createHash("sha1")
                  .update(
                    chunks.reduce(
                      (acc: string, chunk: any) => acc + chunk.name,
                      "",
                    ),
                  )
                  .digest("hex")
                  .substring(0, 8);
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loopedin-app.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "bakra-bazaar.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pirhar-sahib-hk.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" }, // not www.pexels.com
    ],
  },
};

export default nextConfig;
