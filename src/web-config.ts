import { webEnv } from './services/core/web-env'

const isDev = process.env.NODE_ENV !== 'production'
const isBrowser = (process as any).browser as boolean
const port = parseInt(process.env.PORT || '3000', 10)

export const webConfig = {
    isDev,
    isBrowser,
    port,
    origin: isDev ? `https://localhost:${port}` : webEnv.hostingOrigin,
    appName: 'yarnaimo',
    longAppName: 'yarnaimo - ポートフォリオ',
    description: 'yarnaimo - ポートフォリオ',
    screenName: 'yarnaimo',
    twitterCardSize: [310, 162] as const,

    email: 'yarnaimo@gmail.com',
    twitterUrl: 'https://twitter.com/yarnaimo',
}
