// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createMapperProvider } from './MapperProvider'

export function AsyncMapperProvider(props) {
  return createMapperProvider(props, (reRenderTrigger) => async (action, ...args) => {
    const newState = await props.mapper(action, ...args)
    reRenderTrigger(newState)
    return newState
  })
}
