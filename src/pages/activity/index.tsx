import styled from '@emotion/styled'
import { P } from 'lifts'
import { GetStaticProps } from 'next'
import React, { ComponentProps, PropsWithChildren } from 'react'
import { MainLayout } from '../../components/app/MainLayout'
import { WorkCard } from '../../components/app/WorkCard'
import { FIcon } from '../../components/atoms/FIcon'
import { Container } from '../../components/blocks/Container'
import { Title } from '../../components/helpers/Title'
import { dayjs } from '../../services/core/date'
import { R } from '../../services/core/fp'
import { getRepoEntries, RepoEntry } from '../../services/github/repos'
import {
    ArticleEntry,
    getArticleEntries,
} from '../../services/microcms/articles'
import { getLinkEntries, LinkEntry } from '../../services/microcms/links'
import { getQiitaEntries, QiitaItemEntry } from '../../services/qiita/items'

const formatDate = (date: string) => dayjs(date).format('YYYY/M/D')

type Entry = RepoEntry | QiitaItemEntry | LinkEntry | ArticleEntry

type Props = { entries: Entry[] }

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const entriesList = await Promise.all([
        getRepoEntries(),
        getQiitaEntries(),
        getLinkEntries(),
        getArticleEntries(),
    ])

    const sorted = P(
        R.flatten(entriesList),
        R.sortBy((entry) => entry.date),
        R.reverse(),
    )

    return {
        props: { entries: sorted },
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
            '&:not(:first-of-type)': { marginLeft: 12 },
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

const toWorkCardProps = (entry: Entry): ComponentProps<typeof WorkCard> => {
    switch (entry.type) {
        case 'repo':
            return {
                pinned: false,
                category: 'github' as const,
                title: entry.data.full_name,
                meta: () => (
                    <>
                        <MetaWithIcon icon="git-commit">
                            {formatDate(entry.date)}
                        </MetaWithIcon>
                        <MetaWithIcon icon="star">
                            {entry.data.stargazers_count} stars
                        </MetaWithIcon>
                    </>
                ),
                tags: entry.data.topics,
                imageFilename: undefined,
                url: entry.data.html_url,
                body: () =>
                    entry.data.description && (
                        <Description>{entry.data.description}</Description>
                    ),
            }

        case 'qiita':
            return {
                pinned: false,
                category: 'qiita' as const,
                title: entry.data.title,
                meta: () => (
                    <>
                        <MetaWithIcon icon="clock">
                            {formatDate(entry.date)}
                        </MetaWithIcon>
                        <MetaWithIcon icon="thumbs-up">
                            {entry.data.likes_count} LGTM
                        </MetaWithIcon>
                    </>
                ),
                tags: entry.data.tags.map((t) => t.name),
                imageFilename: undefined,
                url: entry.data.url,
                body: () => null,
            }

        case 'link':
            return {
                pinned: false,
                category: entry.data.type[0],
                title: entry.data.title,
                meta: () => (
                    <>
                        <MetaWithIcon icon="clock">
                            {formatDate(entry.date)}
                        </MetaWithIcon>
                    </>
                ),
                tags: entry.data.tags?.split(' ') ?? [],
                imageFilename: undefined,
                url: entry.data.url,
                body: () => entry.data.body,
            }

        case 'article':
            return {
                pinned: false,
                category: 'article',
                title: entry.data.title,
                meta: () => (
                    <>
                        <MetaWithIcon icon="clock">
                            {formatDate(entry.date)}
                        </MetaWithIcon>
                    </>
                ),
                tags: entry.data.tags?.split(' ') ?? [],
                imageFilename: undefined,
                url: `/activity/${entry.data.id}`,
                body: () => null,
            }
    }
}

const Activity = ({ entries }: Props) => {
    return (
        <MainLayout>
            <Title title={'Activity'} path={'activity'}></Title>

            <Container>
                {entries.map(toWorkCardProps).map((props, i) => (
                    <WorkCard
                        {...props}
                        key={i}
                        initialVisibility={i < 10}
                    ></WorkCard>
                ))}
            </Container>
        </MainLayout>
    )
}

export default Activity
