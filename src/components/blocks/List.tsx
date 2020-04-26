import styled from '@emotion/styled'
import { FC } from 'react'
import { css } from '../../services/view/css'
import { FIconC } from '../atoms/FIcon'

export const UnorderedList = styled('ul')({
    ...css.padding({ left: 0 }),
    margin: '0.75em 0',
})

const IListItemBlock = styled('li')<{ large?: boolean }>(
    {
        position: 'relative',
        ...css.padding({ left: 44 }),

        listStyleType: 'none',
    },
    ({ large }) => ({ ...css.margin({ y: large ? 6 : 4 }) }),
)

type IListItemProps = {
    icon?: string
    large?: boolean
    background?: string
    foreground?: string
}

export const IListItem: FC<IListItemProps> = ({
    icon = 'chevron-right',
    large,
    background,
    foreground,
    children,
    ...props
}) => {
    return (
        <IListItemBlock large={large} {...props}>
            <FIconC
                {...{
                    icon,
                    size: large ? 24 : 18,
                    background,
                    foreground,
                }}
                css={{
                    position: 'absolute',
                    top: '50%',
                    left: 14,
                    transform: 'translate(-50%, -50%)',
                }}
            ></FIconC>

            <span>{children}</span>
        </IListItemBlock>
    )
}
