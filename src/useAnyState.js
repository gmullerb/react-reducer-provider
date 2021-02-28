// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { captureProvider } from './Providers'

export function useAnyState(id) {
  // Must `useContext` since it provides React triggering mechanism, using `captureProvider(name).state` won't work.
  return React.useContext(captureProvider(id))[0]
}
