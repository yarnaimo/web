import { CSSObject, Global } from '@emotion/core'
import React, { memo } from 'react'
import { color, themeColor } from '../../services/view/color'
import { css } from '../../services/view/css'

const fontFamily = [
    'Ubuntu',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'BIZ UDPゴシック',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
]
    .map((f) => `'${f}'`)
    .concat('sans-serif')
    .join()

const fontSize = 14
const lineHeight = 1.6
const letterSpacing = 0.375

const styles: CSSObject = {
    html: {
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        touchAction: 'manipulation',
        fontSize,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'break-word',

        lineHeight,
        letterSpacing,
        textTransform: 'none',
        WebkitTapHighlightColor: color.transparent(),
    },

    body: {
        fontFamily,
    },

    'img:not([alt])': {
        filter: 'none',
    },

    a: {
        textDecoration: 'none',
        color: color.blue(),

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    'h1, h2': {
        fontFamily: `'Cabin', ${fontFamily}`,
        fontWeight: 600,
        letterSpacing: 0.75,
        marginBlockStart: '1em',
        marginBlockEnd: '0.75em',
    },

    h3: {
        // marginBlockStart: '0.75em',
        // marginBlockEnd: '0.75em',
    },

    'h4, h5': {
        fontWeight: 500,
    },

    ul: {
        paddingLeft: 28,
    },
    ol: {
        paddingLeft: 28,
    },

    // 'ul[class^="css-"], ol[class^="css-"]': {
    //   listStyle: 'none',
    //   padding: 0,
    // },

    pre: {
        ...css.padding({ x: 12, y: 8 }),
        overflow: 'auto',
        borderRadius: 8,
        background: color.codeBg(0.08),
    },

    '*:not(pre)': {
        '& > code, & > kbd, & > samp': {
            // borderRadius: 4,
            ...css.margin({ x: 4 }),
            // ...css.padding({ x: 4, y: 1 }),
            // border: `solid 1px ${color.black(0.15)}`,
            transform: 'translateY(-1px)',
            display: 'inline-block',
            color: color.inlineCode(),
        },
    },

    'code, kbd, samp': {
        fontSize: '0.95em',
        letterSpacing: 0,
    },

    blockquote: {
        marginLeft: 0,
        marginRight: 0,
        borderLeft: `solid 3px ${color.codeBg(0.25)}`,
        paddingLeft: '1.25em',
        ...css.padding({ y: 2 }),
    },

    '.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label': {
        color: themeColor('primary'),
    },

    '.mdc-ripple-surface': {
        '&::before, &::after': {
            backgroundColor: 'rgba(0, 0, 0, 0.33)',
        },
        '&:hover::before': {
            opacity: 0.06,
        },
        '&.mdc-ripple-upgraded': {
            '--mdc-ripple-fg-opacity': 0.06,
        },
        [`&.mdc-ripple-upgraded--background-focused::before,
          &:not(.mdc-ripple-upgraded):focus::before`]: {
            opacity: 0.09,
        },
    },
}

export const GlobalStyle = memo(() => {
    return <Global styles={styles}></Global>
})
