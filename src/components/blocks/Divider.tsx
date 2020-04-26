import styled from '@emotion/styled'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { Solid } from './Flex'

export const Divider = styled(Solid)({
    width: '100%',
    ...css.margin({ y: 16 }),
    justifyContent: 'center',

    '&:before': {
        content: '""',
        ...css.size(12, 4),
        borderRadius: 2,
        background: color.black(0.1),
    },
})
