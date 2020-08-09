// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createTaggedReducerProvider } from './TaggedReducerProvider'
import { rebuildTagged } from './TaggedBuilder'

export function AsyncTaggedReducerProvider(props) {
  return createTaggedReducerProvider(props, (statesRef, setStates, tag, reducer) => async (action, ...args) =>
    rebuildTagged(statesRef, setStates, tag, await reducer(statesRef.current.get(tag), action, ...args))
  )
}
