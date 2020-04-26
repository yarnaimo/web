import styled from '@emotion/styled'
import { css } from '../../services/view/css'

export const Block = styled.div({
    ...css.margin({ y: 6 }),
    // '& + &': {
    //     ...css.margin({ top: 12 }),
    // },
})
