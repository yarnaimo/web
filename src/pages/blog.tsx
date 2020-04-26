import { NextPage } from 'next'
import React from 'react'
import { MainLayout } from '../components/app/MainLayout'
import { FIconC } from '../components/atoms/FIcon'
import { SolidColumn } from '../components/blocks/Flex'
import { Title } from '../components/helpers/Title'
import { css } from '../services/view/css'

type Props = {}

const BlogPage: NextPage<Props> = ({}) => {
    return (
        <MainLayout>
            <Title title={'Blog'} path={'blog'}></Title>

            <SolidColumn ai="center" jc="center" css={{ height: '100%' }}>
                <FIconC icon="truck" size={48}></FIconC>

                <div css={{ ...css.margin({ top: 16 }) }}>準備中</div>
            </SolidColumn>
        </MainLayout>
    )
}

export default BlogPage
