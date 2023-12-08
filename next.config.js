/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["oktagonmma.com", "assets.oktagonmma.com"],
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
