/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_NOCODB_URL: 'https://nocodb-production-c4d4.up.railway.app',
    NEXT_PUBLIC_NOCODB_TOKEN: 'Q9zVXQy1N-bBmTjIrKidydVnlL_OgZHsbrNNSUFTK',
  },
};

module.exports = nextConfig
