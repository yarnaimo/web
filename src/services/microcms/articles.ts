import { MCArrayResponse, MCItemBase } from './_api'

export type ArticleItem = MCItemBase & {
    title: string
    tags?: string
    body: string
}

export type ArticlesResponse = MCArrayResponse<ArticleItem>
