import { useMemo } from 'react'
import { createTheme, useMediaQuery } from '@mui/material'

export const useAppTheme = () => {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersLightMode ? 'light' : 'light', // TODO: Darkmode toggle button. Stick with 'light' for now.
        },
      }),
    [prefersLightMode],
  )
}
