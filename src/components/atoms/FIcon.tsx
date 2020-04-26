import styled from '@emotion/styled'
import { icons } from 'feather-icons'
import React, { FC, memo, useMemo } from 'react'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { Solid, SolidColumn } from '../blocks/Flex'
import { ExternalLink } from './ExternalLink'

type Options = {
    tag?: 'button' | 'div'
    color?: string
    small?: boolean
    size?: string | number
    stroke?: number
    onClick?: (e: React.MouseEvent<any>) => void
}

type FIconProps = Options & { icon: string }

export const FIcon: FC<FIconProps> = memo(
    ({
        tag: Tag = 'div',
        icon,
        color,
        small,
        size,
        stroke = 2.5,
        onClick,
        ...props
    }) => {
        const _size = small ? 18 : size || 24
        const __html = useMemo(
            () =>
                icons[icon]?.toSvg({
                    color,
                    'stroke-width': stroke,
                    width: '100%',
                    height: '100%',
                } as any),
            [icon],
        )
        return (
            <Tag
                onClick={(e: React.MouseEvent<any>) => {
                    e.preventDefault()
                    onClick?.(e)
                }}
                {...props}
                css={[
                    (props as any).css,
                    { display: 'flex', width: _size, height: _size },
                ]}
                dangerouslySetInnerHTML={{
                    __html,
                }}
            ></Tag>
        )
    },
)

const FIconCBlock = styled(Solid)<{
    size: number
    background?: string
    foreground?: string
}>(
    {
        borderRadius: '50%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    ({
        size: _size,
        background = color.black(0.125),
        foreground = color.white(),
    }) => ({
        ...css.size(_size, _size),
        background,
        color: foreground,
    }),
)

type FIconCProps = {
    icon: string
    size: number
    background?: string
    foreground?: string
}

export const FIconC: FC<FIconCProps> = ({
    icon,
    size,
    background,
    foreground,
    ...props
}) => {
    const innerSize = size * 0.6

    return (
        <FIconCBlock
            {...{
                size,
                background,
                foreground,
            }}
            {...props}
        >
            <FIcon {...{ icon, size: innerSize - (innerSize % 2) }}></FIcon>
        </FIconCBlock>
    )
}

type FIconBadgeProps = {
    href?: string
    icon: string
    background?: string
    foreground?: string
}

export const FIconBadge: FC<FIconBadgeProps> = ({
    href,
    icon,
    background,
    foreground,
    children,
    ...props
}) => {
    return (
        <SolidColumn
            ai="center"
            css={{
                position: 'relative',
                width: 48,
                ...css.margin({ x: 12 }),
            }}
        >
            {href && (
                <ExternalLink
                    href={href}
                    css={{ ...css.absoluteFit }}
                ></ExternalLink>
            )}

            <FIconC
                {...{
                    icon,
                    size: 32,
                    background,
                    foreground,
                }}
                {...props}
            ></FIconC>

            <div
                css={{
                    ...css.margin({ top: 8 }),
                    fontSize: 11,
                    color: color.black(0.5),
                }}
            >
                {children}
            </div>
        </SolidColumn>
    )
}
