// Copyright (c) 2020 Gonzalo Müller Bravo.
import { AsyncMapperProvider } from './AsyncMapperProvider'
import { AsyncReducerProvider } from './AsyncReducerProvider'
import { SyncMapperProvider } from './SyncMapperProvider'
import { SyncReducerProvider } from './SyncReducerProvider'
import { SyncTaggedReducerProvider } from './SyncTaggedReducerProvider'
import { AsyncTaggedReducerProvider } from './AsyncTaggedReducerProvider'
import { SyncTaggedMapperProvider } from './SyncTaggedMapperProvider'
import { AsyncTaggedMapperProvider } from './AsyncTaggedMapperProvider'
import { useReducer } from './useReducer'
import { useReducerDispatcher } from './useReducerDispatcher'
import { useReducerState } from './useReducerState'
import { useTaggedReducer } from './useTaggedReducer'
import { useTaggedReducerState } from './useTaggedReducerState'
import { useTaggedReducerDispatcher } from './useTaggedReducerDispatcher'

export {
  AsyncReducerProvider,
  AsyncMapperProvider,
  SyncReducerProvider,
  SyncMapperProvider,
  SyncTaggedReducerProvider,
  AsyncTaggedReducerProvider,
  SyncTaggedMapperProvider,
  AsyncTaggedMapperProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  useReducer as useMapper,
  useReducerDispatcher as useMapperDispatcher,
  useReducerState as useMapperState,
  useReducer as useTaggedAny,
  useReducerState as useTaggedAnyState,
  useReducerDispatcher as useTaggedAnyDispatcher,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher,
  useTaggedReducer as useTaggedMapper,
  useTaggedReducerState as useTaggedMapperState,
  useTaggedReducerDispatcher as useTaggedMapperDispatcher,
}
