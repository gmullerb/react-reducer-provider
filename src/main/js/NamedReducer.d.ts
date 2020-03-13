// Copyright (c) 2019 Gonzalo Müller Bravo.
import {
  Context,
  ReactElement,
  ReactNode,
  Reducer,
  ReducerAction,
  ReducerState
} from 'react'

declare interface Dispatcher<ACTION> {
  (value: ACTION): void;
}
declare interface NamedReducerState<STATE, ACTION> {
  (prevState: STATE, action: ACTION): STATE;
}
declare interface NamedReducerDispatcher<STATE, ACTION> extends Dispatcher<ReducerAction<Reducer<STATE, ACTION>>> {}
declare interface NamedReducerValue<STATE, ACTION> {
  0: NamedReducerState<STATE, ACTION>;
  1: NamedReducerDispatcher<STATE, ACTION>;
}

declare interface NamedReducerProps<STATE, ACTION> {
  name: string;
  reducer: Reducer<STATE, ACTION>;
  initialState: ReducerState<Reducer<STATE, ACTION>>;
  children: ReactNode;
}

declare interface NamedReducerInterface<STATE, ACTION> {
  state: ReducerState<Reducer<STATE, ACTION>>;
  dispatch: NamedReducerDispatcher<STATE, ACTION>;
}

declare function NamedReducer<STATE, ACTION>(props: NamedReducerProps<STATE, ACTION>): ReactElement<NamedReducerProps<STATE, ACTION>>

declare function useNamedReducer<STATE, ACTION>(name: string): NamedReducerInterface<STATE, ACTION>

declare function useReducerState<STATE>(name: string): ReducerState<Reducer<STATE, any>>

declare function useReducerDispatcher<ACTION>(name: string): NamedReducerDispatcher<any, ACTION>

declare function useNamedReducerContext<STATE, ACTION>(name: string): Context<NamedReducerValue<STATE, ACTION>>

export {
  NamedReducer,
  NamedReducerProps,
  NamedReducerInterface,
  useNamedReducer,
  useReducerState,
  useReducerDispatcher,
  useNamedReducerContext,
  NamedReducerValue,
  Dispatcher
}
