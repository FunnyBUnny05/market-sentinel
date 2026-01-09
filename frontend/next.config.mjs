/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/market-sentinel",
    assetPrefix: "/market-sentinel/",
    images: {
        unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
    },
    trailingSlash: true, // Helps with GitHub Pages routing
};

export default nextConfig;
