import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is plain files, deployable to Vercel, Netlify or
  // GitHub Pages with no server.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // This app is the root of its own dependency tree. Without this, Next walks
  // up and picks a lockfile from an unrelated parent directory.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
