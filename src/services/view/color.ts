import is from '@sindresorhus/is/dist'
import convert from 'color-convert'

export const hsl = (h: number, s: number, l: number) => {
    const [r, g, b] = convert.hsl.rgb([h, s, l])

    return (a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`
}

export const hexToRgba = (hex: string, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
}

export const materialColor = (color: string, variant: string | number) =>
    `var(--md-${color}-${variant})`

export const themeColor = (theme: string) => `var(--mdc-theme-${theme})`

//

export const color = {
    transparent: () => 'transparent',
    white: hsl(0, 100, 100),
    black: hsl(0, 0, 0),
    wblack: hsl(33, 12, 23),
    brown: hsl(35, 41, 61),
    lightBrown: hsl(35, 55, 94),

    lightGreen: hsl(71, 81, 61),
    lime: hsl(61, 81, 60),

    blue: hsl(203, 73, 53),
    lightBlue: hsl(203, 85, 60),

    sky: hsl(177, 62, 75),
    // blue: hsl(211, 41, 57),

    primaryL: hsl(75, 73, 81),
    primary: hsl(162, 63, 64),
    primaryD: hsl(169, 74, 50),

    // pink: hsl(3, 77, 75), hsla(353, 79%, 66%, 1) 352, 85, 65 hsl(354, 100%, 65%)
    pinkv: hsl(352, 90, 62),
    pink: hsl(356, 77, 64),
    pinkL: hsl(356, 77, 69),
    orange: hsl(39, 99, 63),
}

const sf = (v: string | (() => string)) => (is.string(v) ? v : v())

//

export const gradientFn = (deg: number, stop?: string) => (
    c1: string | (() => string),
    c2: string | (() => string),
) =>
    `linear-gradient(${deg}deg, ${sf(c1)} ${stop || '0%'}, ${sf(c2)} ${
        stop || '100%'
    })`

export const cardGradient = gradientFn(120, 'calc(100% - 73px)')
export const categoryChipGradient = gradientFn(135, '50%')
export const cardLight = gradientFn(120)

export const shadowFn = (x: number, y: number, b: number, s: number) => (
    color: string,
) => `${x}px ${y}px ${b}px ${s}px ${color}`

export const shadows = {
    // navbar: shadowFn(0, 2, 12, -2),
    navbarDeep: shadowFn(0, 6, 21, -2),

    card: shadowFn(0, 3, 15, -2),
    cardHovered: shadowFn(0, 3, 20, -1),
    containerCard: shadowFn(0, 4, 32, -2),

    dialog: shadowFn(0, 9, 33, 1),
}

export const glow = shadowFn(0, 0, 15, 0)
