// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

const ReducerProvider = {}

ReducerProvider.contexts = new Map()

const captureReducerData = function (name) {
  return ReducerProvider.contexts.get(name)
}

const createReducerData = function (reducerData, name) {
  return ReducerProvider.contexts.get(name) || ReducerProvider.contexts.set(name, reducerData()).get(name)
}

const createReducerProvider = function (props, createDispatcher) {
  const [ state, reRenderTrigger ] = React.useState(props.initialState)
  const stateRef = React.useRef(props.initialState)
  const wrappedDispatcher = React.useRef(createDispatcher(stateRef, reRenderTrigger))

  return React.createElement(
    createReducerData(() => React.createContext(null), props.name).Provider,
    { value: [ state, wrappedDispatcher.current ]},
    props.children
  )
}

export {
  captureReducerData,
  createReducerProvider
}
