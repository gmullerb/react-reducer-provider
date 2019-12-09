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
declare type ReducerContextState<STATE, ACTION> = ReducerState<Reducer<STATE, ACTION>>
declare type ReducerContextDispatcher<STATE, ACTION> = Dispatcher<ReducerAction<Reducer<STATE, ACTION>>>
declare type ReducerContextValue<STATE, ACTION> = [ReducerContextState<STATE, ACTION>, ReducerContextDispatcher<STATE, ACTION>]
declare type ReducerContextDefaultValue<STATE, ACTION> = ReducerContextValue<STATE, ACTION> | null

declare interface ReducerContextProps<STATE, ACTION> {
  context: Context<ReducerContextDefaultValue<STATE, ACTION>>;
  reducer: Reducer<STATE, ACTION>;
  initialState: ReducerState<Reducer<STATE, ACTION>>;
  children: ReactNode;
}

declare interface ReducerContextInterface<STATE, ACTION> {
  state: ReducerState<Reducer<STATE, ACTION>>;
  dispatch: ReducerContextDispatcher<STATE, ACTION>;
}

declare function ReducerContext<STATE, ACTION>(props: ReducerContextProps<STATE, ACTION>): ReactElement<ReducerContextProps<STATE, ACTION>>

declare function useReducerContext<STATE, ACTION>(
  context: Context<ReducerContextDefaultValue<STATE, ACTION>>
): ReducerContextInterface<STATE, ACTION>

declare function useReducerState<STATE, ACTION>(
  context: Context<ReducerContextDefaultValue<STATE, ACTION>>
): ReducerState<Reducer<STATE, ACTION>>

declare function useReducerDispatcher<STATE, ACTION>(
  context: Context<ReducerContextDefaultValue<STATE, ACTION>>
): ReducerContextDispatcher<STATE, ACTION>

export {
  ReducerContext as default,
  ReducerContextProps,
  ReducerContextDefaultValue,
  ReducerContextValue,
  ReducerContextInterface,
  useReducerContext,
  useReducerState,
  useReducerDispatcher,
  Dispatcher
}
