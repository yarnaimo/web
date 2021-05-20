import {
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { ArrowForwardRounded, GitHub, Twitter } from '@material-ui/icons'
import { GetStaticProps } from 'next'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { R } from '../../lib/remeda'
import { appPalette, profileUrl } from '../app/constants'
import {
  ArticleEntryItem,
  ServiceEntryItem,
  WorkEntryItem,
} from '../components/app/WorkItem'
import { ColorLightHeading } from '../components/common/ColorLightHeading'
import { CoverLink } from '../components/common/CoverLink'
import { Qiita, Zenn } from '../components/common/Icon'
import { NextLink } from '../components/common/NextLink'
import { MainLayout } from '../components/system/MainLayout'
import { Title } from '../components/system/Title'
import { ArticleEntry, getArticleEntries } from '../services/microcms/articles'
import { hasCategory } from '../services/microcms/types'
import { getWorkEntries, WorkEntry } from '../services/microcms/works'
import { getQiitaEntries, QiitaEntry } from '../services/qiita/items'
import { getZennEntries, ZennEntry } from '../services/zenn/zenn'

const CategoryCard = ({
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
    <Card
      sx={{
        '*:not(style) + &:not(style)': {
          mx: -2,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <ColorLightHeading color={color}>
            <span style={{ transform: 'translateY(1px)' }}>{heading}</span>
          </ColorLightHeading>

          {content}
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
      </CardActions>
    </Card>
  )
}

const CardItemStack = ({ children }: { children: ReactNode }) => {
  return <Stack spacing={2}>{children}</Stack>
}

type Props = {
  workEntries: WorkEntry[]
  devEntries: (QiitaEntry | ZennEntry | ArticleEntry)[]
  musicEntries: ArticleEntry[]
  otherEntries: ArticleEntry[]
}

const Page = ({
  workEntries,
  devEntries,
  musicEntries,
  otherEntries,
}: Props) => {
  const [songs, repos, apps] = useMemo(
    () => [
      workEntries.filter(({ workSource }) => workSource === 'song'),
      workEntries.filter(({ workSource }) => workSource === 'github'),
      workEntries.filter(({ workSource }) => workSource === 'app'),
    ],
    [workEntries],
  )

  return (
    <MainLayout>
      <Title title={null} path={null}></Title>

      <Stack spacing={4}>
        <Stack spacing={1} mt={1}>
          <Typography variant="h1">
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

        <CategoryCard
          color={appPalette.music.color}
          heading="Music"
          href="/music"
          content={
            <CardItemStack>
              {songs.map((item) => (
                <WorkEntryItem {...item} key={item.id}></WorkEntryItem>
              ))}
              {musicEntries.map((item) => (
                <ArticleEntryItem {...item} key={item.id}></ArticleEntryItem>
              ))}
            </CardItemStack>
          }
        ></CategoryCard>

        <CategoryCard
          color={appPalette.app.color}
          heading="Dev"
          href="/dev"
          content={
            <CardItemStack>
              {repos.map((item) => (
                <WorkEntryItem {...item} key={item.id}></WorkEntryItem>
              ))}
              {apps.map((item) => (
                <WorkEntryItem {...item} key={item.id}></WorkEntryItem>
              ))}
              {devEntries.map((item) =>
                item.source === 'article' ? (
                  <ArticleEntryItem {...item} key={item.id}></ArticleEntryItem>
                ) : (
                  <ServiceEntryItem {...item} key={item.id}></ServiceEntryItem>
                ),
              )}
            </CardItemStack>
          }
        ></CategoryCard>

        <CategoryCard
          color={appPalette.other.color}
          heading="Other"
          href="/other"
          content={
            <CardItemStack>
              {otherEntries.map((item) => (
                <ArticleEntryItem {...item} key={item.id}></ArticleEntryItem>
              ))}
            </CardItemStack>
          }
        ></CategoryCard>
      </Stack>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const limit = 4

  const [workEntries, articleEntries, qiitaEntries, zennEntries] =
    await Promise.all([
      getWorkEntries(true),
      getArticleEntries(),
      getQiitaEntries(limit),
      getZennEntries(limit),
    ])

  const musicEntries = articleEntries.filter(hasCategory('music'))
  const otherEntries = articleEntries.filter(hasCategory('other'))

  const devEntries = R.pipe(
    [
      ...qiitaEntries,
      ...zennEntries,
      ...articleEntries.filter(hasCategory('dev')),
    ],
    R.sortBy(({ date }) => date),
    R.reverse(),
    R.take(limit),
  )

  return {
    props: { workEntries, devEntries, musicEntries, otherEntries },
    revalidate: 60 * 5,
  }
}

export default Page
