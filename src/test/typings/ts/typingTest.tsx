// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, {
  Context,
  createContext,
  ReactElement,
  ReactNode
} from 'react'
import ReducerContext, {
  ReducerContextDefaultValue,
  useReducerDispatcher,
  useReducerState,
  useReducerContext,
  ReducerContextInterface,
  Dispatcher
} from '../../../main/js/ReducerContext'

interface TestState {
  lastAction: number;
}

const initialState: TestState = {
  lastAction: 0
}

function reduce(prevState: TestState, action: string): TestState {
  switch (action) {
    case 'ACTION1':
      return {
        lastAction: 1
      }
    default:
      return prevState
  }
}

const testReducerContext: Context<ReducerContextDefaultValue<TestState, string>> = createContext(null)

function TestReducerContext({ children }: {children: ReactNode}): ReactElement {
  return (
    <ReducerContext
      context={testReducerContext}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </ReducerContext>
  )
}

function TestReducerMainHook(): ReactElement {
  const { state, dispatch }: ReducerContextInterface<TestState, string> = useReducerContext<TestState, string>(testReducerContext)
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestReducerStateHook(): ReactElement {
  const theState: TestState = useReducerState(testReducerContext)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher(testReducerContext)
  return (
    <button onClick={() => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}
