// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createMapperProvider } from './MapperProvider'

export function SyncMapperProvider(props) {
  return createMapperProvider(props, (reRenderTrigger) => (action) => {
    const newState = props.mapper(action)
    reRenderTrigger(newState)
    return newState
  })
}
