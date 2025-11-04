/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nocodb-production-c4d4.up.railway.app'],
  },
  env: {
    NEXT_PUBLIC_NOCODB_URL: 'https://nocodb-production-c4d4.up.railway.app',
    NEXT_PUBLIC_NOCODB_TOKEN: 'Q9zyXQy1N-bBmTjIrKidydVnN_OgZHsbrNNSUfTK',
  },
}

module.exports = nextConfig
