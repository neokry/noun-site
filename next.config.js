/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1dues304i0c30.cloudfront.net",
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
