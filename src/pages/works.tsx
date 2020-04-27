import { NextPage } from 'next'
import React, { ReactNode } from 'react'
import { MainLayout } from '../components/app/MainLayout'
import { WorkCard, WorkCardProps } from '../components/app/WorkCard'
import { Title } from '../components/helpers/Title'

const workItems: (WorkCardProps & { body: () => ReactNode })[] = [
    {
        title: () => 'ポートフォリオ',
        pinned: true,
        category: 'web',
        date: '2020/4',
        tags: ['TypeScript', 'React', 'Next.js', 'Vercel (Now)'],
        body: () => (
            <p>
                このサイトです。マテリアルデザインをベースに丸みを持たせたデザインにしました。トップページのパララックスはJSを使わずCSSのみで実装しています。
            </p>
        ),
    },
    {
        title: () => 'Piccs',
        pinned: true,
        category: 'web',
        url: 'https://piccs.app',
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
        imageFilename: 'thumb-piccs.png',
        body: () => (
            <p>
                声優・アニメ・アーティストなどの情報を逃さずチェックできるWebアプリです。
                キーワードを登録すると、ニュース・イベント・番組情報などの公式ツイートを機械学習でピックアップして表示します。
            </p>
        ),
    },
    {
        title: () => 'Vanilla Clipper',
        pinned: true,
        category: 'github',
        url: 'https://github.com/yarnaimo/vanilla-clipper',
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
        title: () => 'agrec',
        pinned: false,
        category: 'github',
        url: 'https://github.com/yarnaimo/agrec',
        tags: ['TypeScript', 'Node.js', 'Slack'],
        date: '2020/3',
        body: () => (
            <p>
                Node.jsでagqrの番組を録画してGoogleドライブにアップロードするツールです。放送前などのSlack通知にも対応しています。
            </p>
        ),
    },
    {
        title: () => 'ReinaInfo Next',
        pinned: false,
        category: 'web',
        url: 'https://reinainfo-next.web.app',
        tags: [
            'PWA',
            'Firebase',
            'TypeScript',
            'React',
            'Next.js',
            'TensorFlow',
        ],
        date: '2019/11',
        imageFilename: 'thumb-reinainfo-next.png',
        body: () => (
            <p>
                上田麗奈さん非公式infoのv2です。機械学習を使った自動リツイートや、スケジュール・チケットなどのお知らせツイートを行い、サイトではそれらを一覧表示しています。スケジュールのOGP画像はPuppeteerで自動生成しています。
            </p>
        ),
    },
    {
        title: () => 'Sodafloat',
        pinned: false,
        category: 'github',
        url: 'https://github.com/yarnaimo/sodafloat',
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
        title: () => (
            <span css={{ fontSize: 14 }}>
                駆け抜けるメドレーコラボレーションFINAL Classic
            </span>
        ),
        pinned: false,
        category: 'music',
        url: 'https://www.nicovideo.jp/watch/sm35196109',
        tags: [],
        date: '2019/6',
        body: () => <p>26:18～ の最終パートで参加しました。 (制作は2017年)</p>,
    },
    {
        title: () => 'PhotoHook',
        pinned: false,
        category: 'web',
        url: 'https://photohook-app.firebaseapp.com',
        tags: ['Firebase', 'TypeScript', 'React'],
        date: '2019/3',
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
