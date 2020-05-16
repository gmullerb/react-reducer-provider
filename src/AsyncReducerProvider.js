// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createReducerProvider } from './ReducerProvider'

export function AsyncReducerProvider(props) {
  return createReducerProvider(props, (stateRef, reRenderTrigger) => async (action, ...args) => {
    stateRef.current = await props.reducer(stateRef.current, action, ...args)
    reRenderTrigger(stateRef.current)
    return stateRef.current
  })
}
