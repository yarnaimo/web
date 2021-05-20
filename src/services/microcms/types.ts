import { QiitaEntry } from '../qiita/items'
import { ZennEntry } from '../zenn/zenn'
import { ArticleEntry } from './articles'
import { WorkEntry } from './works'

export const categoryMap = new Map([
  ['music', 'Music'],
  ['dev', 'Development'],
  ['other', 'Other'],
] as const)

export const categoryIds = [...categoryMap.keys()]

export type Category = typeof categoryIds[number]

export const hasCategory =
  (category: Category) =>
  ({ categories }: EntryBase) =>
    categories.includes(category)

export type ImageEntity = {
  url: string
  width: number
  height: number
}

export type MCItemBase = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
export type EntryMeta = {
  id: string
  createdAt: string
  updatedAt: string
}

export type MCArrayResponse<T extends MCItemBase> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export type EntryBase = EntryMeta & {
  pinned: boolean
  title: string
  categories: Category[]
  tags: string[]
  url: string
  date: string
  thumb?: ImageEntity
  body?: string
}

export type KnownEntry = WorkEntry | ArticleEntry | QiitaEntry | ZennEntry
