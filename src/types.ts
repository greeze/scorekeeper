import type { TailwindColorConfig } from 'tailwindcss/tailwind-config'

export type TailwindColorName = keyof TailwindColorConfig
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element
