// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { createProvider } from './Providers'

export const createMapperProvider = function (props, createDispatcher) {
  const [ state, reRenderTrigger ] = React.useState(props.initialState)
  const wrappedDispatcher = React.useRef(createDispatcher(reRenderTrigger))

  return createProvider(props.children, [ state, wrappedDispatcher.current ], props.id)
}
