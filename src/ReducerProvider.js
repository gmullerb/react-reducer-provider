// Copyright (c) 2019 Gonzalo Müller Bravo.
const React = require('react')

const ReducerProvider = {}

ReducerProvider.contexts = new Map()

ReducerProvider.getReducerContext = function (name) {
  return ReducerProvider.contexts.get(name) || ReducerProvider.contexts.set(name, React.createContext(null)).get(name)
}

function SyncReducerProvider(props) {
  return React.createElement(
    ReducerProvider.getReducerContext(props.name).Provider,
    { value: React.useReducer(props.reducer, props.initialState) },
    props.children)
}

module.exports = {
  SyncReducerProvider,
  AsyncReducerProvider(props) {
    const [state, setter] = React.useState(props.initialState)
    const wrappedDispatcher = React.useCallback(async (action) => {
      setter(await props.reducer(state, action))
    })

    return React.createElement(
      ReducerProvider.getReducerContext(props.name).Provider,
      { value:  [state, wrappedDispatcher]},
      props.children)
  },
  useReducer(name) {
    return React.useContext(ReducerProvider.contexts.get(name))
  },
  useReducerState(name) {
    return React.useContext(ReducerProvider.contexts.get(name))[0]
  },
  useReducerDispatcher(name) {
    return React.useContext(ReducerProvider.contexts.get(name))[1]
  }
}
