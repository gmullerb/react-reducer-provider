// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

const ReducerProvider = {}

ReducerProvider.contexts = new Map()

const captureReducerContext = function (name) {
  return ReducerProvider.contexts.get(name)
}

const getReducerContext = function (name) {
  return ReducerProvider.contexts.get(name) || ReducerProvider.contexts.set(name, React.createContext(null)).get(name)
}

export {
  captureReducerContext,
  getReducerContext
}
