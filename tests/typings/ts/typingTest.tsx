// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, {
  Context,
  ReactElement,
  ReactNode
} from 'react'
import {
  Action,
  Async,
  AsyncReducerProvider,
  NamedReducer,
  NamedReducerValue,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  useNamedReducer,
  NamedReducerInterface,
  Dispatcher,
  ReducerProviderValue,
  Sync,
  SyncReducerProvider
} from '../../../src/NamedReducer'

interface TestState {
  lastAction: number;
}

const initialState: TestState = {
  lastAction: 0
}

function TestSyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestAsyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestSingletonSyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestSingletonAsyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function DeprecatedTestNamedReducer({ children }: {children: ReactNode}): ReactElement {
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

function TestSyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Async> = useReducer<TestState, string, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function DeprecatedTestReducerMainHook(): ReactElement {
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

function TestSyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestAsyncReducerDispatcherHook(): ReactElement {
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

function TestAction(): Action<string, string> {
  return {
    type: 'theType',
    data: 'theData'
  }
}

function TestEmptyAction(): Action<string> {
  return {
    type: 'theType'
  }
}
