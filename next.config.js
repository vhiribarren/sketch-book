/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(frag|vert|glsl)$/,
          type: 'asset/source'
        })
        return config
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
}

module.exports = nextConfig
