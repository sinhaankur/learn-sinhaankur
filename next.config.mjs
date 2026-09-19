/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → deployable to Cloudflare Pages (like the other subdomains).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
