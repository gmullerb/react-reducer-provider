// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { getReducerContext } from './ReducerProvider'

export function AsyncReducerProvider(props) {
  const [ state, setter ] = React.useState(props.initialState)
  const wrappedDispatcher = React.useCallback(async (action) => {
    setter(await props.reducer(state, action))
  })

  return React.createElement(
    getReducerContext(props.name).Provider,
    { value:  [ state, wrappedDispatcher ]},
    props.children)
}
