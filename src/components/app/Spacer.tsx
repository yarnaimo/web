import styled from '@emotion/styled'
import { css } from '../../services/view/css'
import { navSpacerHeight } from '../../services/view/size'

export const Spacer = styled.div<{ visibleOn: 'mobile' | 'desktop' }>(
    {
        height: navSpacerHeight,
    },
    ({ visibleOn }) => ({
        display: visibleOn === 'mobile' ? 'none' : 'block',
        [css.responsive.isMobile]: {
            display: visibleOn === 'mobile' ? 'block' : 'none',
        },
    }),
)
