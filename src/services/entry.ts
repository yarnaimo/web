import { R } from '../../lib/remeda'
import { KnownEntry } from './microcms/types'

export const descSortEntries = R.createPipe(
  R.sortBy<KnownEntry>(({ date }) => date),
  R.reverse(),
)

export const isPinned = (pinned: boolean) => (entry: KnownEntry) =>
  entry.pinned === pinned
