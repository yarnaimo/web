import {
  Box,
  createTheme,
  IconButton,
  Theme,
  ThemeProvider,
} from '@material-ui/core'
import React, { memo, PropsWithChildren, useCallback } from 'react'

export const RoundedLink = memo(
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
              width: 'fit-content',
              height: 'fit-content',
              background,
              borderRadius: '50%',
            }}
          >
            <IconButton color="primary">{children}</IconButton>
          </Box>
        </a>
      </ThemeProvider>
    )
  },
)
