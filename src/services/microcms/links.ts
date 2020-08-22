import { dayjs } from '../core/date'
import { mcapi, MCArrayResponse, MCItemBase } from './_api'

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

export type LinksResponse = MCArrayResponse<LinkData>

const limit = 25
const orders = '-updatedAt'

const _getLinkDataList = async () => {
    const list: LinkData[] = []

    while (true) {
        const response = await mcapi.get<LinksResponse>(
            `/links?limit=${limit}&offset=${list.length}&orders=${orders}`,
        )
        list.push(...response.contents)

        if (list.length === response.totalCount) {
            return list
        }
    }
}

export const getLinkEntries = async () => {
    return (await _getLinkDataList()).map(
        (data): LinkEntry => ({
            type: 'link',
            date: dayjs(data.date ?? data.updatedAt).toISOString(),
            data,
        }),
    )
}

// export const getLinkItems = async function* () {
//     let count = 0

//     while (true) {
//         const response = await mcapi.get<LinksResponse>(
//             `/links?limit=${limit}&offset=${count}&orders=${orders}`,
//         )
//         count = response.contents.length

//         if (count === response.totalCount) {
//             return response.contents
//         } else {
//             yield response.contents
//         }
//     }
// }
