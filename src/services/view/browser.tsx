export const isPWA = () => {
  if (!process.browser) {
    return false
  }
  return !!(
    (navigator as any).standalone ||
    matchMedia('(display-mode: standalone)').matches
  )
}
