/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/studio',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig;