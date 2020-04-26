import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'
import React, { FC } from 'react'
import { webConfig } from '../web-config'

const DocumentHead: FC<{}> = ({}) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta
                httpEquiv="Content-Security-Policy"
                content="upgrade-insecure-requests"
            />

            <meta name="application-name" content={webConfig.appName} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta
                name="apple-mobile-web-app-title"
                content={webConfig.appName}
            />
            <meta name="description" content={webConfig.description} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#ffffff" />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />

            <link rel="manifest" href="/manifest.json" />
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
                href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Cabin:400,600&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </Head>
    )
}

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
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

export default MyDocument
