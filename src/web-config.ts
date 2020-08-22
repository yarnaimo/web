const isDev = process.env.NODE_ENV !== 'production'
const isBrowser = process.browser
const port = parseInt(process.env.PORT || '3000', 10)

export const webConfig = {
    isDev,
    isBrowser,
    port,
    origin: isDev ? `https://localhost:${port}` : process.env.hostingOrigin!,
    appName: 'yarnaimo',
    longAppName: 'yarnaimo - ポートフォリオ',
    description: 'yarnaimo - ポートフォリオ',
    screenName: 'yarnaimo',
    twitterCardSize: [310, 162] as const,

    email: 'yarnaimo@gmail.com',
    twitterUrl: 'https://twitter.com/yarnaimo',
}
