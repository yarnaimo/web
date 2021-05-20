import { Merge } from 'type-fest'
import { isoOf } from '../../utils/date'
import { EntryBase, ImageEntity, MCItemBase } from './types'
import { mcapi } from './_api'

// export type WorkEntry = {
//   type: 'work'
//   date: string
//   data: WorkData
// }

export type WorkSource = 'song' | 'github' | 'app'

export const workSourceIs = (workSource: WorkSource) => (entry: WorkEntry) =>
  entry.workSource === workSource

export type WorkData = MCItemBase & {
  pinned: boolean
  title: string
  workSource: [WorkSource]
  tags?: string
  url: string
  date: string
  thumb?: ImageEntity
  body?: string
}

export type WorkEntry = Merge<
  EntryBase,
  {
    source: 'work'
    workSource: WorkSource
  }
>

const c = { song: 'music', github: 'dev', app: 'dev' } as const

export const getWorkEntries = async (
  onlyPinned = false,
  workSource?: WorkSource,
) => {
  const response = await mcapi.getAll<WorkData>('/works', [
    ...(onlyPinned ? ['filters=pinned[equals]true'] : []),
    ...(workSource ? [`filters=workSource[contains]${workSource}`] : []),
  ])

  return response.map(
    ({
      workSource: [workSource],
      tags,
      createdAt,
      updatedAt,
      ...data
    }): WorkEntry => ({
      createdAt: isoOf(createdAt),
      updatedAt: isoOf(updatedAt),
      source: 'work',
      categories: [c[workSource]],
      workSource,
      tags: tags?.split(' ') ?? [],
      ...data,
    }),
  )

  // return response.map(
  //   (data): WorkEntry => ({
  //     type: 'work',
  //     date: data.date,
  //     data,
  //   }),
  // )
}
