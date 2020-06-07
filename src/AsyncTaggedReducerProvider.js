// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createTaggedReducerProvider } from './TaggedReducerProvider'

export function AsyncTaggedReducerProvider(props) {
  return createTaggedReducerProvider(props, (statesRef, setStates, tag, reducer) => async (action, ...args) => {
    const stateForTag = await reducer(statesRef.current.get(tag), action, ...args)
    statesRef.current.set(tag, stateForTag)
    statesRef.current = new Map(statesRef.current)
    setStates(statesRef.current)
    return stateForTag
  })
}
