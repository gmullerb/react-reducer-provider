// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

const providers = new Map()

const SINGLETON_ID = Symbol('react-reducer-provider-singleton')

const captureProvider = function (id = SINGLETON_ID) {
  return providers.get(id)
}

const createProvider = function (id = SINGLETON_ID) {
  return (providers.get(id) || providers.set(id, React.createContext(null)).get(id)).Provider
}

export {
  captureProvider,
  createProvider,
  SINGLETON_ID
}
