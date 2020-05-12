// Copyright (c) 2020 Gonzalo Müller Bravo.
import { AsyncMapperProvider } from './AsyncMapperProvider'
import { AsyncReducerProvider } from './AsyncReducerProvider'
import { SyncMapperProvider } from './SyncMapperProvider'
import { SyncReducerProvider } from './SyncReducerProvider'
import { useReducer } from './useReducer'
import { useReducerDispatcher } from './useReducerDispatcher'
import { useReducerState } from './useReducerState'

export {
  AsyncReducerProvider,
  AsyncMapperProvider,
  SyncReducerProvider,
  SyncMapperProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  useReducer as useMapper,
  useReducerDispatcher as useMapperDispatcher,
  useReducerState as useMapperState
}
