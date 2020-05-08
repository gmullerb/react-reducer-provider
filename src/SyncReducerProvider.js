// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { getReducerContext } from './ReducerProvider'

export function SyncReducerProvider(props) {
  const [ state, setter ] = React.useState(props.initialState)
  const wrappedDispatcher = React.useCallback((action) => {
    const nextState = props.reducer(state, action)
    setter(nextState)
    return nextState
  }, [ state ])

  return React.createElement(
    getReducerContext(props.name).Provider,
    { value: [ state, wrappedDispatcher ]},
    props.children)
}
