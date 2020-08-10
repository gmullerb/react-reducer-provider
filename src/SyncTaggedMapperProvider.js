// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import { createTaggedMapperProvider } from './TaggedMapperProvider'
import { rebuildTagged } from './TaggedBuilder'

export function SyncTaggedMapperProvider(props) {
  return createTaggedMapperProvider(props, (statesRef, setStates, tag, mapper) => (action, ...args) =>
    rebuildTagged(statesRef, setStates, tag, mapper(action, ...args))
  )
}
