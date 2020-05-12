// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureProvider } from './Providers'

export function useReducerDispatcher(name) {
  // Must `useContext` since it provides React triggering mechanism, using `captureProvider(name).dispatcher` won't work,
  // This will cause re-rendering in spite of `dispatcher` doesn't change.
  return React.useContext(captureProvider(name))[1]
}

