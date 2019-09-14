// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, { useReducer } from 'react'

export default function ReducerContext(props) {
  return React.createElement(
    props.context.Provider,
    { value: useReducer(props.reducer, props.initialState) },
    props.children)
}
