// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, {
  Context,
  ReactElement,
  ReactNode
} from 'react'
import {
  NamedReducer,
  NamedReducerValue,
  useReducerDispatcher,
  useReducerState,
  useNamedReducer,
  NamedReducerInterface,
  Dispatcher
} from '../../../main/js/NamedReducer'

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

function TestNamedReducer({ children }: {children: ReactNode}): ReactElement {
  return (
    <NamedReducer
      name='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </NamedReducer>
  )
}

function TestReducerMainHook(): ReactElement {
  const { state, dispatch }: NamedReducerInterface<TestState, string> = useNamedReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestReducerStateHook(): ReactElement {
  const theState: TestState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={() => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}
