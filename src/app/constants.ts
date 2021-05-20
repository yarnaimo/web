import { hsl } from '../utils/css'

export const appPalette = {
  music: { background: hsl(346, 83, 97)(), color: hsl(346, 97, 62)() },
  app: { background: hsl(40, 97, 95)(), color: hsl(40, 97, 53)() },
  other: { background: hsl(169, 70, 95)(), color: hsl(169, 70, 53)() },

  twitter: { background: hsl(204, 77, 96)(), color: hsl(204, 88, 53)() },
  github: { background: hsl(0, 0, 96)(), color: hsl(0, 0, 10)() },
  qiita: { background: hsl(94, 61, 94)(), color: hsl(94, 100, 39)() },
  zenn: { background: hsl(207, 83, 96)(), color: hsl(207, 100, 62)() },
}

export const appDimension = {
  navBar: {
    bottom: '56px!important',
    side: '128px!important',
  },
}

export const profileUrl = {
  twitter: 'https://twitter.com/yarnaimo',
  github: 'https://github.com/yarnaimo',
  qiita: 'https://qiita.com/yarnaimo',
  zenn: 'https://zenn.dev/yarnaimo',
}
