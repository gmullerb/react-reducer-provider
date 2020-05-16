// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createMapperProvider } from './MapperProvider'

export function SyncMapperProvider(props) {
  return createMapperProvider(props, (reRenderTrigger) => (action, ...args) => {
    const newState = props.mapper(action, ...args)
    reRenderTrigger(newState)
    return newState
  })
}
