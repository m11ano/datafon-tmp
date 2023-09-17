/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },

    experimental: {
        urlImports: ['https://fonts.gstatic.com'],
    },
};

const withTM = require('next-transpile-modules')(['react-redux']);
const withLess = require('next-with-less');

module.exports = withTM(withLess(nextConfig));

//module.exports = nextConfig;
