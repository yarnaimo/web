import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React, { FC } from 'react'
import { NavBar } from '../components/app/NavBar'
import { PageTransition } from '../components/helpers/PageTransition'
import '../styles/style.scss'
import { webConfig } from '../web-config'

const App: FC<{}> = ({ children }) => {
    return (
        <>
            <NavBar></NavBar>

            <PageTransition>{children}</PageTransition>
        </>
    )
}

export const MyApp: AppType = ({ Component, pageProps }) => {
    // useGA()

    return (
        <>
            <Head>
                <title>{webConfig.longAppName}</title>
            </Head>

            <App>
                <Component {...pageProps} />
            </App>
        </>
    )
}

export default MyApp
