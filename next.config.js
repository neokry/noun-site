/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IPFS_GATEWAY.replace("https://", "")],
    remotePatterns: [
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
