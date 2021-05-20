import { Typography } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export const SectionHeading = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Typography
      variant="subtitle2"
      component="h3"
      sx={{ display: 'flex', alignItems: 'center', transform: 'none' }}
    >
      {children}
    </Typography>
  )
}
