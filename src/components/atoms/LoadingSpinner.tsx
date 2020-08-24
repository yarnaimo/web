import React, { FC } from 'react'
import { CircularProgress } from 'rmwc/next'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { SolidColumn } from '../blocks/Flex'

type Props = {}

export const LoadingSpinner: FC<Props> = (props) => {
    return (
        <SolidColumn ai="center" css={{ margin: '24px' }}>
            <CircularProgress
                size="large"
                css={{ ...css.size(36, 36), color: color.orange() }}
            ></CircularProgress>
        </SolidColumn>
    )
}
