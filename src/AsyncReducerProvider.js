// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createReducerProvider } from './ReducerProvider'

export function AsyncReducerProvider(props) {
  return createReducerProvider(props, (stateRef, reRenderTrigger) => async (action) => {
    stateRef.current = await props.reducer(stateRef.current, action)
    reRenderTrigger(stateRef.current)
    return stateRef.current
  })
}
