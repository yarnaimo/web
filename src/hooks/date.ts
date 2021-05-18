import { useMemo } from 'react'
import { day } from '../../lib/dayjs'

export const useDateString = (dateString: string) =>
  useMemo(() => {
    const now = day()
    const date = day(dateString)
    return date.format(date.year() === now.year() ? 'M月D日' : 'YYYY年M月D日')
  }, [dateString])
