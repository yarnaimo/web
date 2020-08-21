import styled from '@emotion/styled'
import { P } from 'lifts'
import { GetStaticProps } from 'next'
import React, { PropsWithChildren } from 'react'
import { MainLayout } from '../components/app/MainLayout'
import { WorkCard } from '../components/app/WorkCard'
import { FIcon } from '../components/atoms/FIcon'
import { Title } from '../components/helpers/Title'
import { dayjs } from '../services/core/date'
import { R } from '../services/core/fp'
import { getRepos, RepoEntry } from '../services/github/repos'
import { getQiitaitems, QiitaItemEntry } from '../services/qiita/items'
import { css } from '../services/view/css'

type Props = { items: (RepoEntry | QiitaItemEntry)[] }

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const repos = await getRepos()
    const qiitaItems = await getQiitaitems()

    const sorted = P(
        [...repos, ...qiitaItems],

        R.sortBy((item) => {
            return item.type === 'repo'
                ? dayjs(item.data.pushed_at)
                : dayjs(item.data.created_at)
        }),
        R.reverse(),
    )

    return {
        props: { items: sorted },
        revalidate: 60 * 30,
        //     process.env.NODE_ENV === 'production' ? 60 * 30 : undefined,
    }
}

const Description = styled.div({
    // display: '-webkit-box',
    // overflow: 'hidden',
    // WebkitBoxOrient: 'vertical',
    // WebkitLineClamp: 3,
})

const MetaWithIcon = ({
    children,
    icon,
}: PropsWithChildren<{ icon: string }>) => (
    <span
        css={{
            display: 'inline-flex',
            alignItems: 'center',
            '&:not(:first-of-type)': { ...css.margin({ left: 12 }) },
        }}
    >
        <FIcon
            icon={icon}
            size={12}
            css={{ transform: 'translateY(0.5px)' }}
        ></FIcon>
        <span css={{ display: 'inline-flex', marginLeft: 5 }}>{children}</span>
    </span>
)

const Activity = ({ items }: Props) => {
    const workItems = items.map((item) => {
        if (item.type === 'repo') {
            const date = dayjs(item.data.pushed_at).format('YYYY/M/D')
            return {
                pinned: false,
                category: 'github' as const,
                title: () => item.data.full_name,
                meta: () => (
                    <>
                        <MetaWithIcon icon="git-commit">{date}</MetaWithIcon>
                        <MetaWithIcon icon="star">
                            {item.data.stargazers_count} stars
                        </MetaWithIcon>
                    </>
                ),
                tags: item.data.topics,
                body: () =>
                    item.data.description && (
                        <Description>{item.data.description}</Description>
                    ),
                imageFilename: undefined,
                url: item.data.html_url,
            }
        } else {
            const date = dayjs(item.data.created_at).format('YYYY/M/D')
            return {
                pinned: false,
                category: 'qiita' as const,
                title: () => item.data.title,
                meta: () => (
                    <>
                        <MetaWithIcon icon="clock">{date}</MetaWithIcon>
                        <MetaWithIcon icon="thumbs-up">
                            {item.data.likes_count} LGTM
                        </MetaWithIcon>
                    </>
                ),
                tags: item.data.tags.map((t) => t.name),
                body: () => <></>,
                imageFilename: undefined,
                url: item.data.url,
            }
        }
    })

    return (
        <MainLayout>
            <Title title={'Activity'} path={'activity'}></Title>

            {workItems.map((item, i) => (
                <WorkCard {...item} key={i}>
                    {item.body()}
                </WorkCard>
            ))}
        </MainLayout>
    )
}

export default Activity
