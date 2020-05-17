// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { createProvider } from './Providers'

export const createReducerProvider = function (props, createDispatcher) {
  const [ state, reRenderTrigger ] = React.useState(props.initialState)
  const stateRef = React.useRef(props.initialState)
  const wrappedDispatcher = React.useRef(createDispatcher(stateRef, reRenderTrigger))

  return createProvider(props.children, [ state, wrappedDispatcher.current ], props.name)
}
