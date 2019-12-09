// Copyright (c) 2019 Gonzalo Müller Bravo.
const React = require('react')

module.exports = function ReducerContext(props) {
  return React.createElement(
    props.context.Provider,
    { value: React.useReducer(props.reducer, props.initialState) },
    props.children)
}

module.exports.useReducerContext = function (context) {
  const reducerContext = React.useContext(context)
  return React.useMemo(() => {
    return {
      state: reducerContext[0],
      dispatch: reducerContext[1]
    }
  }, [
    reducerContext
  ])
}

module.exports.useReducerState = function (context) {
  return React.useContext(context)[0]
}

module.exports.useReducerDispatcher = function (context) {
  return React.useContext(context)[1]
}
