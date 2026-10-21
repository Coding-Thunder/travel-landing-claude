import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Custom loader instead of the built-in optimizer. See image-loader.ts:
     * every source is a remote Unsplash URL that is already sized, so
     * re-encoding it with sharp on a one-shared-vCPU instance was duplicated
     * work with a cache that reset on every deploy.
     */
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
