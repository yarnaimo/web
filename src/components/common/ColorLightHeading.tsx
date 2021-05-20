import { Typography } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { ColorLight } from './ColorLight'

export const ColorLightHeading = ({
  color,
  children,
}: PropsWithChildren<{ color: string }>) => {
  return (
    <Typography
      variant="subtitle2"
      component="h2"
      color="text.secondary"
      fontWeight={700}
      sx={{ display: 'flex', alignItems: 'center', transform: 'none' }}
    >
      <ColorLight background={color}></ColorLight>
      <span>{children}</span>
    </Typography>
  )
}
