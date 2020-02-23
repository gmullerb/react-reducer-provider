// Copyright (c) 2019 Gonzalo Müller Bravo.
import {
  NamedReducer,
  NamedReducerInterface,
  useReducerDispatcher,
  useReducerState,
  useNamedReducer
} from '../../../main/js/NamedReducer'

import React from 'react'

import type {
  Context,
  Element,
  Node
} from 'react'
import type {
  NamedReducerValue,
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

function TestNamedReducer({ children }: {children: Element<any>}): Node {
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

function TestReducerMainHook(): Node {
  const { state, dispatch }: NamedReducerInterface<TestState, string> = useNamedReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestReducerStateHook(): Node {
  const theState: TestState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={() => theDispatcher('ACTION1')}>
      Child
    </button>
  )
}
