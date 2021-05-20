import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'
// import '../styles/style.scss'
import { webConfig } from '../app/webConfig'
import { BottomTabs, SideTabs } from '../components/app/NavTabs'
import { StyleProvider } from '../components/system/StyleProvider'
import { fontHref } from '../utils/url'

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
        <link
          href={fontHref('Nunito+Sans:wght@400;600;700;800')}
          rel="stylesheet"
        ></link>
      </Head>

      <StyleProvider>
        <BottomTabs></BottomTabs>
        <SideTabs></SideTabs>
        {/* <PageTransition> */}
        <Component {...pageProps} />
        {/* </PageTransition> */}
      </StyleProvider>
    </>
  )
}

export default App
