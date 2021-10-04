import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { getStore } from 'common/testHelpers/getStore'

type PreloadedAppState = Parameters<typeof getStore>[0]
type RenderedUI = Parameters<typeof render>[0]
type RenderOptions = Parameters<typeof render>[1]

export const renderWrapped = (ui: RenderedUI, preloadedState: PreloadedAppState = {}, options?: RenderOptions) => {
  const store = getStore(preloadedState)
  return { result: render(<Provider store={store}>{ui}</Provider>, options), store }
}
