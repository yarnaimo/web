import styled from '@emotion/styled'
import React, { FC, ReactNode } from 'react'
import { Ripple } from 'rmwc/dist'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { iconPropMap } from '../../services/view/icon'
import { AppChip, ChipsContainer } from '../atoms/Chip'
import { ExternalLink } from '../atoms/ExternalLink'
import { FIconRounded } from '../atoms/FIcon'
import { ContainerCard } from '../blocks/Container'
import { Solid } from '../blocks/Flex'

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
    category: 'web' | 'github' | 'qiita' | 'music'
    title: () => ReactNode
    meta: () => ReactNode
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
    meta,
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
                        css={{ ...css.absoluteFit, zIndex: 0 }}
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
                    css={{
                        position: 'relative',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                >
                    <FIconRounded
                        {...{ size: 24, ...iconPropMap[category] }}
                        css={{
                            ...css.margin({ top: 18 }),
                            transform: css.translate({ x: -1 }),
                        }}
                    ></FIconRounded>

                    <div
                        css={{
                            ...css.margin({
                                left: 12,
                                y: 8,
                            }),
                        }}
                    >
                        <h2
                            css={{
                                ...css.margin({ y: 8 }),

                                lineHeight: 1.4,
                                fontSize: 16,
                                transform: 'translateY(-0.5px)',
                            }}
                        >
                            {title()}
                        </h2>

                        <div
                            css={{
                                ...css.margin({ y: 8 }),
                                fontSize: 12,
                                color: color.black(0.5),
                            }}
                        >
                            {meta()}
                        </div>

                        {!!tags.length && (
                            <div
                                css={{
                                    ...css.margin({
                                        y: 10,
                                        left: -2,
                                    }),
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
                                pointerEvents: 'auto',
                                ...css.margin({
                                    y: 8,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>

                    {/* {pinned && (
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
                    )} */}
                </Solid>

                {/* <div
                    css={{
                        position: 'relative',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                ></div> */}
            </ContainerCard>
        </Ripple>
    )
}
