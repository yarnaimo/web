import {
  Box,
  createTheme,
  IconButton,
  Theme,
  ThemeProvider,
} from '@material-ui/core'
import React, { memo, PropsWithChildren, useCallback } from 'react'

export const CoverLink = memo(
  ({
    href,
    background,
    color,
    children,
  }: PropsWithChildren<{
    href: string
    background: string
    color: string
  }>) => {
    const _theme = useCallback(
      (theme: Theme) =>
        createTheme({
          ...theme,
          palette: {
            ...theme.palette,
            primary: { main: color },
          },
        }),
      [color],
    )

    return (
      <ThemeProvider theme={_theme}>
        <a href={href} target="_blank" rel="noreferrer">
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: '12px',
              background,
            }}
          >
            <IconButton
              color="primary"
              centerRipple={false}
              sx={{
                width: 56,
                height: 56,
                borderRadius: '0px',
              }}
            >
              {children}
            </IconButton>
          </Box>
        </a>
      </ThemeProvider>
    )
  },
)
