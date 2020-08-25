import styled from '@emotion/styled'
import Link from 'next/link'
import React, { memo, ReactNode } from 'react'
import { Ripple } from 'rmwc/next'
import { color } from '../../services/view/color'
import { css } from '../../services/view/css'
import { iconPropMap } from '../../services/view/icon'
import { useInView } from '../../services/view/intersection-observer'
import { A, ABlank } from '../atoms/A'
import { AppChip, ChipsContainer } from '../atoms/Chip'
import { FIconRounded } from '../atoms/FIcon'
import { Card } from '../blocks/Container'
import { Solid } from '../blocks/Flex'

const ImageOuterBlock = styled('div')({
    zIndex: 2,
    ...css.marginInline(-20),
    width: css.calc('100% + 40px'),
    background: color.black(0.05),
})

const ImageBlock = styled('div')({
    position: 'relative',
    ...css.marginInline('auto'),
    width: '80%',
    maxWidth: 280,

    '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '56.25%',
    },
})

export type WorkCardProps = {
    initialVisibility?: boolean
    pinned?: boolean
    category: 'web' | 'github' | 'qiita' | 'music' | 'twitter' | 'article'
    title: string
    meta: () => ReactNode
    tags: string[]
    imageFilename?: string
    url?: string
    body: () => ReactNode
}

const WorkCardBody = ({
    pinned,
    url,
    imageFilename,
    category,
    title,
    meta,
    tags,
    body,
    ...props
}: WorkCardProps) => {
    return (
        <Solid
            css={{
                position: 'relative',
                // pointerEvents: 'none',
                zIndex: 1,
                userSelect: 'text',
            }}
            {...props}
        >
            <FIconRounded
                {...{
                    size: 24,
                    ...iconPropMap[category],
                }}
                css={{
                    marginTop: 16,
                    transform: css.translate({ x: -1 }),
                }}
            ></FIconRounded>

            <div
                css={{
                    ...css.marginBlock(8),
                    marginLeft: 12,
                }}
            >
                <h2
                    css={{
                        ...css.marginBlock(8),

                        lineHeight: 1.4,
                        fontSize: 16,
                        transform: 'translateY(-0.5px)',
                    }}
                >
                    {title}
                </h2>

                <div
                    css={{
                        ...css.marginBlock(8),
                        fontSize: 12,
                        color: color.black(0.5),
                    }}
                >
                    {meta()}
                </div>

                {!!tags.length && (
                    <div
                        css={{
                            ...css.marginBlock(10),
                            marginLeft: -2,
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
                        ...css.marginBlock(8),
                    }}
                >
                    {body()}
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
    )
}

const WorkCardImage = (props: WorkCardProps) => {
    return props.imageFilename ? (
        <ImageOuterBlock>
            <ImageBlock>
                <img
                    src={`/assets/images/${props.imageFilename}`}
                    css={{
                        ...css.absoluteFit,
                        objectFit: 'contain',
                    }}
                ></img>
            </ImageBlock>
        </ImageOuterBlock>
    ) : null
}

export const WorkCard = memo((props: WorkCardProps) => {
    const [ref, inView, entry] = useInView({
        rootMargin: '400px 0px',
        triggerOnce: true,
    })
    const visible = props.initialVisibility || inView

    const Content_ = (
        <>
            <WorkCardImage {...props}></WorkCardImage>

            <WorkCardBody
                {...props}
                {...({
                    style: visible ? undefined : { display: 'none' },
                } as any)}
            ></WorkCardBody>
        </>
    )

    return (
        <Ripple>
            <Card ref={ref} style={visible ? undefined : { height: '100px' }}>
                {props.category === 'article' ? (
                    <Link href="/activity/[id]" as={props.url} passHref>
                        <A
                            aria-label={props.title}
                            inheritColor
                            noUnderline
                            css={{
                                '&::before': {
                                    content: '""',
                                    ...css.absoluteFit,
                                },
                            }}
                        >
                            {Content_}
                        </A>
                    </Link>
                ) : (
                    <ABlank
                        aria-label={props.title}
                        inheritColor
                        noUnderline
                        href={props.url}
                        css={{
                            '&::before': {
                                content: '""',
                                ...css.absoluteFit,
                            },
                        }}
                    >
                        {Content_}
                    </ABlank>
                )}
            </Card>
        </Ripple>
    )
})
