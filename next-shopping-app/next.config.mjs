// next.config.mjs

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['sosiiick.com'], // Replace 'yourdomain.com' with your domain
    },
    env: {
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_NAME: process.env.DATABASE_NAME,
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
  