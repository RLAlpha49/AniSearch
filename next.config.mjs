/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.myanimelist.net',
                protocol: 'https',
            },
        ],
    },
};

export default nextConfig;
