import styled from '@emotion/styled'
import React, { FC, ReactNode } from 'react'
import { Ripple } from 'rmwc'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { iconPropMap } from '../../services/view/icon'
import { AppChip, ChipsContainer } from '../atoms/Chip'
import { ExternalLink } from '../atoms/ExternalLink'
import { FIcon, FIconRounded } from '../atoms/FIcon'
import { ContainerCard } from '../blocks/Container'
import { LiquidColumn, Solid } from '../blocks/Flex'

const ImageOuterBlock = styled('div')({
    zIndex: 2,
    ...css.margin({ x: -20 }),
    width: css.calc('100% + 40px'),
    background: color.black(0.05),
})

const ImageBlock = styled('div')({
    position: 'relative',
    ...css.margin({ x: 'auto' }),
    width: '80%',
    maxWidth: 280,

    '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '56.25%',
    },
})

export type WorkCardProps = {
    pinned?: boolean
    category: 'web' | 'github' | 'music'
    title: () => ReactNode
    date: string
    tags: string[]
    imageFilename?: string
    url?: string
}

export const WorkCard: FC<WorkCardProps> = ({
    pinned,
    url,
    imageFilename,
    category,
    title,
    date,
    tags,
    children,
}) => {
    return (
        <Ripple>
            <ContainerCard>
                {url && (
                    <ExternalLink
                        aria-label={title}
                        href={url}
                        css={{ ...css.absoluteFit, zIndex: 1 }}
                    ></ExternalLink>
                )}

                {imageFilename && (
                    <ImageOuterBlock>
                        <ImageBlock>
                            <img
                                src={`/assets/images/${imageFilename}`}
                                css={{
                                    ...css.absoluteFit,
                                    objectFit: 'contain',
                                }}
                            ></img>
                        </ImageBlock>
                    </ImageOuterBlock>
                )}

                <Solid
                    ai="center"
                    css={{
                        position: 'relative',
                        ...css.margin({ top: 12, bottom: 8 }),
                    }}
                >
                    <FIconRounded
                        {...{ size: 24, ...iconPropMap[category] }}
                        css={{
                            transform: css.translate({ x: -1 }),
                        }}
                    ></FIconRounded>

                    <LiquidColumn css={{ ...css.margin({ left: 12 }) }}>
                        <h2
                            css={{
                                ...css.margin({ y: 2 }),

                                lineHeight: 1.4,
                                fontSize: 16,
                                transform: 'translateY(-0.5px)',
                            }}
                        >
                            {title()}
                        </h2>

                        <span css={{ fontSize: 12, color: color.black(0.5) }}>
                            {date}
                        </span>
                    </LiquidColumn>

                    {pinned && (
                        <FIcon
                            icon="star"
                            size={16}
                            color={color.black(0.5)}
                            css={{
                                alignSelf: 'start',
                                ...css.margin({ left: 12, top: 5 }),
                            }}
                            // css={{ position: 'absolute', top: 10, right: 10 }}
                        ></FIcon>
                    )}
                </Solid>

                {!!tags.length && (
                    <div
                        css={{
                            ...css.margin({ y: 8 }),
                            ...css.padding({ left: 34 }),
                        }}
                    >
                        <ChipsContainer>
                            {tags.map((t, i) => (
                                <AppChip key={i}>{t}</AppChip>
                            ))}
                        </ChipsContainer>
                    </div>
                )}

                <div
                    css={{
                        ...css.padding({ left: 36 }),
                    }}
                >
                    {children}
                </div>
            </ContainerCard>
        </Ripple>
    )
}
