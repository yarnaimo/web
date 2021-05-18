import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import {
  CodeRounded,
  CreateRounded,
  HomeRounded,
  MusicNoteRounded,
} from '@material-ui/icons'
import { SxProps } from '@material-ui/system'
import { useRouter } from 'next/router'
import React, { memo, ReactElement, ReactNode } from 'react'
import { appDimension } from '../../app/constants'
import { NextLink } from '../common/NextLink'
import { theme } from '../system/StyleProvider'

const createTabComponent =
  (bottom: boolean) =>
  ({
    label,
    icon,
    value,
    selected,
  }: {
    label: ReactNode
    icon: ReactElement
    value: string
    selected?: boolean
  }) => {
    return (
      <NextLink href={value}>
        <Tab
          label={<Typography variant="caption">{label}</Typography>}
          icon={icon}
          {...({ selected } as any)}
          sx={{
            minHeight: bottom ? appDimension.navBar.bottom : 80,
            minWidth: bottom ? undefined : appDimension.navBar.side,
            pb: 0.25,
            textTransform: 'none',
            '& .MuiTab-wrapper > *:first-child': {
              mb: 0.5,
            },
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
          }}
        ></Tab>
      </NextLink>
    )
  }

const createTabsComponent = (bottom: boolean) => {
  const TabComponent = createTabComponent(bottom)

  return memo(() => {
    const { pathname } = useRouter()

    const positionStyles: SxProps = bottom
      ? { position: 'fixed', width: '100%', bottom: 0, left: 0 }
      : { position: 'fixed', height: '100%', top: 0, left: 0, pt: 12 }

    const indicatorStyles: SxProps = bottom ? { bottom: 'unset', top: 0 } : {}

    const indicatorSpanStyles: SxProps = bottom
      ? { height: 3, minWidth: 44, borderRadius: '0 0 3px 3px' }
      : { width: 3, minHeight: 48, borderRadius: '3px 0 0 3px' }

    return (
      <Box
        component="nav"
        sx={{
          [theme.breakpoints[bottom ? 'up' : 'down']('md')]: {
            display: 'none',
          },
          ...positionStyles,
          zIndex: theme.zIndex.appBar,
          boxShadow: theme.shadows[3],
          background: theme.palette.background.paper,
        }}
      >
        <Tabs
          value={pathname}
          orientation={bottom ? 'horizontal' : 'vertical'}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            },
            '& .MuiTabs-indicator': {
              ...indicatorStyles,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: bottom ? 'row' : 'column',
              justifyContent: 'center',
              background: 'transparent',
            },
            '& .MuiTabs-indicatorSpan': {
              ...indicatorSpanStyles,
              background: theme.palette.primary.main,
            },
          }}
        >
          <TabComponent
            label="Home"
            icon={<HomeRounded></HomeRounded>}
            value="/"
          ></TabComponent>

          <TabComponent
            label="Music"
            icon={<MusicNoteRounded></MusicNoteRounded>}
            value="/music"
          ></TabComponent>

          <TabComponent
            label="Dev"
            icon={<CodeRounded></CodeRounded>}
            value="/dev"
          ></TabComponent>

          <TabComponent
            label="Other"
            icon={<CreateRounded></CreateRounded>}
            value="/other"
          ></TabComponent>
        </Tabs>
      </Box>
    )
  })
}

export const BottomTabs = createTabsComponent(true)
export const SideTabs = createTabsComponent(false)
