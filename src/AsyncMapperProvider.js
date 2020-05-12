// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createMapperProvider } from './MapperProvider'

export function AsyncMapperProvider(props) {
  return createMapperProvider(props, (reRenderTrigger) => async (action) => {
    const newState = await props.mapper(action)
    reRenderTrigger(newState)
    return newState
  })
}
