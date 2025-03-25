/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const prod = process.env.NODE_ENV === "production";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: prod ? false : true,
});

const nextConfig = pwaConfig({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    // serverActions: true,
    turbo: {
      rules:{
        '*.svg': {
            loaders: ["@svgr/webpack"],
            as: "*.tsx",
          },
        },
      
    },
  },
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

export default nextConfig;