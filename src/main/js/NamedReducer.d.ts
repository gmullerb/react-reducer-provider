// Copyright (c) 2019 Gonzalo Müller Bravo.
import {
  Context,
  ReactElement,
  ReactNode,
  Reducer,
  ReducerAction,
  ReducerState
} from 'react'

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> {
  name?: string;
  reducer: REDUCER;
  initialState: STATE;
  children: ReactNode;
}

declare interface SyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION): STATE
}

declare interface SyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, SyncReducer<STATE, ACTION>> {}

declare function SyncReducerProvider<STATE, ACTION>(props: SyncReducerProps<STATE, ACTION>): ReactElement<SyncReducerProps<STATE, ACTION>>

declare interface AsyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION): Promise<STATE>
}

declare interface AsyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, AsyncReducer<STATE, ACTION>> {}

declare function AsyncReducerProvider<STATE, ACTION>(props: AsyncReducerProps<STATE, ACTION>): ReactElement<AsyncReducerProps<STATE, ACTION>>

// Reducer Consumption
//////////////////////

type Sync = void
type Async = Promise<void>

declare interface Dispatcher<ACTION, DISPATCH extends Async | Sync = Sync> {
  (value: ACTION): DISPATCH
}

declare interface ReducerProviderValue<STATE, ACTION, DISPATCH extends Async | Sync = Sync> extends Array<any> {
  readonly 0: STATE;
  readonly 1: Dispatcher<ACTION, DISPATCH>;
}

declare function useReducer<STATE, ACTION, DISPATCH extends Async | Sync = Sync>(name?: string): ReducerProviderValue<STATE, ACTION, DISPATCH>

declare function useReducerState<STATE>(name?: string): STATE

declare function useReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync>(name?: string): Dispatcher<ACTION, DISPATCH>

// Helper
/////////

declare interface Action<TYPE, DATA> {
  type: TYPE;
  data?: DATA;
}

// Deprecations
///////////////

/**
 * @deprecated since version 2.1.0, use 'SyncReducerProps' or 'AsyncReducerProps' instead.
 */
declare interface NamedReducerProps<STATE, ACTION> extends SyncReducerProps<STATE, ACTION> {}

/**
 * @deprecated since version 2.1.0, use 'SyncReducerProvider' or 'AsyncReducerProvider' instead.
 */
declare function NamedReducer<STATE, ACTION>(props: NamedReducerProps<STATE, ACTION>): ReactElement<NamedReducerProps<STATE, ACTION>>

/**
 * @deprecated since version 2.1.0, use 'Dispatcher' instead.
 */
declare interface NamedReducerDispatcher<STATE, ACTION> extends Dispatcher<ReducerAction<Reducer<STATE, ACTION>>> {}

/**
 * @deprecated since version 2.1.0, use 'ReducerProviderValue' instead.
 */
declare interface NamedReducerInterface<STATE, ACTION> {
  state: ReducerState<Reducer<STATE, ACTION>>;
  dispatch: NamedReducerDispatcher<STATE, ACTION>;
}

/**
 * @deprecated since version 2.1.0, use 'useReducer' instead.
 */
declare function useNamedReducer<STATE, ACTION>(name: string): NamedReducerInterface<STATE, ACTION>

/**
 * @deprecated since version 2.1.0, use 'ReducerProviderValue' instead.
 */
declare interface NamedReducerValue<STATE, ACTION> extends ReducerProviderValue<STATE, ACTION> {}

/**
 * @deprecated since version 2.1.0, use 'useReducer' instead.
 */
declare function useNamedReducerContext<STATE, ACTION>(name: string): Context<NamedReducerValue<STATE, ACTION>>

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
  // Deprecations
  ///////////////
  NamedReducer,
  NamedReducerProps,
  NamedReducerInterface,
  useNamedReducer,
  useNamedReducerContext,
  NamedReducerValue
}
