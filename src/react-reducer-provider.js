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
import { TaggedActuatorProvider } from './TaggedActuatorProvider'
import { ActuatorProvider } from './ActuatorProvider'
import { useAny } from './useAny'
import { useAnyDispatcher } from './useAnyDispatcher'
import { useAnyState } from './useAnyState'
import { useTaggedAny } from './useTaggedAny'
import { useTaggedAnyState } from './useTaggedAnyState'
import { useTaggedAnyDispatcher } from './useTaggedAnyDispatcher'
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
  ActuatorProvider,
  TaggedActuatorProvider,
  useAny as useReducer,
  useAnyDispatcher as useReducerDispatcher,
  useAnyState as useReducerState,
  useAny as useMapper,
  useAnyDispatcher as useMapperDispatcher,
  useAnyState as useMapperState,
  useAny as useTaggedAny,
  useTaggedAny as useTaggedReducer,
  useTaggedAnyState as useTaggedReducerState,
  useTaggedAnyDispatcher as useTaggedReducerDispatcher,
  useTaggedAny as useTaggedMapper,
  useTaggedAnyState as useTaggedMapperState,
  useTaggedAnyDispatcher as useTaggedMapperDispatcher,
  useAny as useActuator,
  useTaggedAny as useTaggedActuator,
  injectAny as injectReducer,
  injectAnyState as injectReducerState,
  injectAnyDispatcher as injectReducerDispatcher,
  injectAny as injectTaggedAny,
  injectTagged as injectTaggedReducer,
  injectTaggedState as injectTaggedReducerState,
  injectTaggedDispatcher as injectTaggedReducerDispatcher,
  injectAny as injectMapper,
  injectAnyState as injectMapperState,
  injectAnyDispatcher as injectMapperDispatcher,
  injectTagged as injectTaggedMapper,
  injectTaggedState as injectTaggedMapperState,
  injectTaggedDispatcher as injectTaggedMapperDispatcher,
  injectAny as injectActuator,
  injectTagged as injectTaggedActuator
}
