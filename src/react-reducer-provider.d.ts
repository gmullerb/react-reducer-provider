// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  ReactElement,
  ReactNode
} from 'react'

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> {
  name?: string | number;
  reducer: REDUCER;
  initialState: STATE;
  children: ReactNode;
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

// Reducer Consumption
//////////////////////

type Sync<T = any> = T
type Async<T = any> = Promise<T>

declare interface Dispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>> {
  (value: ACTION): DISPATCH
}

declare interface ReducerProviderValue<
    STATE,
    ACTION,
    DISPATCH extends Async<void | STATE> | Sync<void | STATE
  > = Sync<void>> extends Array<any> {
  readonly 0: STATE;
  readonly 1: Dispatcher<ACTION, DISPATCH>;
}

declare function useReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  name?: string | number
): ReducerProviderValue<STATE, ACTION, DISPATCH>

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
  ReducerProps,
  SyncReducer,
  SyncReducerProps,
  SyncReducerProvider,
  AsyncReducer,
  AsyncReducerProps,
  AsyncReducerProvider,
  Sync,
  Async,
  Dispatcher,
  ReducerProviderValue,
  useReducer,
  useReducerState,
  useReducerDispatcher,
  // Helpers
  //////////
  Action
}