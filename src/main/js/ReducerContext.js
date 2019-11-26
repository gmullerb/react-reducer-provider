// Copyright (c) 2019 Gonzalo Müller Bravo.
const React = require('react')

module.exports = function ReducerContext(props) {
  return React.createElement(
    props.context.Provider,
    { value: React.useReducer(props.reducer, props.initialState) },
    props.children)
}
