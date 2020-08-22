import styled from '@emotion/styled'
import { P } from 'lifts'
import { GetStaticProps } from 'next'
import React, { ComponentProps, PropsWithChildren } from 'react'
import { MainLayout } from '../components/app/MainLayout'
import { WorkCard } from '../components/app/WorkCard'
import { FIcon } from '../components/atoms/FIcon'
import { Container } from '../components/blocks/Container'
import { Title } from '../components/helpers/Title'
import { dayjs } from '../services/core/date'
import { R } from '../services/core/fp'
import { getRepoEntries, RepoEntry } from '../services/github/repos'
import { getLinkEntries, LinkEntry } from '../services/microcms/links'
import { getQiitaEntries, QiitaItemEntry } from '../services/qiita/items'
import { css } from '../services/view/css'

const formatDate = (date: string) => dayjs(date).format('YYYY/M/D')

type Entry = RepoEntry | QiitaItemEntry | LinkEntry

type Props = { entries: Entry[] }

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const [repos, qiitaItems, links] = await Promise.all([
        getRepoEntries(),
        getQiitaEntries(),
        getLinkEntries(),
    ])

    const sorted = P(
        [...repos, ...qiitaItems, ...links],

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

const RepoCard = ({ date, data }: RepoEntry) => {
    const props: ComponentProps<typeof WorkCard> = {
        pinned: false,
        category: 'github' as const,
        title: () => data.full_name,
        meta: () => (
            <>
                <MetaWithIcon icon="git-commit">
                    {formatDate(date)}
                </MetaWithIcon>
                <MetaWithIcon icon="star">
                    {data.stargazers_count} stars
                </MetaWithIcon>
            </>
        ),
        tags: data.topics,
        imageFilename: undefined,
        url: data.html_url,
    }

    return (
        <WorkCard {...props}>
            {data.description && <Description>{data.description}</Description>}
        </WorkCard>
    )
}

const QiitaItemCard = ({ date, data }: QiitaItemEntry) => {
    const props: ComponentProps<typeof WorkCard> = {
        pinned: false,
        category: 'qiita' as const,
        title: () => data.title,
        meta: () => (
            <>
                <MetaWithIcon icon="clock">{formatDate(date)}</MetaWithIcon>
                <MetaWithIcon icon="thumbs-up">
                    {data.likes_count} LGTM
                </MetaWithIcon>
            </>
        ),
        tags: data.tags.map((t) => t.name),
        imageFilename: undefined,
        url: data.url,
    }

    return <WorkCard {...props}></WorkCard>
}

const LinkCard = ({ date, data }: LinkEntry) => {
    const props: ComponentProps<typeof WorkCard> = {
        pinned: false,
        category: data.type[0],
        title: () => data.title,
        meta: () => (
            <>
                <MetaWithIcon icon="clock">{formatDate(date)}</MetaWithIcon>
            </>
        ),
        tags: data.tags?.split(' ') ?? [],
        imageFilename: undefined,
        url: data.url,
    }

    return <WorkCard {...props}>{data.body}</WorkCard>
}

const EntryCard = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'repo':
            return <RepoCard {...entry}></RepoCard>
        case 'qiita':
            return <QiitaItemCard {...entry}></QiitaItemCard>
        case 'link':
            return <LinkCard {...entry}></LinkCard>
    }
}

const Activity = ({ entries }: Props) => {
    return (
        <MainLayout>
            <Title title={'Activity'} path={'activity'}></Title>

            <Container>
                {entries.map((entry, i) => (
                    <EntryCard entry={entry} key={i}></EntryCard>
                ))}
            </Container>
        </MainLayout>
    )
}

export default Activity
