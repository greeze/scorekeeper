import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container, CssBaseline, useMediaQuery } from '@mui/material'

import SimpleKeeper from 'components/SimpleKeeper'

function App() {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersLightMode ? 'light' : 'light', // TODO: Darkmode toggle button. Stick with 'light' for now.
        },
      }),
    [prefersLightMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <SimpleKeeper />
      </Container>
    </ThemeProvider>
  )
}

export default App
