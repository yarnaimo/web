import styled from '@emotion/styled'
import { color, shadows } from '../../services/view/color'
import { css } from '../../services/view/css'

// const _Container = styled.div({
//     margin: '0px auto',
//     // width: 'calc(100% - 24px)',
//     maxWidth: 640,
//     padding:'8px 12px',
//     '@media (min-width: 768px)': {
//         // width: '70%',
//     },
// })

export const Container = styled.div({
    width: '70%',
    maxWidth: 520,
    margin: '0px auto',
    ...css.padding({ top: 0, bottom: 2 }),
    overflow: 'hidden',

    [css.responsive.isMobile]: {
        width: 'calc(100% - 32px)', // padding: '8px 12px',
        // width: 'calc(100% - 40px)', // padding: '8px 12px',
    },
})

export const ContainerCard = styled(Container)({
    zIndex: 1,
    position: 'relative',
    ...css.margin({ y: 24 }),
    ...css.padding({ x: 20 }),
    borderRadius: 16,

    boxShadow: shadows.containerCard(color.black(0.08)),
    background: color.white(),
})

export const AdminContainer = styled(Container)({
    width: 'calc(100% - 24px)',
    maxWidth: 'unset',
})

export const MainContainer = Container.withComponent('main')
