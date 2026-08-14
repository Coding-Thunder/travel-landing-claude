import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nodemailer relies on Node.js built-ins and dynamic requires — bundling breaks it.
  serverExternalPackages: ["nodemailer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
