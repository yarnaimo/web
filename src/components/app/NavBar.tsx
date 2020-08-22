import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, memo } from 'react'
import { Ripple } from 'rmwc/next'
import { openTweetDialog } from '../../services/twitter/helper'
import { color, glow, shadows } from '../../services/view/color'
import { css, transition } from '../../services/view/css'
import { webConfig } from '../../web-config'
import { FIcon } from '../atoms/FIcon'
import { Solid, SolidColumn } from '../blocks/Flex'
import { FixedFab } from './FixedFab'

const navRadius = 20
export const navHeight = 64
export const navMarginY = 16
export const navAreaY = navHeight + navMarginY * 2

const itemWidth = 80
const itemSideMargin = 4
const iconOuterSize = 30
const iconSize = 18

export const NavSpacer = styled('div')({
    height: navHeight + navMarginY * 2,
})

export const TopSpacer = styled(NavSpacer)({
    display: 'block',
    [css.responsive.isMobile]: {
        display: 'none',
    },
})
export const BottomSpacer = styled(NavSpacer)({
    display: 'none',
    [css.responsive.isMobile]: {
        display: 'block',
    },
})

const OuterBlock = styled(Solid)({
    position: 'fixed',
    zIndex: 4,
    width: '100%',
    ...css.padding({ y: navMarginY }),
    top: 0,
    [css.responsive.isMobile]: {
        top: 'unset',
        bottom: 0,
    },

    justifyContent: 'center',
    pointerEvents: 'none',
})

const MainBlock = styled(Solid)({
    pointerEvents: 'all',
    minWidth: 200,
    height: navHeight,
    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',
    ...css.padding({ left: itemWidth * 0.25, right: itemWidth * 0.25 }),
    opacity: 1,
    background: color.white(),
    borderRadius: navRadius,
    boxShadow: shadows.navbarDeep(color.black(0.4)),
})

const ItemBlock = styled(SolidColumn)<{ active: boolean }>({
    height: navHeight,
    width: itemWidth,
    ...css.margin({ x: itemSideMargin }),
    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    userSelect: 'none',

    '&:before': {
        display: 'none',
    },
    '&:after': {
        background: color.orange(0.5),
    },
})

const ItemIconBlockTr = transition(
    'std',
    ['background', 'color', 'boxShadow', 'transform'],
    [0.25, 0.25, 0.25, 0.3],
    [0.05, 0.05, 0.05, 0],
)

const ItemIconBlock = styled(Solid)<{ active: boolean }>(
    {
        ...css.size(iconOuterSize, iconOuterSize),
        borderRadius: '50%',

        justifyContent: 'center',
        alignItems: 'center',

        ...ItemIconBlockTr,
    },
    ({ active }) => ({
        transform: active ? 'scale(1)' : 'scale(0.92)',
        boxShadow: active
            ? glow(color.orange(0.25))
            : glow(color.transparent()),
        background: active ? color.orange() : color.orange(0),
        color: active ? color.white() : color.black(0.3),
    }),
)

const ItemLabelBlockTr = transition('std', ['color'], [0.4])

const ItemLabelBlock = styled('span')<{ active: boolean }>(
    {
        ...css.margin({ top: 4 }),
        fontSize: 11.5,
        fontFamily: 'Cabin',
        fontWeight: 'bold',
        transform: 'translateY(2px)',
        ...ItemLabelBlockTr,
    },
    ({ active }) => ({
        color: active ? color.orange() : color.black(0.3),
    }),
)

const Item: FC<{
    active: boolean
    path: string
    icon: string
    label: string
}> = memo(({ active, path, icon, label }) => {
    return (
        <Ripple primary>
            <ItemBlock {...{ active }}>
                <ItemIconBlock {...{ active }}>
                    <FIcon {...{ icon, size: iconSize }}></FIcon>
                </ItemIconBlock>

                <ItemLabelBlock {...{ active }}>{label}</ItemLabelBlock>

                <Link href={path} passHref>
                    <a aria-label={label} css={{ ...css.absoluteFit }}></a>
                </Link>
            </ItemBlock>
        </Ripple>
    )
})

const items = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/activity', icon: 'activity', label: 'Activity' },
    // { path: '/blog', icon: 'feather', label: 'Blog' },
    // {path:'/',label:'Home'},
    // {path:'/',label:'Home'},
]

const NavFab = styled(FixedFab)({
    position: 'fixed',
    bottom: 32,
    right: 32,

    [css.responsive.isMobile]: {
        position: 'absolute',
        right: 0,
        ...css.size(48, 48),

        // bottom: 0,
        // transform: 'translate(50%, 50%)',

        top: 0,
        transform: 'translate(50%, -50%)',
    },
})

type Props = {}

export const NavBar: FC<Props> = ({}) => {
    const router = useRouter()

    return (
        <OuterBlock>
            <MainBlock>
                {items.map(({ path, icon, label }, i) => (
                    <Item
                        {...{
                            active: path === router.pathname,
                            path,
                            icon,
                            label,
                        }}
                        key={i}
                    ></Item>
                ))}

                <NavFab
                    aria-label="ツイートする"
                    background={color.sky()}
                    onClick={() =>
                        openTweetDialog(webConfig.origin, webConfig.longAppName)
                    }
                    icon={<FIcon size={20} stroke={3} icon="twitter"></FIcon>}
                ></NavFab>
            </MainBlock>
        </OuterBlock>
    )
}
