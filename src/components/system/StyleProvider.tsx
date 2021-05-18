import { cache } from '@emotion/css'
import { CacheProvider, CSSObject } from '@emotion/react'
import { CssBaseline, GlobalStyles } from '@material-ui/core'
import { common, grey } from '@material-ui/core/colors'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import React, { PropsWithChildren } from 'react'
import { appPalette } from '../../app/constants'

const defaultFonts = [
  'Nunito Sans',
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

const fontFamily = defaultFonts.join()
const fontSize = 14
const lineHeight = 1.6
const letterSpacing = 0.25

// 6, 3.75, 3, 2.125, 1.5, 1.25
const h = (
  fontSize: number,
  fontWeight?: number,
  lineHeight?: number,
  color?: string,
  translateX?: number,
) => ({
  fontSize: `${fontSize}rem`,
  fontWeight,
  lineHeight,
  color,
  transform: translateX ? `translateX(${translateX}px)` : undefined,
})

// h(2.25, 300, blueGrey[700], -2),
//   h2: h(1.875, 300, blueGrey[700], -1.5),
//   h3: h(1.5, 400, blueGrey[700], -1),
//   h4: h(1.25, 600, blueGrey[700], -0.5),
//   h5: h(1.125, 600, blueGrey[800]),
//   h6: h(1, 600,

export const headingStyles = {
  h1: h(2, 700, undefined, undefined, -1.5),
  h2: h(1.625, 700, undefined, undefined, -1),
  h3: h(1.375, 700, undefined, undefined, -0.5),
  h4: h(1.125, 700, 1.5, undefined, -0),
  h5: h(1.125, 700, 1.5, undefined, -0),
  h6: h(1.125, 700, 1.5, undefined, -0),
  // h5: h(1.125, 600, blueGrey[800]),
  // h6: h(1, 600, blueGrey[800]),
}

const globalStyles: CSSObject = {
  html: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    touchAction: 'manipulation',
    fontSize,
    overflowWrap: 'break-word',
    textTransform: 'none',
    // background: grey[50],
    background: '#fdfdfd',
    // color: grey[900],
    WebkitTapHighlightColor: 'transparent',
  },

  body: {
    // margin: 0,
    padding: 0,
    background: 'unset',
    fontFamily,
    lineHeight,
    letterSpacing,
  },

  // 'h1, h2, h3, h4': {
  //   marginBlockStart: 0,
  //   marginBlockEnd: 0,
  // },

  ...headingStyles,

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  'input[type="time"]::-webkit-calendar-picker-indicator': {
    display: 'none',
  },

  'form > .MuiFormControl-root > div': {
    marginTop: -16,
  },

  'form .MuiFormControl-root ~ .MuiList-root': {
    display: 'none',
  },
}

export const theme = createTheme({
  palette: {
    // contrastThreshold: 2,
    action: {
      hover: 'rgba(0, 0, 0, 0.025)',
      selected: 'rgba(0, 0, 0, 0.06)',
    },
    primary: {
      main: appPalette.app.color,
      contrastText: common.white,
    },
    secondary: {
      main: appPalette.other.color,
    },
    text: {
      secondary: 'rgba(0, 0, 0, 0.5)',
    },
  },

  typography: {
    fontFamily,
    fontSize: 15,
    ...headingStyles,
    // subtitle1: { color: blueGrey[600] },
    // subtitle2: { color: blueGrey[600] },
    subtitle2: { lineHeight },
    body1: { fontSize: '1rem', lineHeight },
    body2: { lineHeight },
    // caption: { fontSize: '0.9rem' },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 32,
          paddingRight: 32,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        outlined: { border: `1px solid ${grey[300]}` },
        // root: { background: 'rgba(0, 0, 0, 0.06)' },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true,
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none!important',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingBottom: 8,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '&:last-of-type': {
            paddingBottom: 16,
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 3,
        // variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '18px 24px!important',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none!important',
        },
      },
    },

    // MuiTypography: {
    //   styleOverrides: {
    //     h2: {
    //       // lineHeight: 'unset',
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none!important',
          borderRadius: 6,
          // fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        // variant: 'filled',
      },
    },

    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
})

// 3-6 left -2px shifted
Object.assign(theme.shadows, {
  [1]: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  [2]: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  [3]: '0 2px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  [4]: '0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  [5]: '0 18px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  [6]: '0 23px 50px -12px rgba(0, 0, 0, 0.25)',
})

export const StyleProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <CssBaseline></CssBaseline>
      <GlobalStyles styles={globalStyles}></GlobalStyles>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </>
  )
}
