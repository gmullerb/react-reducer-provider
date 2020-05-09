// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerData } from './ReducerProvider'

export function useReducerDispatcher(name) {
  // Must `useContext` since it provides React triggering mechanism, using `captureReducerData(name).dispatcher` won't work,
  // This will cause re-rendering in spite of `dispatcher` doesn't change.
  return React.useContext(captureReducerData(name))[1]
}

