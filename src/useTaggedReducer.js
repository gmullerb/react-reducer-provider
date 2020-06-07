// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { captureProvider } from './Providers'

export function useTaggedReducer(tag, id) {
  // No validation is made for id existence, the tag or the type of Provider, so keep track of yours Providers ids and tags, and use it based on convention, i.e. Tagged for Tagged
  const context = React.useContext(captureProvider(id))
  return [ context[0].get(tag), context[1].get(tag) ]
}
