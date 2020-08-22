import { dayjs } from '../core/date'
import { mcapi, MCItemBase } from './_api'

export type ArticleEntry = {
    type: 'article'
    date: string
    data: ArticleData
}

export type ArticleData = MCItemBase & {
    title: string
    tags?: string
    body?: string
}

export const getArticleEntries = async () => {
    const response = await mcapi.getAll<ArticleData>('/articles', [
        `fields=id,createdAt,updatedAt,publishedAt,title,tags`,
    ])

    return response.map(
        (data): ArticleEntry => ({
            type: 'article',
            date: dayjs(data.updatedAt).toISOString(),
            data,
        }),
    )
}
