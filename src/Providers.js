// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

const providers = new Map()

const captureProvider = function (name) {
  return providers.get(name)
}

const createProvider = function (name, children, value) {
  return React.createElement(
    (providers.get(name) || providers.set(name, React.createContext(null)).get(name)).Provider,
    { value },
    children
  )
}

export {
  captureProvider,
  createProvider
}
