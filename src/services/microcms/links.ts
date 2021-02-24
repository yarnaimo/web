import { dayjs } from '../core/date'
import { mcapi, MCItemBase } from './_api'

export type LinkEntry = {
  type: 'link'
  date: string
  data: LinkData
}

export type LinkType = 'twitter' | 'music'

export type LinkData = MCItemBase & {
  title: string
  type: [LinkType]
  tags?: string
  date?: string
  url: string
  body?: string
}

export const getLinkEntries = async () => {
  const response = await mcapi.getAll<LinkData>('/links')

  return response.map(
    (data): LinkEntry => ({
      type: 'link',
      date: dayjs(data.date ?? data.updatedAt).toISOString(),
      data,
    }),
  )
}
