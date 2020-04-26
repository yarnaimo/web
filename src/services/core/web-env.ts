import { webEnvDefault } from '../../.config/web-env-default'

export type WebEnv = {
    isDevProject: boolean
    hostingOrigin: string
}

export const webEnv: WebEnv = webEnvDefault
