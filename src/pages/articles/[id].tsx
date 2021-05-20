import { Divider, Stack, Typography } from '@material-ui/core'
import is from '@sindresorhus/is'
import DOMPurify from 'isomorphic-dompurify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { appPalette, spacing } from '../../app/constants'
import { ColorLight } from '../../components/common/ColorLight'
import { TagList } from '../../components/common/TagList'
import { MainLayout } from '../../components/system/MainLayout'
import { Title } from '../../components/system/Title'
import { useDateString } from '../../hooks/date'
import { ArticleEntry, getArticle } from '../../services/microcms/articles'
import { categoryMap } from '../../services/microcms/types'

type Props = ArticleEntry

export const ArticleBody = ({ title, categories, tags, date, body }: Props) => {
  const dateString = useDateString(date)
  const cleanHTML = useMemo(() => DOMPurify.sanitize(body ?? ''), [body])

  return (
    <Stack spacing={2.5} divider={<Divider></Divider>}>
      <Stack spacing={spacing.sectionItems}>
        <Typography component="h1" variant="h2">
          {title}
        </Typography>

        <Stack direction="row" spacing={2}>
          {categories.map((category, i) => (
            <Typography
              variant="subtitle2"
              sx={{ display: 'flex', alignItems: 'center', transform: 'none' }}
              key={i}
            >
              <ColorLight background={appPalette[category].color}></ColorLight>
              {categoryMap.get(category)}
            </Typography>
          ))}
        </Stack>

        {tags.length > 0 && <TagList tags={tags}></TagList>}

        <Typography variant="caption" color="text.secondary">
          <time dateTime={date}>{dateString}</time>
        </Typography>
      </Stack>

      <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
    </Stack>
  )
}

const Article = (article: Props | undefined) => {
  const router = useRouter()

  if (router.isFallback || !article) {
    return <MainLayout></MainLayout>
  }

  return (
    <MainLayout>
      <Title
        title={article.title}
        article
        path={`articles/${article.id}`}
      ></Title>

      <ArticleBody {...article}></ArticleBody>
    </MainLayout>
  )
}

export default Article

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
  previewData,
}) => {
  const id = params?.['id']
  if (!is.string(id)) {
    return { notFound: true }
  }

  const draftKey = (previewData as any)?.draftKey as string | undefined

  const article = await getArticle(id, draftKey)
  if (!article) {
    return { notFound: true }
  }

  return {
    props: article,
    revalidate: 60 * 5,
  }
}
