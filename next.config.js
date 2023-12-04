/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            "glslify-loader"
          ],
          type: "asset/source"
        });
        return config;
    },
    experimental: {
      optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
};

module.exports = nextConfig;
