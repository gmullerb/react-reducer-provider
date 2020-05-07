// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { captureReducerContext } from './ReducerProvider'

export function useReducerDispatcher(name) {
  return React.useContext(captureReducerContext(name))[1]
}

