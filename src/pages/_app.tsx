import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'
// import '../styles/style.scss'
import { webConfig } from '../app/webConfig'
import { BottomTabs, SideTabs } from '../components/app/NavTabs'
import { StyleProvider } from '../components/system/StyleProvider'

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
