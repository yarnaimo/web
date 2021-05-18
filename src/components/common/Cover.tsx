import { Box } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export const Cover = ({
  // size,
  background,
  color,
  children,
}: PropsWithChildren<{
  // size: number
  background?: string
  color?: string
}>) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: 56,
        height: 56,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background,
        color,
      }}
    >
      {children}
    </Box>
  )
}
