// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { captureProvider } from './Providers'

export function useReducer(id) {
  // Must `useContext` since it provides React triggering mechanism,
  // using `const ref = captureProvider(name); return [ref.state, ref.dispatcher]` won't work.
  return React.useContext(captureProvider(id))
}
