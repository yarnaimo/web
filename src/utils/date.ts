import { day } from '../../lib/dayjs'

export const isoOf = (date: string) => day(date).toISOString()
