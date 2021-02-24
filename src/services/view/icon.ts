import { color } from './color'

export const iconPropMap = {
  twitter: {
    icon: 'twitter',
    background: color.sky(1),
    foreground: color.white(),
  },
  github: {
    icon: 'github',
    background: color.black(0.525),
    foreground: color.white(),
  },
  qiita: {
    icon: 'edit',
    background: color.lightGreen(),
    foreground: color.white(),
  },
  web: {
    icon: 'globe',
    background: color.orange(),
    foreground: color.white(),
  },
  music: {
    icon: 'music',
    background: color.pinkv(0.8),
    foreground: color.white(),
  },
  article: {
    icon: 'edit-3',
    background: color.brown(),
    foreground: color.white(),
  },
}
