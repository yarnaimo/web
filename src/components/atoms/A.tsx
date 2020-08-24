import styled from '@emotion/styled'

export const A = styled.a<{
    noUnderline?: boolean
    inheritColor?: boolean
}>(({ noUnderline, inheritColor }) => ({
    '&:hover': {
        textDecoration: noUnderline ? 'none' : undefined,
    },
    color: inheritColor ? 'inherit' : undefined,
}))

export const ABlank = styled(A)()
ABlank.defaultProps = { target: '_blank', rel: 'noopener noreferrer' }
