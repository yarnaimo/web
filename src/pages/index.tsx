import styled from '@emotion/styled'
import { NextPage } from 'next'
import React, { FC, memo } from 'react'
import { MainLayout, perspective } from '../components/app/MainLayout'
import { navAreaY } from '../components/app/NavBar'
import { FIconBadge, FIconWithText } from '../components/atoms/FIcon'
import { Heading2Icon } from '../components/atoms/Heading2'
import { Slash } from '../components/atoms/Slash'
import { ContainerCard } from '../components/blocks/Container'
import { Divider } from '../components/blocks/Divider'
import { Solid, SolidColumn } from '../components/blocks/Flex'
import { IListItem, UnorderedList } from '../components/blocks/List'
import { PageSection } from '../components/blocks/PageSection'
import { Title } from '../components/helpers/Title'
import { color } from '../services/view/color'
import { css } from '../services/view/css'
import { iconPropMap } from '../services/view/icon'

type Props = {}

const HeroWidth = 'min(100vw, 411px)'
const heroRatio = 328 / 375
const heroRatioP = `${heroRatio * 100}%`

const HeroImageOuter = styled('div')<{ z: number }>(
    {
        ...css.absoluteFit,
        left: '50%',
        width: HeroWidth,
        transformStyle: 'preserve-3d',

        [css.responsive.isMobile]: {
            top: 0,
        },
    },
    ({ z }) => {
        const scale = z / -perspective + 1
        return {
            top: navAreaY * scale,
            transform: `translateX(-50%) translateZ(${z}px) scale(${scale})`,
        }
    },
)

export const PageSectionCentered = styled(PageSection)({
    alignItems: 'center',
    maxWidth: 304,
    ...css.margin({ x: 'auto' }),
}).withComponent(SolidColumn)

const FullWidthImage = styled('img')({ width: '100%' })

const MainCard: FC<{}> = memo(({}) => {
    return (
        <ContainerCard
            css={{
                ...css.margin({ top: 0 }),
                borderRadius: 24,
            }}
        >
            <PageSectionCentered css={{ fontSize: 13 }}>
                <Solid jc="space-between" css={{ ...css.margin({ y: 8 }) }}>
                    <FIconBadge
                        href="https://twitter.com/yarnaimo"
                        {...iconPropMap.twitter}
                        label="Twitter"
                    ></FIconBadge>

                    <FIconBadge
                        href="https://github.com/yarnaimo"
                        {...iconPropMap.github}
                        label="GitHub"
                    ></FIconBadge>

                    <FIconBadge
                        href="https://qiita.com/yarnaimo"
                        {...iconPropMap.qiita}
                        label="Qiita"
                    ></FIconBadge>
                </Solid>

                <Divider></Divider>

                <h1
                    css={{
                        fontSize: 18,
                        ...css.margin({ y: 4 }),
                    }}
                >
                    yarnaimo<Slash></Slash>
                    <span css={{ fontSize: '0.9em' }}>やまいも</span>
                </h1>

                <div
                    css={{
                        ...css.margin({ y: 8 }),
                        fontSize: 11,
                        color: color.black(0.5),
                    }}
                >
                    yarnaimo
                    <span
                        css={{
                            '&:before': {
                                content: '"@"',
                            },
                        }}
                    ></span>
                    gmail.com
                </div>

                <p css={{ textAlign: 'center' }}>
                    個人で Web サービスなどを作っています。
                </p>

                <Solid>
                    <FIconWithText
                        icon="calendar"
                        large
                        background={color.orange(0.25)}
                        foreground={color.orange(1)}
                        css={{ ...css.margin({ y: 8 }) }}
                    >
                        1998 年
                    </FIconWithText>

                    <FIconWithText
                        icon="home"
                        large
                        background={color.brown(0.2)}
                        foreground={color.brown(1)}
                        css={{ ...css.margin({ y: 8, left: 24 }) }}
                    >
                        大阪周辺
                    </FIconWithText>
                </Solid>

                <FIconWithText
                    icon="heart"
                    large
                    background={color.pinkv(0.1)}
                    foreground={color.pinkv(0.7)}
                    css={{ ...css.margin({ y: 8 }) }}
                >
                    声優 <small>(上田麗奈)</small>
                    <Slash></Slash>アイマス <small>(ミリオン: 高坂海美)</small>
                    <Slash></Slash>音楽 <small>(MONACA・大原ゆい子 など)</small>
                    <Slash></Slash>鉄道 <small>(信号・保安装置)</small> など
                </FIconWithText>
            </PageSectionCentered>

            <Divider></Divider>

            <PageSection>
                <Heading2Icon icon="check-circle">Skills</Heading2Icon>

                <UnorderedList>
                    {[
                        <>HTML / CSS</>,
                        <b>Web デザイン</b>,
                        <>
                            JavaScript / <b>TypeScript</b>
                        </>,
                        <b>Firebase</b>,
                        <>
                            <b>React</b> / <b>Next.js</b>
                        </>,
                        <>
                            Emotion <small>(CSS-in-JS)</small>
                        </>,
                        <b>Node.js</b>,
                        <>TensorFlow / Keras</>,
                    ].map((el, i) => (
                        <IListItem key={i}>{el}</IListItem>
                    ))}
                </UnorderedList>
            </PageSection>

            <PageSection>
                <Heading2Icon icon="tool">Development Tools</Heading2Icon>

                <UnorderedList>
                    <IListItem>WSL (Ubuntu)</IListItem>
                    <IListItem>Fish</IListItem>
                    <IListItem>Git</IListItem>
                    <IListItem>Visual Studio Code</IListItem>
                    <IListItem>Yarn</IListItem>
                    <IListItem>Jest</IListItem>
                    <IListItem>Prettier</IListItem>
                    <IListItem>Affinity Designer</IListItem>
                </UnorderedList>
            </PageSection>
        </ContainerCard>
    )
})

const HomePage: NextPage<Props> = ({}) => {
    return (
        <MainLayout lightBrown>
            <SolidColumn
                css={{
                    width: '100%',
                }}
            >
                <Title title={null} path={null}></Title>

                <HeroImageOuter z={-8}>
                    <FullWidthImage
                        alt=""
                        src="assets/hero.svg"
                    ></FullWidthImage>
                </HeroImageOuter>

                <HeroImageOuter z={-24}>
                    <FullWidthImage
                        alt=""
                        src="assets/hero-1.svg"
                    ></FullWidthImage>
                </HeroImageOuter>

                <div
                    css={{
                        width: HeroWidth,

                        '&:before': {
                            content: '""',
                            display: 'block',
                            paddingTop: heroRatioP,
                        },
                    }}
                ></div>

                <MainCard></MainCard>
            </SolidColumn>
        </MainLayout>
    )
}

export default HomePage
