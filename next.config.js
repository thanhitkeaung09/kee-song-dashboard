/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    secret_key: "keesongviabellssecretkey",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kswms-dev.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // swcMinify: false //used for next version 14.0.3
};

module.exports = nextConfig;
