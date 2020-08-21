import styled, { CSSObject } from '@emotion/styled'
import { ComponentProps } from '@rmwc/types'
import React, { forwardRef } from 'react'
import {} from 'rmwc/dist'
import { filterForward } from '../../services/view/emotion'

type Props = {
    jc?: CSSObject['justifyContent']
    ai?: CSSObject['alignItems']
}

export const createFlexComponent = (
    styleAsFlexItem: CSSObject,
    flexDirection: CSSObject['flexDirection'],
) => {
    const Component = forwardRef<any, ComponentProps<{}, {}, any> & Props>(
        (
            {
                tag: Tag = 'div',
                css,
                jc: justifyContent,
                ai: alignItems,
                children,
                ...props
            },
            ref,
        ) => {
            return (
                <Tag
                    css={[
                        {
                            display: 'flex',
                            flexDirection,
                            justifyContent,
                            alignItems,
                        },
                        styleAsFlexItem,
                        css,
                    ]}
                    {...props}
                    ref={ref}
                >
                    {children}
                </Tag>
            )
        },
    )

    return Object.assign(Component, {}) as typeof Component & {}
}

const propsFn = ({ jc: justifyContent, ai: alignItems }: Props) => ({
    justifyContent,
    alignItems,
})
// export const Solid = createFlexComponent(
//     {
//         flexGrow: 0,
//         flexShrink: 0,
//     },
//     'row',
// )
export const Solid = styled('div', filterForward)<Props>(
    {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
    },
    propsFn,
)
export const SolidColumn = styled('div', filterForward)<Props>(
    {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
    },
    propsFn,
)

export const Liquid = styled('div', filterForward)<Props>(
    {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
    },
    propsFn,
)
export const LiquidColumn = styled('div', filterForward)<Props>(
    {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
    },
    propsFn,
)
