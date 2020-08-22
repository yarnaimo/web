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
                    {
                        display: 'flex',
                        width: _size,
                        height: _size,
                        pointerEvents: 'none',
                    },
                ]}
                dangerouslySetInnerHTML={{
                    __html,
                }}
            ></Tag>
        )
    },
)

//

const FIconRoundedBlock = styled(Solid)<{
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
        background, // = color.black(0.125),
        foreground, // = color.white(),
    }) => ({
        ...css.size(_size, _size),
        background,
        color: foreground,
    }),
)

type FIconRoundedProps = {
    icon: string
    size: number
    background?: string
    foreground?: string
}

export const FIconRounded: FC<FIconRoundedProps> = ({
    icon,
    size,
    background,
    foreground,
    ...props
}) => {
    const innerSize = size * 0.6

    return (
        <FIconRoundedBlock
            {...{
                size,
                background,
                foreground,
            }}
            {...props}
        >
            <FIcon {...{ icon, size: innerSize - (innerSize % 2) }}></FIcon>
        </FIconRoundedBlock>
    )
}

//

const FIconWithTextBlock = styled('div')<{ large?: boolean }>(
    {
        position: 'relative',
        ...css.padding({ left: 40 }),
    },
    ({ large }) => ({ ...css.margin({ y: large ? 6 : 4 }) }),
)

type FIconWithTextProps = {
    icon: string
    large?: boolean
    background?: string
    foreground?: string
}

export const FIconWithText: FC<FIconWithTextProps> = ({
    icon,
    large,
    background,
    foreground,
    children,
    ...props
}) => {
    return (
        <FIconWithTextBlock large={large} {...props}>
            <FIconRounded
                {...{
                    icon,
                    size: large ? 24 : 20,
                    background,
                    foreground,
                }}
                css={{
                    position: 'absolute',
                    top: '50%',
                    left: 14,
                    transform: 'translate(-50%, -50%)',
                }}
            ></FIconRounded>

            <span>{children}</span>
        </FIconWithTextBlock>
    )
}

//

type FIconBadgeProps = {
    href?: string
    label: string
    icon: string
    background?: string
    foreground?: string
}

export const FIconBadge: FC<FIconBadgeProps> = ({
    href,
    label,
    icon,
    background,
    foreground,
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
                    aria-label={label}
                    href={href}
                    css={{ ...css.absoluteFit }}
                ></ExternalLink>
            )}

            <FIconRounded
                {...{
                    icon,
                    size: 32,
                    background,
                    foreground,
                }}
                {...props}
            ></FIconRounded>

            <div
                css={{
                    ...css.margin({ top: 8 }),
                    fontSize: 11,
                    color: color.black(0.5),
                }}
            >
                {label}
            </div>
        </SolidColumn>
    )
}
