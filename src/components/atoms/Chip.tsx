import styled from '@emotion/styled'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'

export const AppChip = styled('li')({
    pointerEvents: 'auto',

    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,

    display: 'inline-flex',
    alignItems: 'center',
    height: 20,
    ...css.margin({ x: 4, y: 3 }),
    ...css.padding({ x: 8 }),
    borderRadius: 10,
    fontSize: 12,

    background: color.black(0.05),
})

export const ChipsContainer = styled('ul')({
    listStyle: 'none',
    ...css.margin({ x: -4, y: -3 }),
    ...css.padding({ x: 0 }),
})
