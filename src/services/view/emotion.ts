import shouldForwardProp from '@emotion/is-prop-valid'
import { StyledComponent, StyledOptions } from '@emotion/styled'

export const withProps = <T extends StyledComponent<any, any, any>>(
  Component: T,
  props: T['defaultProps'],
) => {
  Component.defaultProps = props
  return Component
}

export const filterForward: StyledOptions<any> = { shouldForwardProp }
