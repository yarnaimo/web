import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import React, { PropsWithChildren } from 'react'

const { default: extraScopePlugin } = require('stylis-plugin-extra-scope') // eslint-disable-line

const cache = createCache({
    stylisPlugins: [extraScopePlugin('#extra-scope')],
})

export const ExtraScopeProvider = ({
    children,
    ...props
}: PropsWithChildren<{}>) => (
    <CacheProvider value={cache} {...props}>
        <div id="extra-scope">{children}</div>
    </CacheProvider>
)
