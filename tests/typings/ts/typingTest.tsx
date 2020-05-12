// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  Action,
  Async,
  AsyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  Dispatcher,
  ReducerProviderValue,
  Sync,
  SyncReducerProvider
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

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

function TestSyncReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, Sync<TestState>>('testNamedReducer')
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Async<TestState>> = useReducer<TestState, string, Async<TestState>>('testNamedReducer')
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
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

function TestSyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<number, Sync<string>> = useReducerDispatcher<number, Sync<string>>('testNamedReducer')
  return (
    <button onClick={(): void => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestAsyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<number, Async<string>> = useReducerDispatcher<number, Async<string>>('testNamedReducer')
  const someFunc = (value: string) => value.toLowerCase()
  return (
    <button onClick={(): Promise<string> => theDispatcher(123)
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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
      name={0}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestNumberedAsyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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
      name={0}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestNumberedSyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string> = useReducer<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Async> = useReducer<TestState, string, Async>(0)
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedSyncReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Async<TestState>> = useReducer<TestState, string, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedReducerStateHook(): ReactElement {
  const theState: TestState = useReducerState<TestState>(0)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestNumberedSyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>(0)
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string, Async> = useReducerDispatcher<string, Async>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<number, Sync<string>> = useReducerDispatcher<number, Sync<string>>(0)
  return (
    <button onClick={(): void => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestNumberedAsyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<number, Async<string>> = useReducerDispatcher<number, Async<string>>(0)
  const someFunc = (value: string) => value.toLowerCase()
  return (
    <button onClick={(): Promise<string> => theDispatcher(123)
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
