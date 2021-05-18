import { Merge } from 'type-fest'
import { isoOf } from '../../utils/date'
import { EntryBase } from '../microcms/types'

interface RootObject {
  articles: Article[]
  next_page?: unknown
}

export type ZennEntry = Merge<
  EntryBase,
  {
    source: 'zenn'
  }
>

interface Article {
  id: number
  title: string
  slug: string
  published: boolean
  comments_count: number
  liked_count: number
  body_letters_count: number
  reading_time: number
  article_type: string
  emoji: string
  is_suspending_private: boolean
  published_at: string
  body_updated_at: string
  source_repo_updated_at?: any
  created_at: string
  updated_at: string
  user: User
  topics: Topic[]
}

interface Topic {
  id: number
  name: string
  display_name: string
  taggings_count: number
  image_url: string
}

interface User {
  id: number
  username: string
  name: string
  avatar_small_url: string
}

export const getZennEntries = async (limit = 100) => {
  const data = await fetch(
    `https://zenn.dev/api/articles?username=yarnaimo&count=${limit}&order=latest`,
  )
  const { articles } = (await data.json()) as RootObject

  return articles.map(
    ({ created_at, updated_at, topics, id, title, slug }): ZennEntry => ({
      source: 'zenn',
      id: id.toString(),
      createdAt: isoOf(created_at),
      updatedAt: isoOf(updated_at),
      pinned: false,
      title,
      categories: ['dev'],
      tags: topics.map(({ name }) => name),
      url: `https://zenn.dev/yarnaimo/articles/${slug}`,
      date: isoOf(created_at),
    }),
  )
}
