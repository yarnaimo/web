import DOMPurify from 'isomorphic-dompurify'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { MainLayout } from '../../components/app/MainLayout'
import { LoadingSpinner } from '../../components/atoms/LoadingSpinner'
import { Container } from '../../components/blocks/Container'
import { Title } from '../../components/helpers/Title'
import { is } from '../../services/core/types'
import { ArticleData, getArticle } from '../../services/microcms/articles'
import { css } from '../../services/view/css'

type Props = ArticleData<true>

export const getStaticProps: GetStaticProps<Props> = async ({
    params,
    preview,
    previewData,
}) => {
    const id = params?.id
    if (!is.string(id)) {
        throw new Error('id is not string')
    }
    const draftKey = previewData?.draftKey as string | undefined

    const article = await getArticle(id, draftKey)
    if (!article) {
        throw new Error('article not found')
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
    const cleanHTML = useMemo(() => DOMPurify.sanitize(article.body), [
        article.body,
    ])

    return (
        <div css={{ ...css.marginBlock(16) }}>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
        </div>
    )
}

const Article = (article: Props) => {
    const router = useRouter()

    return (
        <MainLayout>
            <Title
                title={article.title}
                article
                appName={'yarnaimo/blog'}
                path={`activity/${article.id}`}
            ></Title>

            {router.isFallback ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <Container>
                    <ArticleBody {...article}></ArticleBody>
                </Container>
            )}
        </MainLayout>
    )
}

export default Article
