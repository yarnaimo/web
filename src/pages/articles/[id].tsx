import { Stack, Typography } from '@material-ui/core'
import is from '@sindresorhus/is'
import DOMPurify from 'isomorphic-dompurify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { spacing } from '../../app/constants'
import { MainLayout } from '../../components/system/MainLayout'
import { Title } from '../../components/system/Title'
import { ArticleData, getArticle } from '../../services/microcms/articles'

type Props = ArticleData<true>

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
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const ArticleBody = (article: Props) => {
  const cleanHTML = useMemo(
    () => DOMPurify.sanitize(article.body),
    [article.body],
  )

  return (
    <Stack spacing={spacing.rootS}>
      <Typography variant="h1">{article.title}</Typography>

      <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
    </Stack>
  )
}

const Article = (article: Props) => {
  const router = useRouter()

  return (
    <MainLayout>
      <Title
        title={article.title}
        article
        path={`articles/${article.id}`}
      ></Title>

      {router.isFallback ? <></> : <ArticleBody {...article}></ArticleBody>}
    </MainLayout>
  )
}

export default Article
