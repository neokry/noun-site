/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.zora.co",
        port: "",
        pathname: "/renderer/**",
      },
    ],
  },
};

module.exports = nextConfig;
