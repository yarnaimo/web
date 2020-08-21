const { resolve } = require('path')

const withFonts = require('next-fonts')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    distDir: '.next',
    sassOptions: {
        includePaths: [resolve(__dirname, 'node_modules')],
    },
}

module.exports = withBundleAnalyzer(withFonts(nextConfig))
