// Copyright (c) 2020 Gonzalo Müller Bravo.

export function rebuildTagged(statesRef, setStates, tag, stateForTag) {
  statesRef.current.set(tag, stateForTag)
  statesRef.current = new Map(statesRef.current)
  setStates(statesRef.current)
  return stateForTag
}
