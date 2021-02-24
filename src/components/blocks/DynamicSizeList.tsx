import styled from '@emotion/styled'
import { FC } from 'react'
import { css } from '../../services/view/css'
import '../../services/view/resizeObserver'
import { Solid } from './Flex'

export const DynamicSizeList: FC<{
  ref?: any
  height: number
  itemCount: number
  itemData: any
  width?: number
  // eslint-disable-next-line @typescript-eslint/no-var-requires
}> = require('react-window').DynamicSizeList

export const EmptySDynamicSizeList = styled(Solid)({
  position: 'fixed',
  ...css.size('100%', '100%'),
  overflowX: css.important('hidden'),
  overflowY: css.important('scroll'),
  justifyContent: 'center',
  alignItems: 'center',
})

export const SDynamicSizeList = EmptySDynamicSizeList.withComponent(
  DynamicSizeList,
)
