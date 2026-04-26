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
    async rewrites() {
        return [
            {
                source: '/',
                has: [
                    {
                        type: 'host',
                        value: 'estatelift.logiqdev.com',
                    },
                ],
                destination: '/estatelift',
            },
        ];
    },
}

module.exports = nextConfig;