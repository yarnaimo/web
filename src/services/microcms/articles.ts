import { dayjs } from '../core/date'
import { mcapi, MCItemBase } from './_api'

export type ArticleEntry<Body = false> = {
  type: 'article'
  date: string
  data: ArticleData<Body>
}

export type ArticleData<Body = false> = MCItemBase & {
  title: string
  tags?: string
} & (Body extends true ? { body: string } : {})

const toEntry = (data: ArticleData): ArticleEntry => ({
  type: 'article',
  date: dayjs(data.updatedAt).toISOString(),
  data,
})

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

export const getArticle = async (id: string, draftKey: string | undefined) => {
  const response = await mcapi.get<ArticleData<true> | undefined>(
    `/articles/${id}`,
    draftKey ? [`draftKey=${draftKey}`] : [],
  )
  return response
}
