// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createTaggedMapperProvider } from './TaggedMapperProvider'
import { rebuildTagged } from './TaggedBuilder'

export function AsyncTaggedMapperProvider(props) {
  return createTaggedMapperProvider(props, (statesRef, setStates, tag, mapper) => async (action, ...args) =>
    rebuildTagged(statesRef, setStates, tag, await mapper(action, ...args))
  )
}
