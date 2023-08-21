const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://gateway.pinata.cloud";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [IPFS_GATEWAY.replace("https://", "")],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.zora.co",
        port: "",
        pathname: "/renderer/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/token/:tokenid",
        destination: "/?tokenid=:tokenid",
      },
    ];
  },
};

module.exports = nextConfig;
