import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { css } from '../../services/view/css'

export type TransitionState =
    | 'init'
    | 'enter'
    | 'entering'
    | 'entered'
    | 'exit'
    | 'exiting'
    | 'exited'

export const transitionContainerStyle = (() => {
    const enter = {
        opacity: 0,
    }
    const enterActive = {
        opacity: 1,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    }
    const exit = {
        opacity: 1,
    }
    const exitActive = {
        opacity: 0,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    }

    return {
        init: [],
        enter: [enter],
        entering: [enter, enterActive],
        entered: [],
        exit: [exit],
        exiting: [exit, exitActive],
        exited: [],
    }
})()

export const TransitionChild = styled('div')<{ state: TransitionState }>(
    { ...css.absoluteFit },
    ({ state }) => transitionContainerStyle[state],
)

export const useTransitionState = () => {
    const [state, setState] = useState<TransitionState>('init')
    return { state, setState, style: transitionContainerStyle[state] }
}

export type Props = {}

export const PageTransition: FC<Props> = ({ children }) => {
    const router = useRouter()

    // https://github.com/illinois/next-page-transitions/blob/master/src/PageTransition.js
    const originalScrollTo = useRef<typeof window.scrollTo>()
    const [disableScrolling, setDisableScrolling] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Forgive me for what I'm about to do
            originalScrollTo.current = window.scrollTo
            window.scrollTo = (...args: any) => {
                if (disableScrolling) {
                    return
                }
                originalScrollTo.current!.apply(window, args)
            }
        }

        return () => {
            if (originalScrollTo.current && typeof window !== 'undefined') {
                window.scrollTo = originalScrollTo.current
            }
        }
    }, [])

    return (
        <TransitionGroup css={{ position: 'relative' }}>
            <Transition key={router.route} timeout={200}>
                {(state) => (
                    <TransitionChild state={state as TransitionState}>
                        {children}
                    </TransitionChild>
                )}
            </Transition>
        </TransitionGroup>
    )
}
