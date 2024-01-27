/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    loader: "default",
    domains: ["localhost", "ihabits.vercel.com"],
  },
};

module.exports = nextConfig;
