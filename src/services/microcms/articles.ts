import { Merge } from 'type-fest'
import { isoOf } from '../../utils/date'
import { Category, EntryBase, MCItemBase } from './types'
import { mcapi } from './_api'

// export type ArticleEntry<Body = false> = {
//   type: 'article'
//   date: string
//   data: ArticleData<Body>
// }

export type ArticleEntry = Merge<
  EntryBase,
  {
    source: 'article'
  }
>

export type ArticleData = MCItemBase & {
  title: string
  categories: Category[]
  tags?: string
  body: string
}

const articleToEntry = ({
  createdAt,
  updatedAt,
  tags,
  id,
  title,
  categories,
  body,
}: ArticleData): ArticleEntry => ({
  source: 'article',
  id,
  createdAt: isoOf(createdAt),
  updatedAt: isoOf(updatedAt),
  pinned: false,
  title,
  categories,
  tags: tags?.split(' ') ?? [],
  url: `/articles/${id}`,
  date: isoOf(updatedAt),
  body,
})

export const getArticleEntries = async (category?: Category) => {
  const response = await mcapi.getAll<ArticleData>('/articles', [
    // `fields=id,createdAt,updatedAt,publishedAt,title,tags`,
    ...(category ? [`filters=categories[contains]${category}`] : []),
  ])

  return response.map(articleToEntry)
}

export const getArticle = async (id: string, draftKey: string | undefined) => {
  const response = await mcapi.get<ArticleData | undefined>(
    `/articles/${id}`,
    draftKey ? [`draftKey=${draftKey}`] : [],
  )
  return response && articleToEntry(response)
}
