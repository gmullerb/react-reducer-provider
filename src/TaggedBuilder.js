// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt

export function rebuildTagged(statesRef, setStates, tag, stateForTag) {
  statesRef.current.set(tag, stateForTag)
  statesRef.current = new Map(statesRef.current)
  setStates(statesRef.current)
  return stateForTag
}
