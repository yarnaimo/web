import { Box } from '@material-ui/core'
import React from 'react'

export const ColorLight = ({ background }: { background: string }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: 6,
        height: 6,
        mr: 1,
        borderRadius: '50%',
        background,
      }}
    ></Box>
  )
}
