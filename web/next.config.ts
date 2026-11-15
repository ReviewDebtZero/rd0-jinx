import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is plain files, deployable to Vercel, Netlify or
  // GitHub Pages with no server. Output lands in web/out, which is what
  // vercel.json and netlify.toml publish.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
