import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'
import { GetStaticProps } from 'next'
import React, { ReactNode } from 'react'
import { spacing } from '../app/constants'
import { EntryItemList } from '../components/app/EntryItem'
import { SectionHeading } from '../components/common/SectionHeading'
import { MainLayout } from '../components/system/MainLayout'
import { Title } from '../components/system/Title'
import { descSortEntries } from '../services/entry'
import { getArticleEntries } from '../services/microcms/articles'
import { KnownEntry } from '../services/microcms/types'
import { getWorkEntries } from '../services/microcms/works'
import { getQiitaEntries } from '../services/qiita/items'
import { getZennEntries } from '../services/zenn/zenn'

type Props = {
  workEntries: KnownEntry[]
  articleEntries: KnownEntry[]
}

const SkillItem = ({
  primary,
  secondary,
}: {
  primary: ReactNode
  secondary?: ReactNode
}) => {
  return (
    <ListItem sx={{ px: 0, py: 0 }}>
      <ListItemText
        primary={<span style={{ fontWeight: 700 }}>{primary}</span>}
        secondary={secondary}
      />
    </ListItem>
  )
}

const SkillsAccordion = () => {
  return (
    <Box sx={{ mx: -2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRounded></ExpandMoreRounded>}>
          <SectionHeading>{'Skills'}</SectionHeading>
        </AccordionSummary>

        <AccordionDetails>
          <List sx={{ py: 0 }}>
            <SkillItem primary="HTML, CSS, JavaScript" />
            <SkillItem
              primary="TypeScript"
              secondary="Compiler APIを使ったAST操作, コード生成など"
            />
            <SkillItem
              primary="Firebase"
              secondary="Firestore, Cloud Functions, Authentication, Hosting"
            />
            <SkillItem
              primary="React"
              secondary="React Hooks, Material UI, Emotion"
            />
            <SkillItem primary="Next.js" secondary="SSG, ISR" />
            <SkillItem primary="Node.js" secondary="Puppeteer" />
            <SkillItem primary="Jest, React Testing Library" />
            <SkillItem primary="TensorFlow, Keras" />
            <SkillItem
              primary="UIデザイン"
              secondary="Material Design, Figma, Affinity Designer"
            />
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

const Page = ({ workEntries, articleEntries }: Props) => {
  return (
    <MainLayout>
      <Title title={null} path={null}></Title>

      <Stack spacing={spacing.rootS}>
        <Typography variant="h2">{'Dev'}</Typography>

        <Stack component="section" spacing={spacing.sectionItems}>
          <SkillsAccordion></SkillsAccordion>
        </Stack>

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
  const limit = 50

  const [githubWorks, appWorks, articles, qiitas, zenns] = await Promise.all([
    getWorkEntries(false, 'github'),
    getWorkEntries(false, 'app'),
    getArticleEntries('dev'),
    getQiitaEntries(limit),
    getZennEntries(limit),
  ])

  const workEntries = [...githubWorks, ...appWorks]

  const articleEntries = descSortEntries([...articles, ...qiitas, ...zenns])

  return {
    props: { workEntries, articleEntries },
    revalidate: 60 * 5,
  }
}

export default Page
