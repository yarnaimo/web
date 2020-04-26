const { resolve } = require('path')

const withPWA = require('next-pwa')
const withFonts = require('next-fonts')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    distDir: '.next',
    pwa: {
        disable: process.env.NODE_ENV !== 'production',
        dest: 'public',
    },
    experimental: {
        sassOptions: {
            includePaths: [resolve(__dirname, '../node_modules')],
        },
    },
}

module.exports = withBundleAnalyzer(withFonts(withPWA(nextConfig)))
