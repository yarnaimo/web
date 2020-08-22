const baseUrl = 'https://yarnaimo.microcms.io/api/v1'

const get = async <T>(path: string) => {
    const _path = path.startsWith('/') ? path.slice(1) : path

    const response = await fetch(`${baseUrl}/${_path}`, {
        headers: {
            'X-API-KEY': process.env.X_API_KEY!,
        },
    })
    const json = await response.json()
    return json as T
}

export const mcapi = { get }

export type MCItemBase = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export type MCArrayResponse<T> = {
    contents: T[]
    totalCount: number
    offset: number
    limit: number
}
