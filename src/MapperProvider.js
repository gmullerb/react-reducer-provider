// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { createProvider } from './Providers'

export const createMapperProvider = function (props, createDispatcher) {
  const [ state, reRenderTrigger ] = React.useState(props.initialState)
  const wrappedDispatcher = React.useRef(createDispatcher(reRenderTrigger))

  return createProvider(props.name, props.children, [ state, wrappedDispatcher.current ])
}
