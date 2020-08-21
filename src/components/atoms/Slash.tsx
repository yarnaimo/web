import React, { FC, memo } from 'react'
import {} from 'rmwc/dist'
import { css } from '../../services/view/css'

type Props = {}

export const Slash: FC<Props> = memo(({}) => {
    return (
        <span
            css={{
                ...css.margin({ x: 6 }),
            }}
        >
            /
        </span>
    )
})
