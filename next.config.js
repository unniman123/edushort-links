/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Handle the .well-known directory correctly for Android App Links
  async headers() {
    return [
      {
        // This header is crucial for the assetlinks.json file to be served correctly
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            // Ensure the file is not cached to allow for updates
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },
  
  // Redirect root requests to index page
  async redirects() {
    return [
      // Redirect any requests to /article (without ID) to the homepage
      {
        source: '/article',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Configure image optimization with your Supabase domains
  images: {
    domains: ['zsnofjypqabqzbfmhvnx.supabase.co', 'zsnofjypqabqzbfmhvnx.supabase.in'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Configure build output
  output: 'standalone',
  
  // Enable trailing slash for consistency
  trailingSlash: false,
};

module.exports = nextConfig;