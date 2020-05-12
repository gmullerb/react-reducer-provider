// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureProvider } from './Providers'

export function useReducerState(name) {
  // Must `useContext` since it provides React triggering mechanism, using `captureProvider(name).state` won't work.
  return React.useContext(captureProvider(name))[0]
}
