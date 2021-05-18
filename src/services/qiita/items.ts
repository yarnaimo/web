import { Merge } from 'type-fest'
import { isoOf } from '../../utils/date'
import { EntryBase } from '../microcms/types'

export type QiitaEntry = Merge<
  EntryBase,
  {
    source: 'qiita'
  }
>

interface Article {
  rendered_body: string
  body: string
  coediting: boolean
  comments_count: number
  created_at: string
  group: Group
  id: string
  likes_count: number
  private: boolean
  reactions_count: number
  tags: Tag[]
  title: string
  updated_at: string
  url: string
  user: User
  page_views_count: number
}

interface User {
  description: string
  facebook_id: string
  followees_count: number
  followers_count: number
  github_login_name: string
  id: string
  items_count: number
  linkedin_id: string
  location: string
  name: string
  organization: string
  permanent_id: number
  profile_image_url: string
  team_only: boolean
  twitter_screen_name: string
  website_url: string
}

interface Tag {
  name: string
  versions: string[]
}

interface Group {
  created_at: string
  id: number
  name: string
  private: boolean
  updated_at: string
  url_name: string
}

export const getQiitaEntries = async (limit = 100) => {
  const data = await fetch(
    `https://qiita.com/api/v2/users/yarnaimo/items?per_page=${limit}`,
  )
  const json = (await data.json()) as Article[]

  return json.map(
    ({ created_at, updated_at, tags, id, title, url }): QiitaEntry => ({
      source: 'qiita',
      id,
      createdAt: isoOf(created_at),
      updatedAt: isoOf(updated_at),
      pinned: false,
      title,
      categories: ['dev'],
      tags: tags.map(({ name }) => name),
      url,
      date: isoOf(created_at),

      // rendered_body: data.rendered_body.slice(0, 200),
      // body: data.body.slice(0, 200),
    }),
  )
}
