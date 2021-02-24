import styled from '@emotion/styled'
import React, { FC } from 'react'
import { css } from '../../services/view/css'
import { FIconWithText } from '../atoms/FIcon'

export const UnorderedList = styled('ul')({
  ...css.padding({ left: 0 }),
  margin: '0.75em 0',
})

const IListItemBlock = styled('li')({
  listStyleType: 'none',
  lineHeight: 1.5,
  marginTop: 1,
  marginBottom: 1,
})

type IListItemProps = {
  icon?: string
  large?: boolean
  background?: string
  foreground?: string
}

export const IListItem: FC<IListItemProps> = ({ icon = 'flag', ...props }) => {
  return (
    <IListItemBlock>
      <FIconWithText {...{ icon }} {...props}></FIconWithText>
    </IListItemBlock>
  )
}
