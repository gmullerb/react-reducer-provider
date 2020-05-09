// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerData } from './ReducerProvider'

export function useReducerState(name) {
  // Must `useContext` since it provides React triggering mechanism, using `captureReducerData(name).state` won't work.
  return React.useContext(captureReducerData(name))[0]
}
