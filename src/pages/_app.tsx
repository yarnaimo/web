import '@rmwc/avatar/avatar.css'
import '@rmwc/circular-progress/circular-progress.css'
import '@rmwc/data-table/data-table.css'
import 'material-components-web/dist/material-components-web.css'
import 'modern-normalize/modern-normalize.css'
import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'
import { NavBar } from '../components/app/NavBar'
import { PageTransition } from '../components/helpers/PageTransition'
import { GlobalStyle } from '../components/styles'
// import '../styles/style.scss'
import { webConfig } from '../web-config'

export const App: AppType = ({ Component, pageProps }) => {
    // useGA()

    return (
        <>
            <Head>
                <title>{webConfig.longAppName}</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
            </Head>

            <GlobalStyle></GlobalStyle>

            <NavBar></NavBar>
            <PageTransition>
                <Component {...pageProps} />
            </PageTransition>
        </>
    )
}

export default App
