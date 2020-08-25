import styled from '@emotion/styled'
import { NextPage } from 'next'
import React, { FC, memo } from 'react'
import { MainLayout, perspective } from '../components/app/MainLayout'
import { navAreaY } from '../components/app/NavBar'
import { FIconBadge, FIconWithText } from '../components/atoms/FIcon'
import { Heading2Icon } from '../components/atoms/Heading2'
import { Slash } from '../components/atoms/Slash'
import { Container } from '../components/blocks/Container'
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

const Z = styled('div')<{ z: number }>(({ z }) => {
    const scale = z / -perspective + 1
    return {
        position: 'absolute',
        top: navAreaY * scale,
        transform: `translateX(-50%) translateZ(${z}px) scale(${scale})`,
    }
})

const HeroImageOuter = styled(Z)({
    ...css.absoluteFit,
    left: '50%',
    width: HeroWidth,
    transformStyle: 'preserve-3d',

    [css.responsive.isMobile]: {
        top: 0,
    },
})

export const PageSectionCentered = styled(PageSection)({
    alignItems: 'center',
}).withComponent(SolidColumn)

const FullWidthImage = styled('img')({ width: '100%' })

const MainCard: FC<{}> = memo(({}) => {
    return (
        <Container
            css={{
                ...css.marginBlock(4),
                borderRadius: 24,
            }}
        >
            <PageSectionCentered css={{ fontSize: 13 }}>
                <Solid jc="space-between" css={{ ...css.marginBlock(8) }}>
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
                        ...css.marginBlock(4),
                    }}
                >
                    yarnaimo<Slash></Slash>
                    <span css={{ fontSize: '0.9em' }}>やまいも</span>
                </h1>

                <div
                    css={{
                        ...css.marginBlock(8),
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
                    Webサービスの開発などを行っています。
                </p>

                <Solid css={{ ...css.margin({ top: 4 }) }}>
                    <FIconWithText
                        icon="calendar"
                        large
                        // background={color.orange(1)}
                        background={'transparent'}
                        foreground={color.orange(1)}
                        // foreground={color.orange(1)}
                        css={{
                            ...css.marginBlock(8),
                            paddingLeft: 36,
                        }}
                    >
                        1998 年
                    </FIconWithText>

                    <FIconWithText
                        icon="home"
                        large
                        // background={color.brown(1)}
                        background={'transparent'}
                        foreground={color.brown(1)}
                        // foreground={color.brown(1)}
                        css={{
                            ...css.marginBlock(8),
                            marginLeft: 24,
                            paddingLeft: 36,
                        }}
                    >
                        大阪周辺
                    </FIconWithText>
                </Solid>

                <FIconWithText
                    icon="heart"
                    large
                    // background={color.pinkv(1)}
                    background={'transparent'}
                    foreground={color.pinkv(1)}
                    // foreground={color.pinkv(0.7)}
                    css={{ ...css.marginBlock(8) }}
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
                        <b>UIデザイン</b>,
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
        </Container>
    )
})

const HomePage: NextPage<Props> = ({}) => {
    return (
        <MainLayout lightBrown>
            <Title title={null} path={null}></Title>

            {/* <Z
                z={-32}
                css={{
                    // position: 'fixed',
                    right: '-200vw',
                    top: '-150vh',
                    width: 192,
                    height: 192,
                    borderRadius: '50%',
                    background: hsl(197, 50, 83)(),
                }}
            ></Z>

            <Z
                z={-32}
                css={{
                    // position: 'fixed',
                    top: 'unset',
                    left: '-200vw',
                    bottom: '-100vw',
                    width: 128,
                    height: 128,
                    borderRadius: '50%',
                    background: hsl(357, 50, 83)(),
                }}
            ></Z> */}

            <SolidColumn
                ai="center"
                css={{
                    width: '100%',
                    // ...css.marginBlock(36),
                }}
            >
                {/* <HeroImageOuter z={-8}>
                <FullWidthImage alt="" src="assets/hero.svg"></FullWidthImage>
            </HeroImageOuter>

            <HeroImageOuter z={-32}>
                <FullWidthImage alt="" src="assets/hero-1.svg"></FullWidthImage>
            </HeroImageOuter> */}

                {/* <HeroImageOuter z={-24}>
                    <FullWidthImage
                        alt=""
                        src="assets/hero-2.svg"
                    ></FullWidthImage>
                </HeroImageOuter> */}

                {/* <div
                css={{
                    width: HeroWidth,

                    '&:before': {
                        content: '""',
                        display: 'block',
                        paddingTop: heroRatioP,
                    },
                }}
            ></div> */}

                {/* <Solid
                    ai="center"
                    jc="center"
                    css={{
                        ...css.size(148, 148),
                        borderRadius: '50%',
                        border: `solid 2px ${color.black(0.05)}`,
                    }}
                > */}
                <div
                    css={{
                        ...css.size(120, 120),
                        marginTop: 44,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        // boxShadow: shadows.icon(color.black(0.5)),
                    }}
                >
                    <img
                        alt="icon"
                        src="assets/icons/manifest-icon-512.png"
                        css={{ ...css.size('100%', '100%') }}
                    ></img>
                </div>
                {/* </Solid> */}

                <MainCard></MainCard>
            </SolidColumn>
        </MainLayout>
    )
}

export default HomePage
