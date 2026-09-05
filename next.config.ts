import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Custom loader instead of the built-in optimizer. See image-loader.ts:
     * every source is a remote Unsplash URL that is already sized, so
     * re-encoding it with sharp was duplicated work against a cache that reset
     * on every deploy.
     */
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },

  async redirects() {
    return [
      /**
       * The EV guide links to a vehicle class that has never existed
       * (content/posts.ts:674). Until an electric class page is added, send the
       * link to the class index rather than leaving a 404 in the body of an
       * indexed article. See docs/SEO-RECOMMENDATIONS.md.
       */
      { source: "/vehicles/electric", destination: "/vehicles", permanent: false },
    ];
  },
};

export default nextConfig;
