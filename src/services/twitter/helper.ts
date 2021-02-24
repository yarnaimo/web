import { webConfig } from '../../web-config'

export const openTweetDialog = (url: string, text: string) => {
  window.open(
    `http://twitter.com/share?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}&related=${webConfig.screenName}`,
    undefined,
    'width=600,height=320',
  )
}

export const twitterUrl = (path: string) => `https://twitter.com/${path}`
