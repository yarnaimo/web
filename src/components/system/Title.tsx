import Head from 'next/head'
import React, { FC } from 'react'
import { webConfig } from '../../app/webConfig'

type Props = {
  title: string | null
  appName?: string
  article?: boolean
  description?: string
  path: string | null
  thumbUrl?: string
}

export const Title: FC<Props> = ({
  title,
  appName,
  article,
  description = webConfig.description,
  path,
  thumbUrl = `${webConfig.origin}/assets/icons/manifest-icon-512.png`,
}) => {
  const url = path ? `${webConfig.origin}/${path}` : webConfig.origin

  const fullTitle = title
    ? `${title} - ${appName ?? webConfig.appName}`
    : webConfig.longAppName

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:image" content={thumbUrl} />
      <meta property="og:site_name" content={webConfig.appName} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${webConfig.screenName}`} />
      <meta name="twitter:creator" content={`@${webConfig.screenName}`} />
    </Head>
  )
}
