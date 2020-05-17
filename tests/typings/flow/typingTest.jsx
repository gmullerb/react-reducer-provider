// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  AsyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState,
  SyncReducerProvider,
  AsyncMapperProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState,
  SyncMapperProvider
} from '../../../src/react-reducer-provider'

import React from 'react'

import type {
  Element,
  Node
} from 'react'
import type {
  Action,
  Async,
  Dispatcher,
  ProviderValue
} from '../../../src/react-reducer-provider'

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

function TestSyncReducerProviderChild(): Node {
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
      <div>Child1</div>
    </SyncReducerProvider>
  )
}

function TestSyncReducerProviderChildren(): Node {
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
      <div>Child1</div>
      <div>ChildN</div>
    </SyncReducerProvider>
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

function TestSyncReducerMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string, Async<>> = useReducer<TestState, string, Async<>>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async () => await dispatch('ACTION1')
      .then(someFunc)
    }>
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
  const theDispatcher: Dispatcher<string, Async<>> = useReducerDispatcher<string, Async<>>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncReducerProvider({ children }: {children: Element<any>}): Node {
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

function TestNumberedAsyncReducerProvider({ children }: {children: Element<any>}): Node {
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

function TestNumberedSyncReducerMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string> = useReducer<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string, Async<>> = useReducer<TestState, string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={async () => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedReducerStateHook(): Node {
  const theState: TestState = useReducerState<TestState>(0)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestNumberedSyncReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useReducerDispatcher<string>(0)
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncReducerDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string, Async<>> = useReducerDispatcher<string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncMapperProvider({ children }: {children: Element<any>}): Node {
  function map(action: string): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return initialState
    }
  }
  return (
    <SyncMapperProvider
      name={0}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </SyncMapperProvider>
  )
}

function TestNumberedAsyncMapperProvider({ children }: {children: Element<any>}): Node {
  async function map(action: string): Promise<TestState> {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return initialState
    }
  }
  return (
    <AsyncMapperProvider
      name={0}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </AsyncMapperProvider>
  )
}

function TestNumberedSyncMapperMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string> = useMapper<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncMapperMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string, Async<>> = useMapper<TestState, string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={async () => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedMapperStateHook(): Node {
  const theState: TestState = useMapperState<TestState>(0)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestNumberedSyncMapperDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useMapperDispatcher<string>(0)
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string, Async<>> = useMapperDispatcher<string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestArgsSyncReducerProvider({ children }: {children: Element<any>}): Node {
  function reduce(prevState: TestState, action: string, moreData1: string, moreDataN: {}): TestState {
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

function TestArgsAsyncReducerProvider({ children }: {children: Element<any>}): Node {
  async function reduce(prevState: TestState, action: string, moreData1: string, moreDataN: {}): Promise<TestState> {
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

function TestArgsSyncMapperProvider({ children }: {children: Element<any>}): Node {
  function map(action: string, moreData1: string, moreDataN: {}): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return initialState
    }
  }
  return (
    <SyncMapperProvider
      name={0}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </SyncMapperProvider>
  )
}

function TestArgsAsyncMapperProvider({ children }: {children: Element<any>}): Node {
  async function map(action: string, moreData1: string, moreDataN: {}): Promise<TestState> {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return initialState
    }
  }
  return (
    <AsyncMapperProvider
      name={0}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </AsyncMapperProvider>
  )
}

function TestArgsSyncMapperDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string> = useMapperDispatcher<string>(0)
  return (
    <button onClick={(): void => theDispatcher('ACTION1', 'somevalue1', {})}>
      Children
    </button>
  )
}

function TestArgsAsyncMapperDispatcherHook(): Node {
  const theDispatcher: Dispatcher<string, Async<>> = useMapperDispatcher<string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestArgsSyncMapperSymbolProvider({ children }: {children: Element<any>}): Node {
  const id = Symbol()
  function map(action: string, moreData1: string, moreDataN: {}): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return initialState
    }
  }
  return (
    <SyncMapperProvider
      name={id}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </SyncMapperProvider>
  )
}

function TestArgsAsyncMapperSymbolDispatcherHook(): Node {
  const id = Symbol()
  const theDispatcher: Dispatcher<string, Async<>> = useMapperDispatcher<string, Async<>>(id)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
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
