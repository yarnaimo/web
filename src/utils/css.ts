export const important = (value: string) => `${value}!important`

export const hsl = (h: number, s: number, l: number) => {
  return (a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`
}
