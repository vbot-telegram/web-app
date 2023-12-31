/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://devtrek.io/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
