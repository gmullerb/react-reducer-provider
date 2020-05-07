// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerContext } from './ReducerProvider'

export function useReducerState(name) {
  return React.useContext(captureReducerContext(name))[0]
}
