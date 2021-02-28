// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
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
  Sync,
  Dispatcher,
  ProviderValue,
  SyncReducerProps
} from '../../../src/react-reducer-provider'

interface TestState {
  lastAction: number;
}

const initialState: TestState = {
  lastAction: 0
}

interface TestFunctionAsState {
  (x: number, y: number): number;
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
      id='testNamedReducer'
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSyncReducerProviderWithFunctionAsState({ children }: {children: Element<any>}): Node {
  function reduce(prevState: TestFunctionAsState, action: string): TestFunctionAsState {
    switch (action) {
      case 'ACTION1':
        return (x, y) => x - y
      default:
        return (x, y) => x + y
    }
  }
  return (
    <SyncReducerProvider
      id='testNamedReducer'
      reducer={reduce}
      initialState={(x: number, y: number) => x - y}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestAsyncReducerProviderWithFunctionAsState({ children }: {children: Element<any>}): Node {
  async function reduce(prevState: TestFunctionAsState, action: string): Promise<TestFunctionAsState> {
    switch (action) {
      case 'ACTION1':
        return (x, y) => x - y
      default:
        return (x, y) => x + y
    }
  }
  return (
    <AsyncReducerProvider
      id='testNamedReducer'
      reducer={reduce}
      initialState={(x: number, y: number) => x - y}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSyncReducerProviderWithInitFunction({ children }: {children: Element<any>}): Node {
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={() => initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestAsyncReducerProviderWithInitFunction({ children }: {children: Element<any>}): Node {
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={() => initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestAsyncReducerProviderWithEmptyInitial({ children }: {children: Element<any>}): Node {
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
      id='testNamedReducer'
      reducer={reduce}
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
      id='testNamedReducer'
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
      id='testNamedReducer'
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestSyncReducerComponent(props: SyncReducerProps<TestState, string>): Node {
  return (
    <SyncReducerProvider
      id={props.id}
      reducer={props.reducer}
      initialState={props.initialState}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncReducerProvider>
  )
}

function TestSyncReducerComponentWithUndefined(props: SyncReducerProps<TestState, string>): Node {
  return (
    <SyncReducerProvider
      id={props.id}
      reducer={undefined}
      initialState={props.initialState}
    >
      <div>Child1</div>
      <div>ChildN</div>
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSyncTupleReducerMainHook(): Node {
  const [state, dispatch]: ProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}


function TestSyncObjectReducerMainHook(): Node {
  const { state, dispatch }: ProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
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

function TestSyncReducerMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, TestState>('testNamedReducer')
  let newState
  return (
    <button onClick={(): TestState => newState = dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = useReducer<TestState, string, Async<TestState>>('testNamedReducer')
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestSyncReducerMainHookWithFunctionAsState(): Node {
  const { state, dispatch }: ProviderValue<TestFunctionAsState, string, TestFunctionAsState> = useReducer<TestFunctionAsState, string, TestFunctionAsState>('testNamedReducer')
  return (
    <button onClick={(): TestFunctionAsState => dispatch('ACTION1')}>
      Child{state(1, 2)}
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

function TestReducerStateHookWithFunctionAsState(): Node {
  const theState: TestFunctionAsState = useReducerState<TestFunctionAsState>('testNamedReducer')
  return (
    <button>
      Child{theState(1, 2)}
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
      id={0}
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
      id={0}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestNumberedSyncTupleReducerMainHook(): Node {
  const [ state, dispatch, provider ]: ProviderValue<TestState, string> = useReducer<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}_{!!provider && provider.toString()}
    </button>
  )
}

function TestNumberedSyncObjectReducerMainHook(): Node {
  const { state, dispatch, provider }: ProviderValue<TestState, string> = useReducer<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}_{!!provider && provider.toString()}
    </button>
  )
}

function TestNumberedAsyncReducerMainHook(): Node {
  const { state, dispatch, provider }: ProviderValue<TestState, string, Async<>> = useReducer<TestState, string, Async<>>(0)
  const someFunc = () => {}
  return (
    <button onClick={async () => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}_{!!provider && provider.toString()}
    </button>
  )
}

function TestNumberedSyncReducerMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncTupleReducerMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = useReducer<TestState, string, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncObjectReducerMainHookWithReturn(): Node {
  const { state, dispatch }: ProviderValue<TestState, string, Async<TestState>> = useReducer<TestState, string, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
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
      id={0}
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
      id={0}
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

function TestNumberedSyncMapperMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, TestState> = useMapper<TestState, string, TestState>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncTupleMapperMainHookWithReturn(): Node {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = useMapper<TestState, string, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncObjectMapperMainHookWithReturn(): Node {
  const { state, dispatch }: ProviderValue<TestState, string, Async<TestState>> = useMapper<TestState, string, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
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

function TestNumberedSyncMapperDispatcherHookWithReturn(): Node {
  const theDispatcher: Dispatcher<number, string> = useMapperDispatcher<number, string>(0)
  return (
    <button onClick={(): void => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHookWithReturn(): Node {
  const theDispatcher: Dispatcher<number, Async<string>> = useMapperDispatcher<number, Async<string>>(0)
  const someFunc = (value: string) => value.toLowerCase()
  return (
    <button onClick={(): Promise<string> => theDispatcher(123)
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
      id={0}
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
      id={0}
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
      id={0}
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
      id={0}
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
      id={id}
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
