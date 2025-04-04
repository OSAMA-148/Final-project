/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["planetdesease.runasp.net"],
    },
    experimental: {
        middlewarePrefetch: "strict",
    },
};

export default nextConfig;
