// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createTaggedReducerProvider } from './TaggedReducerProvider'

export function SyncTaggedReducerProvider(props) {
  return createTaggedReducerProvider(props, (statesRef, setStates, tag, reducer) => (action, ...args) => {
    const stateForTag = reducer(statesRef.current.get(tag), action, ...args)
    statesRef.current.set(tag, stateForTag)
    statesRef.current = new Map(statesRef.current)
    setStates(statesRef.current)
    return stateForTag
  })
}
