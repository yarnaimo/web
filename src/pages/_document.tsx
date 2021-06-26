import { extractCritical } from '@emotion/server'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React, { FC } from 'react'
import { webConfig } from '../app/webConfig'

const DocumentHead: FC<{}> = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />

      <meta name="application-name" content={webConfig.appName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={webConfig.appName} />
      <meta name="description" content={webConfig.description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />

      {/* <link rel="manifest" href="/manifest.json" /> */}
      {/* <link rel="shortcut icon" href="/assets/icons/favicon.ico" /> */}

      <link
        rel="icon"
        type="image/png"
        sizes="196x196"
        href="/assets/icons/favicon-196.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/icons/apple-icon-180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/assets/icons/apple-icon-167.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/assets/icons/apple-icon-152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/assets/icons/apple-icon-120.png"
      />

      <link
        href={
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=block'
        }
        rel="stylesheet"
      ></link>
      <link
        href={
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@800&text=@yarnaimo&display=block'
        }
        rel="stylesheet"
      ></link>
    </Head>
  )
}

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="ja">
        <DocumentHead></DocumentHead>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
