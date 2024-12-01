/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/original/**', // Match all images under the "original" path
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
