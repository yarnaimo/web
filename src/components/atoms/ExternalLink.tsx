import styled from '@emotion/styled'
import React, { FC } from 'react'

// type Props = Merge<
//     ComponentProps,
//     {
//         inheritColor?: boolean
//         href: string | null
//     }
// >
type Props = {
    noUnderline?: boolean
    inheritColor?: boolean
    href: string | null
}

const LinkBlock = styled.a<{
    noUnderline: boolean | undefined
    inheritColor: boolean | undefined
}>(({ noUnderline, inheritColor }) => ({
    '&:hover': {
        textDecoration: noUnderline ? 'none' : undefined,
    },
    color: inheritColor ? 'inherit' : undefined,
}))

export const ExternalLink: FC<Props> = ({
    href,
    noUnderline,
    inheritColor,
    ...props
}) => {
    return href ? (
        <LinkBlock
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            noUnderline={noUnderline}
            inheritColor={inheritColor}
            {...props}
        >
            {props.children}
        </LinkBlock>
    ) : (
        <span {...props}>{props.children}</span>
    )
}
