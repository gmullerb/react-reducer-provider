// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createTaggedMapperProvider } from './TaggedMapperProvider'
import { rebuildTagged } from './TaggedBuilder'

export function SyncTaggedMapperProvider(props) {
  return createTaggedMapperProvider(props, (statesRef, setStates, tag, mapper) => (action, ...args) =>
    rebuildTagged(statesRef, setStates, tag, mapper(action, ...args))
  )
}
