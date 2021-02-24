import { ResizeObserver as Polyfill } from '@juggle/resize-observer'

const windowResizeObserver = process.browser
  ? ((window as any).ResizeObserver as typeof Polyfill | undefined)
  : undefined

export const ResizeObserverP = windowResizeObserver || Polyfill

if (process.browser) {
  ;(window as any).ResizeObserver = ResizeObserverP
}
