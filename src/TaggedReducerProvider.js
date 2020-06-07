// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { createProvider } from './Providers'

export const createTaggedReducerProvider = function (props, createDispatcher) {
  const [ states, setStates ] = React.useState(() => new Map(props.reducers.map(reducer => [ reducer[0], reducer[2] ])))
  const statesRef = React.useRef(states)
  const dispatchers = React.useMemo(
    () => new Map(props.reducers.map(reducer => [ reducer[0], createDispatcher(statesRef, setStates, reducer[0], reducer[1]) ])),
    [ props.reducers ]
  )
  return createProvider(props.children, [ states, dispatchers ], props.id)
}
