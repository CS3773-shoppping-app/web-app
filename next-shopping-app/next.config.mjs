import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['sosiiick.com'], 
    },
    async rewrites() {
      return [
        {
          source: '/uploads/:path*',
          destination: '/public/uploads/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;
  