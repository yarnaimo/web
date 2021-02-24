const baseUrl = 'https://yarnaimo.microcms.io/api/v1'

const get = async <T>(path: string, queries: string[] = []) => {
  const _path = path.startsWith('/') ? path.slice(1) : path
  const qs = queries.length ? `?${queries.join('&')}` : ''

  const response = await fetch(`${baseUrl}/${_path}${qs}`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY!,
    },
  })
  const json = await response.json()
  return json as T
}

const getAll = async <T extends MCItemBase>(
  path: string,
  queries: string[] = [],
) => {
  const limit = 50
  const orders = '-updatedAt'

  const list: T[] = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await mcapi.get<MCArrayResponse<T>>(path, [
      `limit=${limit}`,
      `offset=${list.length}`,
      `orders=${orders}`,
      ...queries,
    ])
    list.push(...response.contents)

    if (list.length === response.totalCount) {
      return list
    }
  }
}

export const mcapi = { get, getAll }

export type MCItemBase = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type MCArrayResponse<T extends MCItemBase> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
