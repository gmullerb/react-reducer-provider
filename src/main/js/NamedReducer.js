// Copyright (c) 2019 Gonzalo Müller Bravo.
const React = require('react')

function NamedReducer(props) {
  const reducerContext = NamedReducer.contexts.has(props.name)
    ? NamedReducer.contexts.get(props.name)
    : NamedReducer.contexts.set(props.name, React.createContext(null)).get(props.name)

  return React.createElement(
    reducerContext.Provider,
    { value: React.useReducer(props.reducer, props.initialState) },
    props.children)
}

NamedReducer.names = new Set()
NamedReducer.contexts = new Map()
NamedReducer.getNamedReducer = function (name) {
  if (!NamedReducer.contexts.has(name)) {
    throw new Error(`NamedReducer ${name} does not exist`)
  }
  return NamedReducer.contexts.get(name)
}

module.exports.NamedReducer = NamedReducer

module.exports.useNamedReducer = function (name) {
  const reducerContext = React.useContext(NamedReducer.getNamedReducer(name))
  return React.useMemo(() => {
    return {
      state: reducerContext[0],
      dispatch: reducerContext[1]
    }
  }, [
    reducerContext
  ])
}

module.exports.useReducerState = function (name) {
  return React.useContext(NamedReducer.getNamedReducer(name))[0]
}

module.exports.useReducerDispatcher = function (name) {
  return React.useContext(NamedReducer.getNamedReducer(name))[1]
}

module.exports.useNamedReducerContext = function (name) {
  return NamedReducer.contexts.get(name)
}
