import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { MainLayout } from '../components/app/MainLayout'
import { WorkCard, WorkCardProps } from '../components/app/WorkCard'
import { Title } from '../components/helpers/Title'

const workItems: (WorkCardProps & { body: () => ReactNode })[] = [
    {
        pinned: true,
        category: 'web',
        title: () => 'ポートフォリオ',
        date: '2020/4',
        tags: ['TypeScript', 'React', 'Next.js', 'Now'],
        body: () => (
            <p>
                このサイトです。パララックスはJSを使わずCSSのみで実装しました。
            </p>
        ),
    },
    {
        pinned: true,
        category: 'web',
        url: 'https://piccs.app',
        title: () => 'Piccs',
        date: '2020/4',
        tags: [
            'PWA',
            'Firebase',
            'TypeScript',
            'React',
            'Next.js',
            'TensorFlow',
            'Stripe',
        ],
        imageUrl: 'a',
        body: () => (
            <p>
                声優・アニメ・アーティストなどの情報を逃さずチェックできるWebアプリです。
                キーワードを登録すると、ニュース・イベント・番組情報などの公式ツイートを機械学習でピックアップして表示します。
            </p>
        ),
    },
    {
        pinned: true,
        category: 'github',
        url: 'https://github.com/vanilla-clipper',
        title: () => 'Vanilla Clipper',
        tags: ['TypeScript', 'Node.js', 'Puppeteer'],
        date: '2019/2',
        body: () => (
            <p>
                Webページをそのままの状態でアーカイブするツールです。{' '}
                <small>(130 Stars)</small>
            </p>
        ),
    },
    {
        pinned: false,
        category: 'github',
        url: 'https://github.com/agrec',
        title: () => 'agrec',
        tags: ['TypeScript', 'Node.js', 'Slack'],
        date: '2020/3',
        body: () => (
            <p>
                Node.jsでagqrの番組を録画してGoogleドライブにアップロードするツールです。放送前などのSlack通知にも対応しています。
            </p>
        ),
    },
    {
        pinned: false,
        category: 'web',
        url: 'https://reinainfo-next.web.app',
        title: () => 'ReinaInfo Next',
        tags: [
            'PWA',
            'Firebase',
            'TypeScript',
            'React',
            'Next.js',
            'TensorFlow',
        ],
        date: '2019/11',
        imageUrl: 'a',
        body: () => (
            <p>
                上田麗奈さん非公式infoのv2です。機械学習を使った自動リツイートや、スケジュール・チケットなどのお知らせツイートを行い、サイトではそれらを一覧表示しています。スケジュールのOGP画像はPuppeteerで自動生成しています。
            </p>
        ),
    },
    {
        pinned: false,
        category: 'github',
        url: 'https://github.com/sodafloat',
        title: () => 'Sodafloat',
        tags: ['Firebase', 'TypeScript', 'React', 'Next.js'],
        date: '2019/11',
        body: () => (
            <p>
                TwitterとRSSの情報を一括でチェック{' & '}
                既読管理できるツールです。各自でFirebaseにデプロイする形になっています。
            </p>
        ),
    },
    {
        pinned: false,
        category: 'music',
        url: 'https://www.nicovideo.jp/watch/sm35196109',
        title: () => (
            <span css={{ fontSize: 14 }}>
                駆け抜けるメドレーコラボレーションFINAL Classic
            </span>
        ),
        tags: [],
        date: '2019/6',
        body: () => <p>26:18～ の最終パートで参加しました。 (制作は2017年)</p>,
    },
    {
        pinned: false,
        category: 'web',
        url: 'https://photohook-app.firebaseapp.com',
        title: () => 'PhotoHook',
        tags: ['Firebase', 'TypeScript', 'React'],
        date: '2019/3',
        imageUrl: 'a',
        body: () => (
            <p>
                Webページ上の画像をGoogleフォトに一括アップロードするツールです。
            </p>
        ),
    },
]

type Props = {}

const WorksPage: NextPage<Props> = ({}) => {
    return (
        <MainLayout>
            <Title title={'Works'} path={'works'}></Title>

            {workItems.map(({ body, ...item }, i) => (
                <WorkCard {...item} key={i}>
                    {body()}
                </WorkCard>
            ))}
        </MainLayout>
    )
}

export default WorksPage
