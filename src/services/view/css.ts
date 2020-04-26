import { CSSObject } from '@emotion/css'
import { Properties } from 'csstype'
import { MediaQueryObject } from 'use-media/lib/types'
import { queryObjectToString } from 'use-media/lib/utilities'
import { is } from '../../services/core/types'

const qs = (query: string | MediaQueryObject) =>
    `@media ${queryObjectToString(query)}`

const responsive = {
    isMobile: qs({ maxWidth: 767 }), //839
    isNarrow: qs({ maxWidth: 599 }),
}

const elevation = (n: number) => `mdc-elevation--z${n}`

const calc = (exp: string) => `calc(${exp})`

const important = <T extends string>(value: T) => `${value}!important` as T

const translate = ({ x = 0, y = 0 }: { x?: number; y?: number }) =>
    `translate(${x}px, ${y}px)`

const ellipsis: CSSObject = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}

const verticalScrollable: CSSObject = { overflowX: 'auto' }

const size = (width: string | number, height: string | number = width) => ({
    width,
    height,
})
const minSize = (minWidth: string | number, minHeight: string | number) => ({
    minWidth,
    minHeight,
})
const maxSize = (maxWidth: string | number, maxHeight: string | number) => ({
    maxWidth,
    maxHeight,
})

const fit: CSSObject = {
    top: 0,
    left: 0,
    ...size('100%', '100%'),
}

const absoluteFit: CSSObject = {
    position: 'absolute',
    ...fit,
}

const fixedFit: CSSObject = {
    position: 'fixed',
    ...fit,
}

const curve = {
    std: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    acc: 'cubic-bezier(0.4, 0.0, 1, 1)',
    dec: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
}

const _sizeMixins = {
    size,
    minSize,
    maxSize,
    absoluteFit,
    fixedFit,
}

const _valueMixins = {
    responsive,
    important,
    elevation,
    calc,
    translate,
    ellipsis,
    verticalScrollable,
    curve,
}

type NumberOrAuto = number | 'auto'
const isNumberOrAuto = (value: any) => is.number(value) || value === 'auto'

const createSpacer = (type: 'margin' | 'padding' | 'border') => {
    const prop = (directionUppercased: string) =>
        `${type}${directionUppercased}`

    const set = (
        targetObj: CSSObject,
        value: NumberOrAuto | undefined,
        directionUppercased: string,
    ) => {
        if (isNumberOrAuto(value)) {
            targetObj[prop(directionUppercased)] = value
        }
    }

    return ({
        x,
        y,
        ...dimensions
    }: {
        x?: NumberOrAuto
        y?: NumberOrAuto
        top?: NumberOrAuto
        right?: NumberOrAuto
        bottom?: NumberOrAuto
        left?: NumberOrAuto
    }) => {
        if (isNumberOrAuto(x)) {
            dimensions.left = dimensions.right = x
        }
        if (isNumberOrAuto(y)) {
            dimensions.top = dimensions.bottom = y
        }

        const { top, right, bottom, left } = dimensions
        const target: CSSObject = {}

        set(target, top, 'Top')
        set(target, right, 'Right')
        set(target, bottom, 'Bottom')
        set(target, left, 'Left')

        return target
    }
}

const margin = createSpacer('margin')
const padding = createSpacer('padding')
const border = createSpacer('border')

const _spaceMixins = {
    margin,
    padding,
    border,
}

export const css = {
    ..._sizeMixins,
    ..._valueMixins,
    ..._spaceMixins,
}

export class Motion {
    hyphenateRegex = /[A-Z]|^ms/g

    join(array: any[]) {
        return array.join(', ')
    }

    processSeconds(seconds: number[]) {
        return this.join(seconds.map((time) => `${time}s`))
    }

    repeat<T>(length: number, array: T[]) {
        return Array(length)
            .fill(null)
            .map((_, i) => array[i % array.length])
    }

    easingType: string[] = []
    properties: string[] = []
    durations: number[] = []
    delays: number[] = []

    add(
        easingType: keyof typeof curve,
        properties: (keyof Properties)[],
        durations: number[] = [0.2],
        delays: number[] = [0],
    ) {
        const { length } = properties
        const clone = new Motion()
        clone.easingType = [
            ...this.easingType,
            ...clone.repeat(length, [curve[easingType]]),
        ]
        clone.properties = [
            ...this.properties,
            ...(properties as string[]).map((styleName: string) =>
                styleName.replace(clone.hyphenateRegex, '-$&').toLowerCase(),
            ),
        ]
        clone.durations = [
            ...this.durations,
            ...clone.repeat(length, durations),
        ]
        clone.delays = [...this.delays, ...clone.repeat(length, delays)]

        return clone
    }

    toCss(): CSSObject {
        const propertyString = this.join(this.properties)
        return {
            transitionTimingFunction: this.join(this.easingType),
            transitionProperty: propertyString,
            transitionDuration: this.processSeconds(this.durations),
            transitionDelay: this.processSeconds(this.delays),
            willChange: propertyString,
        }
    }
}

export const duration = 0.32
export const durationShort = 0.16

export const transition = (
    easingType: keyof typeof curve,
    properties: (keyof Properties)[],
    durations?: number[],
    delays: number[] = [0],
) => {
    const _motion = new Motion()
    return _motion.add(easingType, properties, durations, delays).toCss()
}
