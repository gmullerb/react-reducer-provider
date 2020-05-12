// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  ReactElement,
  ReactNode
} from 'react'

// Provider Component
/////////////////////

declare interface ProviderProps<STATE> {
  name?: string | number;
  initialState: STATE;
  children: ReactNode;
}

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> extends ProviderProps<STATE> {
  reducer: REDUCER;
}

declare interface SyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION): STATE
}

declare interface SyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, SyncReducer<STATE, ACTION>> {}

declare function SyncReducerProvider<STATE, ACTION>(
  props: Readonly<SyncReducerProps<STATE, ACTION>>
): ReactElement<SyncReducerProps<STATE, ACTION>>

declare interface AsyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION): Promise<STATE>
}

declare interface AsyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, AsyncReducer<STATE, ACTION>> {}

declare function AsyncReducerProvider<STATE, ACTION>(
  props: Readonly<AsyncReducerProps<STATE, ACTION>>
): ReactElement<AsyncReducerProps<STATE, ACTION>>

// Mapper Component Definition
//////////////////////////////

declare interface MapperProps<STATE, MAPPER> extends ProviderProps<STATE> {
  mapper: MAPPER
}

declare interface SyncMapper<STATE, ACTION> {
  (action: ACTION): STATE
}

declare interface SyncMapperProps<STATE, ACTION> extends MapperProps<STATE, SyncMapper<STATE, ACTION>> {}

declare function SyncMapperProvider<STATE, ACTION>(
  props: Readonly<SyncMapperProps<STATE, ACTION>>
): ReactElement<SyncMapperProps<STATE, ACTION>>

declare interface AsyncMapper<STATE, ACTION> {
  (action: ACTION): Promise<STATE>
}

declare interface AsyncMapperProps<STATE, ACTION> extends MapperProps<STATE, AsyncMapper<STATE, ACTION>> {}

declare function AsyncMapperProvider<STATE, ACTION>(
  props: Readonly<AsyncMapperProps<STATE, ACTION>>
): ReactElement<AsyncMapperProps<STATE, ACTION>>

// Providers Consumption
////////////////////////

type Sync<T = any> = T
type Async<T = any> = Promise<T>

declare interface Dispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>> {
  (value: ACTION): DISPATCH
}

declare interface ProviderValue<
    STATE,
    ACTION,
    DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>
  > extends Array<any> {
  readonly 0: STATE;
  readonly 1: Dispatcher<ACTION, DISPATCH>;
}

declare function useReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  name?: string | number
): ProviderValue<STATE, ACTION, DISPATCH>

declare function useReducerState<STATE>(name?: string | number): STATE

declare function useReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>>(
  name?: string | number
): Dispatcher<ACTION, DISPATCH>

// Helpers
//////////

declare interface Action<TYPE, DATA = undefined> {
  type: TYPE;
  data?: DATA;
}

export {
  SyncReducer,
  SyncReducerProps,
  SyncReducerProvider,
  AsyncReducer,
  AsyncReducerProps,
  AsyncReducerProvider,
  SyncMapper,
  SyncMapperProps,
  SyncMapperProvider,
  AsyncMapper,
  AsyncMapperProps,
  AsyncMapperProvider,
  Sync,
  Async,
  Dispatcher,
  ProviderValue,
  useReducer,
  useReducerState,
  useReducerDispatcher,
  useReducer as useMapper,
  useReducerState as useMapperState,
  useReducerDispatcher as useMapperDispatcher,
  // Helpers
  //////////
  Action,
  // Deprecated
  /////////////
  /**
   * @deprecated since version 3.4.0, use 'ProviderValue' instead.
   */
  ProviderValue as ReducerProviderValue
}
