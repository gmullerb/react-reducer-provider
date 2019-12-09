// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, { createContext } from 'react'
import ReducerContext, {
  ReducerContextInterface,
  useReducerDispatcher,
  useReducerState,
  useReducerContext
} from '../../../main/js/ReducerContext'

import type {
  Context,
  Element,
  Node
} from 'react'
import type {
  ReducerContextDefaultValue,
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

function TestReducerContext({ children }: {children: Element<any>}): Node {
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

function TestReducerMainHook(): Node {
  const { state, dispatch }: ReducerContextInterface<TestState, string> = useReducerContext<TestState, string>(testReducerContext)
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestReducerStateHook(): Node {
  const theState: TestState = useReducerState(testReducerContext)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher(testReducerContext)
  return (
    <button onClick={() => theDispatcher('ACTION1')}>
      Child
    </button>
  )
}
