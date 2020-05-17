// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

const providers = new Map()

const SINGLETON_ID = Symbol('react-reducer-provider-singleton')

const captureProvider = function (name = SINGLETON_ID) {
  return providers.get(name)
}

const createProvider = function (children, value, name = SINGLETON_ID) {
  return React.createElement(
    (providers.get(name) || providers.set(name, React.createContext(null)).get(name)).Provider,
    { value },
    children
  )
}

export {
  captureProvider,
  createProvider,
  SINGLETON_ID
}
