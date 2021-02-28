// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { captureProvider } from './Providers'

export function useTaggedAnyDispatcher(tag, id) {
  // No validation is made for id existence, the tag or the type of Provider, so keep track of yours Providers ids and tags
  return React.useContext(captureProvider(id)).get(tag)[1]
}
