/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? `${process.env.NEXT_PUBLIC_DEV_API_URL}/:path*`
            : `${process.env.NEXT_PUBLIC_PRODUCTION_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
