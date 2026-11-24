import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    // The old site had a separate projects page; work now lives on the home page.
    return [{ source: "/projects", destination: "/#work", permanent: true }];
  },
};

export default nextConfig;
