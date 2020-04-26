import React, { FC, memo } from 'react'
import { Ripple } from 'rmwc'
import { color } from '../../services/view/color'
import { durationShort, transition } from '../../services/view/css'
import { Solid } from '../blocks/Flex'
import { FIcon } from './FIcon'

const iconButtonTransition = transition('std', ['color'], [durationShort], [0])

export const FIconButton: FC<{
    icon: string
    noColor?: boolean
    size?: number
    onClick?: () => void
}> = memo(({ icon, noColor, size = 44, onClick, ...props }) => {
    return (
        <Ripple primary={!noColor}>
            <Solid
                role="button"
                tabIndex={0}
                jc="center"
                ai="center"
                css={[
                    {
                        ...iconButtonTransition,
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                        overflow: 'hidden',
                        cursor: 'pointer',

                        '&:hover, &.mdc-ripple-upgraded--background-focused': {
                            color: noColor ? undefined : color.pink(1),
                        },
                    },
                ]}
                onClick={onClick}
                {...props}
            >
                <FIcon icon={icon} size={Math.max(13, size * 0.45)}></FIcon>
            </Solid>
        </Ripple>
    )
})
