// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerContext } from './ReducerProvider'

export function useReducer(name) {
  return React.useContext(captureReducerContext(name))
}
