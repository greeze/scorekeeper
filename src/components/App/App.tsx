import React, { useEffect } from 'react'
import { CircularProgress, Container, CssBaseline, ThemeProvider } from '@mui/material'

import { useAppDispatch, useAppSelector, useAppTheme } from 'common/hooks'
import { getRandomString } from 'common/utils'
import { selectors as gameSelectors, useActions as useGameActions } from 'features/game'
import { selectors as routerSelectors, useActions as useRouterActions } from 'features/router'
import Realtime from 'components/Realtime'
import SimpleKeeper from 'components/SimpleKeeper'

function App() {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const routerActions = useRouterActions(dispatch)
  const gameActions = useGameActions(dispatch)
  const gameName = useAppSelector(gameSelectors.selectName)
  const gameNameParam = useAppSelector(routerSelectors.selectGameNameParam)

  useEffect(() => {
    if (gameNameParam) {
      gameActions.changeName(gameNameParam)
    } else {
      routerActions.replace({ search: `?game=${getRandomString()}` })
    }
  }, [gameActions, gameNameParam, routerActions])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Realtime />
      <Container>{gameName ? <SimpleKeeper /> : <CircularProgress />}</Container>
    </ThemeProvider>
  )
}

export default App
