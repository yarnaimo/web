import React, { FC } from 'react'
import { Fab, FabProps, ThemeProvider } from 'rmwc'
import { color, shadows } from '../../services/view/color'
import { css } from '../../services/view/css'

type Props = FabProps & {
    background?: string
    // text?: string
    onClick: () => void
}

export const FixedFab: FC<Props> = ({ background, ...rest }) => {
    return (
        <div
            css={{
                // position: 'fixed',
                zIndex: 4,
                // bottom: 32,
                // right: 32,
                // [css.responsive.isMobile]: {
                //     bottom: 16,
                //     right: 16,
                // },
            }}
        >
            <ThemeProvider
                options={{
                    secondary: background!,
                }}
            >
                <Fab
                    type="button"
                    {...rest}
                    css={{
                        boxShadow: css.important(
                            shadows.card(color.wblack(0.1)),
                        ),
                    }}
                ></Fab>
            </ThemeProvider>
            {/* <IconButton
                {...rest}
                css={{
                    padding: 14,
                    borderRadius: '50%',
                    boxShadow: cardShadow(color.wblack(0.1)),

                    background,
                    color: color.white(),
                    '&:before, &:after': {
                        background: color.white(),
                    },
                }}
            ></IconButton> */}
        </div>
    )
}
