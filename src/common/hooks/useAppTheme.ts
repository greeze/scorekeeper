import { useMemo } from 'react'
import { createTheme, useMediaQuery } from '@mui/material'

export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light', // TODO: Darkmode toggle button. Stick with 'light' for now.
        },
      }),
    [prefersDarkMode],
  )
}
