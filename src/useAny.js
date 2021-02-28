// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { captureProvider } from './Providers'

export function useAny(id) {
  // Must `useContext` since it provides React triggering mechanism,
  return React.useContext(captureProvider(id))
}
