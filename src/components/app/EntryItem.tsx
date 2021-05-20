import { Box, Link, Stack, Typography } from '@material-ui/core'
import {
  CreateRounded,
  GitHub,
  MusicNoteRounded,
  WebRounded,
} from '@material-ui/icons'
import React, { memo, ReactElement } from 'react'
import { appPalette, spacing } from '../../app/constants'
import { useDateString } from '../../hooks/date'
import { ArticleEntry } from '../../services/microcms/articles'
import { EntryBase, KnownEntry } from '../../services/microcms/types'
import { WorkEntry } from '../../services/microcms/works'
import { QiitaEntry } from '../../services/qiita/items'
import { ZennEntry } from '../../services/zenn/zenn'
import { Cover } from '../common/Cover'
import { Qiita, Zenn } from '../common/Icon'
import { NextLink } from '../common/NextLink'
import { TagList } from '../common/TagList'
import { Thumb } from '../common/Thumb'

export const EntryItemBase = ({
  background,
  color,
  cover,
  title,
  tags,
  body,
  date,
  url,
  hideDate,
}: {
  background: string
  color: string
  cover: ReactElement
  hideDate: boolean
} & EntryBase) => {
  const dateString = useDateString(date)
  const isExternalLink = url.startsWith('https://')

  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
      sx={{
        pt: 0.25,
        // pt: 1.25,
        // pb: 1,
        // transition:
        //   'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        // '&:hover': {
        //   background: theme.palette.action.hover,
        // },
      }}
    >
      <Box mt={0.25}>
        <Cover {...{ background, color }}>{cover}</Cover>
      </Box>

      <Stack spacing={0.5} flexGrow={1}>
        <Typography variant="h4">
          <NextLink href={url}>
            <Link
              color="inherit"
              display="block"
              target={isExternalLink ? '_blank' : undefined}
              rel={isExternalLink ? 'noreferrer' : undefined}
            >
              {title}
            </Link>
          </NextLink>
        </Typography>

        {tags.length > 0 && <TagList tags={tags}></TagList>}

        {body && (
          <Typography variant="body2" color="text.secondary" py={0.25}>
            {body}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1, margin: '0!important' }}></Box>

        {!hideDate && (
          <Typography
            variant="caption"
            color="text.secondary"
            alignSelf="flex-end"
            py={0.25}
          >
            <time dateTime={date}>{dateString}</time>
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export const EntryItem = (
  data: WorkEntry | ArticleEntry | QiitaEntry | ZennEntry,
) => {
  switch (data.source) {
    case 'work':
      return <WorkEntryItem {...data}></WorkEntryItem>
    case 'article':
      return <ArticleEntryItem {...data}></ArticleEntryItem>
    default:
      return <ServiceEntryItem {...data}></ServiceEntryItem>
  }
}

export const EntryItemList = memo(({ entries }: { entries: KnownEntry[] }) => {
  return (
    <Stack spacing={spacing.sectionItems}>
      {entries.map((item) => (
        <EntryItem {...item} key={item.id}></EntryItem>
      ))}
    </Stack>
  )
})

const serviceIcon = {
  music: () => <MusicNoteRounded></MusicNoteRounded>,
  dev: () => <WebRounded></WebRounded>,
  other: () => <CreateRounded></CreateRounded>,

  github: () => <GitHub></GitHub>,
  qiita: () => <Qiita></Qiita>,
  zenn: () => <Zenn></Zenn>,
}

export const ServiceEntryItem = (data: QiitaEntry | ZennEntry) => {
  return (
    <EntryItemBase
      {...{
        ...appPalette[data.source],
        cover: serviceIcon[data.source](),
        hideDate: false,
        ...data,
      }}
    ></EntryItemBase>
  )
}

export const ArticleEntryItem = ({ body, ...data }: ArticleEntry) => {
  const category = data.categories[0]!

  return (
    <EntryItemBase
      {...{
        ...appPalette[category],
        cover: serviceIcon[category](),
        hideDate: false,
        ...data,
      }}
    ></EntryItemBase>
  )
}

export const WorkEntryItem = ({ workSource, thumb, ...data }: WorkEntry) => {
  const serviceKey = (
    {
      github: 'github',
      song: 'music',
      app: 'dev',
    } as const
  )[workSource]

  const cover = thumb ? (
    <Thumb url={thumb.url}></Thumb>
  ) : (
    serviceIcon[serviceKey]()
  )

  return (
    <EntryItemBase
      {...{
        ...appPalette[serviceKey],
        cover,
        hideDate: workSource === 'github',
        ...data,
      }}
    ></EntryItemBase>
  )

  // return (
  //   <Stack direction="row" gap={2}>
  //     <Box mt={0.25}>
  //       <Cover {...palette}>{cover}</Cover>
  //     </Box>

  //     <Stack gap={0.5}>
  //       <Typography variant="h4">{title}</Typography>

  //       {tags.length && (
  //         <Stack
  //           direction="row"
  //           columnGap={1}
  //           rowGap={0.75}
  //           py={0.25}
  //           flexWrap="wrap"
  //         >
  //           {tags.map((tag, i) => (
  //             <Chip size="small" variant="outlined" label={tag} key={i}></Chip>
  //           ))}
  //         </Stack>
  //       )}

  //       {body && (
  //         <Typography variant="body2" color="text.secondary" py={0.25}>
  //           {body}
  //         </Typography>
  //       )}

  //       {workSource !== 'github' && (
  //         <Typography
  //           variant="caption"
  //           color="text.secondary"
  //           alignSelf="flex-end"
  //         >
  //           {dateString}
  //         </Typography>
  //       )}
  //     </Stack>
  //   </Stack>
  // )
}
