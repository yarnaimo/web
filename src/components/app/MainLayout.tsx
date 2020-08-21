import styled from '@emotion/styled'
import React, { FC, memo } from 'react'
import { css } from '../../services/view/css'
import { navAreaY } from './NavBar'

export const perspective = 8

const MainLayoutBlock = styled('main')<{
    lightBrown?: boolean
}>(
    {
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',

        ...css.padding({ top: navAreaY, bottom: 0 }),

        [css.responsive.isMobile]: {
            ...css.padding({ top: 0, bottom: navAreaY }),
        },

        perspective,
        perspectiveOrigin: '50% 50%',
    },
    ({ lightBrown }) => ({
        background:
            'linear-gradient(315deg, hsl(175 100% 90% / 0.1), hsl(39deg 100% 90% / 10%))',
    }),
)

type Props = {
    lightBrown?: boolean
}

export const MainLayout: FC<Props> = memo(({ lightBrown, children }) => {
    return <MainLayoutBlock lightBrown={lightBrown}>{children}</MainLayoutBlock>
})
