// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

const providers = new Map()

const SINGLETON_ID = Symbol('react-reducer-provider-singleton')

const captureProvider = function (id = SINGLETON_ID) {
  return providers.get(id)
}

const createProvider = function (children, value, id = SINGLETON_ID) {
  return React.createElement(
    (providers.get(id) || providers.set(id, React.createContext(null)).get(id)).Provider,
    { value },
    children
  )
}

export {
  captureProvider,
  createProvider,
  SINGLETON_ID
}
