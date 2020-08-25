import styled from '@emotion/styled'
import React, { FC, memo } from 'react'
import { color, glow } from '../../services/view/color'
import { css } from '../../services/view/css'
import { Solid } from '../blocks/Flex'
import { FIconRounded } from './FIcon'

// const gradient = gradientFn(180, '55%')(color.pinkv(0.4), color.pinkv(0.85))

// export const Heading2 = styled('h2')({
//     display: 'inline-block',
//     ...css.margin({ y: 16, left: -8 }),
//     ...css.padding({ left: 10, right: 24, top: 4, bottom: 2 }),
//     borderRadius: '12px 0 0 0',
//     position: 'relative',

//     fontSize: 20,
//     background: gradient,
//     color: color.white(),
// })

const TextBlock = styled('h2')({
    ...css.marginBlock(0),
    marginLeft: 7.5,

    fontSize: 20,
    transform: 'translateY(-0.5px)',
})

type Props = {
    icon: string
}

export const Heading2Icon: FC<Props> = memo(({ icon, children }) => {
    return (
        <Solid ai="center" css={{ ...css.marginBlock(12) }}>
            <FIconRounded
                {...{
                    icon,
                    size: 32,
                    // background: color.orange(0.25),
                    foreground: color.orange(),
                }}
                css={{
                    transform: css.translate({ x: -2 }),
                    boxShadow: glow(color.orange(0.15)),
                }}
            ></FIconRounded>

            <TextBlock>{children}</TextBlock>
        </Solid>
    )
})
