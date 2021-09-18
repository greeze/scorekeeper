import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import { Container, CssBaseline } from '@mui/material'
import SimpleKeeper from 'components/SimpleKeeper'
import { useAppTheme } from 'common/hooks/useAppTheme'
import { getRandomString } from 'common/utils/getRandomString'

function App() {
  const theme = useAppTheme()
  const history = useHistory()
  const search = useLocation().search
  const gameName = new URLSearchParams(search).get('game')

  if (!gameName) {
    history.replace({ search: `?game=${getRandomString()}` })
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <SimpleKeeper gameName={gameName.toLowerCase()} />
      </Container>
    </ThemeProvider>
  )
}

export default App
