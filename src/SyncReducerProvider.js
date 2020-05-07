// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import { getReducerContext } from './ReducerProvider'

export function SyncReducerProvider(props) {
  return React.createElement(
    getReducerContext(props.name).Provider,
    { value: React.useReducer(props.reducer, props.initialState) },
    props.children)
}
