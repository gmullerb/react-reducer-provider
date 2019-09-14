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

declare type Dispatcher<A> = Dispatch<A>
declare type ReducerContextValue<S, A> = [ReducerState<Reducer<S, A>>, Dispatcher<ReducerAction<Reducer<S, A>>>]
declare type ReducerContextDefaultValue<S, A> = ReducerContextValue<S, A> | null

declare interface ReducerContextProps<S, A> {
    context: Context<ReducerContextDefaultValue<S, A>>;
    reducer: Reducer<S, A>;
    initialState: ReducerState<Reducer<S, A>>;
    children: ReactNode;
  }

declare function ReducerContext<S, A>(props: ReducerContextProps<S, A>): ReactElement<ReducerContextProps<S, A>>

export {
  ReducerContext as default,
  ReducerContextValue,
  ReducerContextDefaultValue,
  ReducerContextProps
}
