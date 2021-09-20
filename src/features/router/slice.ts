import type { RootState } from 'features/app/store'
import { createSelector } from 'reselect'
import { routerActions } from 'connected-react-router'

const selectRouterState = ({ router }: RootState) => router

const selectRouterAction = createSelector(selectRouterState, ({ action }) => action)
const selectRouterLocation = createSelector(selectRouterState, ({ location }) => location)
const selectSearch = createSelector(selectRouterLocation, ({ search }) => search)
const selectSearchParams = createSelector(selectSearch, (search) => new URLSearchParams(search))
const selectGameNameParam = createSelector(selectSearchParams, (params) => params.get('game'))

const selectors = {
  selectRouterState,
  selectRouterAction,
  selectRouterLocation,
  selectSearch,
  selectSearchParams,
  selectGameNameParam,
}

export { routerActions as actions, selectors }
