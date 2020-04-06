// Copyright (c) 2019 Gonzalo Müller Bravo.
import {
  AsyncReducerProvider,
  NamedReducer,
  NamedReducerInterface,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  useNamedReducer,
  SyncReducerProvider
} from '../../../main/js/NamedReducer'

import React from 'react'

import type {
  Context,
  Element,
  Node
} from 'react'
import type {
  Async,
  NamedReducerValue,
  Dispatcher,
  ReducerProviderValue
} from '../../../main/js/NamedReducer'

interface TestState {
  lastAction: number;
}

const initialState: TestState = {
  lastAction: 0
}

function TestSyncReducerProvider({ children }: {children: Element<any>}): Node {
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
  return (
    <SyncReducerProvider
      name='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestAsyncReducerProvider({ children }: {children: Element<any>}): Node {
  async function reduce(prevState: TestState, action: string): Promise<TestState> {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return prevState
    }
  }
  return (
    <AsyncReducerProvider
      name='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSingletonSyncReducerProvider({ children }: {children: Element<any>}): Node {
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
  return (
    <SyncReducerProvider
      name='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestSingletonAsyncReducerProvider({ children }: {children: Element<any>}): Node {
  async function reduce(prevState: TestState, action: string): Promise<TestState> {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return prevState
    }
  }
  return (
    <AsyncReducerProvider
      name='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function DeprecatedTestNamedReducer({ children }: {children: Element<any>}): Node {
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

function TestSyncReducerMainHook(): Node {
  const [state, dispatch]: ReducerProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHook(): Node {
  const [state, dispatch]: ReducerProviderValue<TestState, string, Async> = useReducer<TestState, string, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async () => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function DeprecatedTestReducerMainHook(): Node {
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

function TestSyncReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestAsyncReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string, Async> = useReducerDispatcher<string, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}
