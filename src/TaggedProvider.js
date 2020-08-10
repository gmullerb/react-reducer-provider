// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

export const createTaggedProviderTuple = function (processors, createDispatcher) {
  const [ states, setStates ] = React.useState(() => new Map(processors.map(processor => [ processor[0], processor[2] ])))
  const statesRef = React.useRef(states)
  const dispatchers = React.useMemo(
    () => new Map(processors.map(processor => [ processor[0], createDispatcher(statesRef, setStates, processor[0], processor[1]) ])),
    [ processors ]
  )
  return [ states, dispatchers ]
}
