import { Stack, Typography } from '@material-ui/core'
import { GetStaticProps } from 'next'
import React from 'react'
import { spacing } from '../app/constants'
import { EntryItemList } from '../components/app/EntryItem'
import { SectionHeading } from '../components/common/SectionHeading'
import { MainLayout } from '../components/system/MainLayout'
import { Title } from '../components/system/Title'
import { descSortEntries } from '../services/entry'
import { getArticleEntries } from '../services/microcms/articles'
import { KnownEntry } from '../services/microcms/types'
import { getWorkEntries } from '../services/microcms/works'

type Props = {
  workEntries: KnownEntry[]
  articleEntries: KnownEntry[]
}

const Page = ({ workEntries, articleEntries }: Props) => {
  return (
    <MainLayout>
      <Title title={null} path={null}></Title>

      <Stack spacing={spacing.rootS}>
        <Typography variant="h2">{'Music'}</Typography>

        <Stack component="section" spacing={spacing.sectionItems}>
          <SectionHeading>{'Works'}</SectionHeading>
          <EntryItemList entries={workEntries}></EntryItemList>
        </Stack>

        <Stack component="section" spacing={spacing.sectionItems}>
          <SectionHeading>{'Articles'}</SectionHeading>
          <EntryItemList entries={articleEntries}></EntryItemList>
        </Stack>
      </Stack>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [workEntries, articles] = await Promise.all([
    getWorkEntries(false, 'song'),
    getArticleEntries('music'),
  ])

  const articleEntries = descSortEntries(articles)

  return {
    props: { workEntries, articleEntries },
    revalidate: 60 * 5,
  }
}

export default Page
