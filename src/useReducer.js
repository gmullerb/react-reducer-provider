// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerData } from './ReducerProvider'

export function useReducer(name) {
  // Must `useContext` since it provides React triggering mechanism,
  // using `const ref = captureReducerData(name); return [ref.state, ref.dispatcher]` won't work.
  return React.useContext(captureReducerData(name))
}
