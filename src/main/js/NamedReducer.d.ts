// Copyright (c) 2019 Gonzalo Müller Bravo.
import {
  Context,
  Dispatch,
  ReactElement,
  ReactNode,
  Reducer,
  ReducerAction,
  ReducerState
} from 'react'

declare type Dispatcher<ACTION> = Dispatch<ACTION>
declare type NamedReducerState<STATE, ACTION> = ReducerState<Reducer<STATE, ACTION>>
declare type NamedReducerDispatcher<STATE, ACTION> = Dispatcher<ReducerAction<Reducer<STATE, ACTION>>>
declare type NamedReducerValue<STATE, ACTION> = [NamedReducerState<STATE, ACTION>, NamedReducerDispatcher<STATE, ACTION>]

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

declare function useReducerState<STATE, ACTION>(name: string): ReducerState<Reducer<STATE, ACTION>>

declare function useReducerDispatcher<STATE, ACTION>(name: string): NamedReducerDispatcher<STATE, ACTION>

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
