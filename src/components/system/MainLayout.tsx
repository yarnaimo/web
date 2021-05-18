import { Box, Container } from '@material-ui/core'
import React, { ComponentProps, memo } from 'react'
import { appDimension } from '../../app/constants'
import { theme } from './StyleProvider'

export const MainLayout = memo(
  ({ ...props }: ComponentProps<typeof Container>) => {
    const py = 4

    return (
      <Box
        sx={{
          [theme.breakpoints.down('md')]: {
            pb: appDimension.navBar.bottom,
          },
          [theme.breakpoints.up('md')]: {
            pl: appDimension.navBar.side,
          },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py, ...props.sx }}
          {...props}
        ></Container>
      </Box>
    )
  },
)
