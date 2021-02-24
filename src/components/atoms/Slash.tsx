import React, { FC, memo } from 'react'
import {} from 'rmwc/next'
import { css } from '../../services/view/css'

type Props = {}

export const Slash: FC<Props> = memo(() => {
  return (
    <span
      css={{
        ...css.marginInline(6),
      }}
    >
      {'/'}
    </span>
  )
})
