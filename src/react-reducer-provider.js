// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
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
import { injectAny } from './injectAny'
import { injectAnyState } from './injectAnyState'
import { injectAnyDispatcher } from './injectAnyDispatcher'
import { injectTagged } from './injectTagged'
import { injectTaggedState } from './injectTaggedState'
import { injectTaggedDispatcher } from './injectTaggedDispatcher'

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
  injectAny as injectTaggedAny,
  injectAnyState as injectTaggedAnyState,
  injectAnyDispatcher as injectTaggedAnyDispatcher,
  injectAny as injectReducer,
  injectAnyState as injectReducerState,
  injectAnyDispatcher as injectReducerDispatcher,
  injectTagged as injectTaggedReducer,
  injectTaggedState as injectTaggedReducerState,
  injectTaggedDispatcher as injectTaggedReducerDispatcher,
  injectAny as injectMapper,
  injectAnyState as injectMapperState,
  injectAnyDispatcher as injectMapperDispatcher,
  injectTagged as injectTaggedMapper,
  injectTaggedState as injectTaggedMapperState,
  injectTaggedDispatcher as injectTaggedMapperDispatcher
}
