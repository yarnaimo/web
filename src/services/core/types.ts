import is from '@sindresorhus/is'
export { is }
export const as = <T>(value: T) => value

export interface Callable<R> {
    (...args: any[]): R
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

export type NonEmptyString = string & { __opaque__: never }

export declare type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never

export declare type PromiseReturnType<
    F extends (...args: any) => Promise<any>
> = F extends (...args: any) => Promise<infer T> ? T : never

export type SObject = { [key: string]: any }

export type Setter<T> = (value: T) => void
