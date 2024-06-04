/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
//   disable: prod ? false : true,
// });

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
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

export default nextConfig;
