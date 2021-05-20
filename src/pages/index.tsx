import {
  Button,
  createTheme,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { ArrowForwardRounded, GitHub, Twitter } from '@material-ui/icons'
import { GetStaticProps } from 'next'
import React, { ReactNode, useCallback } from 'react'
import { R } from '../../lib/remeda'
import { appPalette, profileUrl, spacing } from '../app/constants'
import { EntryItemList } from '../components/app/EntryItem'
import { ColorLight } from '../components/common/ColorLight'
import { CoverLink } from '../components/common/CoverLink'
import { Qiita, Zenn } from '../components/common/Icon'
import { NextLink } from '../components/common/NextLink'
import { SectionHeading } from '../components/common/SectionHeading'
import { MainLayout } from '../components/system/MainLayout'
import { Title } from '../components/system/Title'
import { descSortEntries } from '../services/entry'
import { getArticleEntries } from '../services/microcms/articles'
import { hasCategory, KnownEntry } from '../services/microcms/types'
import { getWorkEntries, workSourceIs } from '../services/microcms/works'
import { getQiitaEntries } from '../services/qiita/items'
import { getZennEntries } from '../services/zenn/zenn'

const CategorySection = ({
  color,
  heading,
  content,
  href,
}: {
  color: string
  heading: string
  content: ReactNode
  href: string
}) => {
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
    <Stack component="section" spacing={spacing.sectionItems}>
      <SectionHeading>
        <ColorLight background={color}></ColorLight>
        {heading}
      </SectionHeading>

      {content}

      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <ThemeProvider theme={_theme}>
          <NextLink href={href}>
            <Button
              color="primary"
              variant="text"
              endIcon={<ArrowForwardRounded></ArrowForwardRounded>}
            >
              {'すべて表示'}
            </Button>
          </NextLink>
        </ThemeProvider>
      </Stack>
    </Stack>
  )
}

type Props = {
  devEntries: KnownEntry[]
  musicEntries: KnownEntry[]
  otherEntries: KnownEntry[]
}

const Page = ({ devEntries, musicEntries, otherEntries }: Props) => {
  return (
    <MainLayout>
      <Title title={null} path={null}></Title>

      <Stack spacing={spacing.root}>
        <Stack
          spacing={spacing.rootS}
          component="section"
          sx={{ pt: 3, pb: 1 }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h1" fontWeight={800}>
              <Typography
                component="span"
                variant="inherit"
                color="text.disabled"
                sx={{ mr: 0.5 }}
              >
                {'@'}
              </Typography>

              {'yarnaimo'}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {'Web開発 / 作編曲'}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <CoverLink {...appPalette.twitter} href={profileUrl.twitter}>
              <Twitter></Twitter>
            </CoverLink>

            <CoverLink {...appPalette.github} href={profileUrl.github}>
              <GitHub></GitHub>
            </CoverLink>

            <CoverLink {...appPalette.qiita} href={profileUrl.qiita}>
              <Qiita></Qiita>
            </CoverLink>

            <CoverLink {...appPalette.zenn} href={profileUrl.zenn}>
              <Zenn></Zenn>
            </CoverLink>
          </Stack>
        </Stack>

        <CategorySection
          color={appPalette.music.color}
          heading="Music"
          href="/music"
          content={<EntryItemList entries={musicEntries}></EntryItemList>}
        ></CategorySection>

        <CategorySection
          color={appPalette.app.color}
          heading="Dev"
          href="/dev"
          content={<EntryItemList entries={devEntries}></EntryItemList>}
        ></CategorySection>

        <CategorySection
          color={appPalette.other.color}
          heading="Other"
          href="/other"
          content={<EntryItemList entries={otherEntries}></EntryItemList>}
        ></CategorySection>
      </Stack>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const limit = 4
  const takeEntries = R.take<KnownEntry>(limit)

  const [pinnedWorks, articles, qiitas, zenns] = await Promise.all([
    getWorkEntries(true),
    getArticleEntries(),
    getQiitaEntries(limit),
    getZennEntries(limit),
  ])

  const musicEntries = [
    ...pinnedWorks.filter(workSourceIs('song')),
    ...takeEntries(articles.filter(hasCategory('music'))),
  ]

  const devEntries = [
    ...pinnedWorks.filter(workSourceIs('github')),
    ...pinnedWorks.filter(workSourceIs('app')),
    ...R.pipe(
      [...qiitas, ...zenns, ...articles.filter(hasCategory('dev'))],
      descSortEntries,
      takeEntries,
    ),
  ]

  const otherEntries = takeEntries(articles.filter(hasCategory('other')))

  return {
    props: {
      devEntries,
      musicEntries,
      otherEntries,
    },
    revalidate: 60 * 5,
  }
}

export default Page
