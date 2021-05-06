// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  Action,
  Async,
  AsyncMapperProvider,
  AsyncReducerProvider,
  Dispatcher,
  StateProviderValue,
  Sync,
  SyncReducer,
  SyncMapperProvider,
  SyncReducerProps,
  SyncReducerProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState,
  useReducer,
  useReducerDispatcher,
  useReducerState
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
interface TestFunctionAsState {
  (x: number, y: number): number;
}

const testReducerDefinition: SyncReducer<TestState, [string]> = (prevState: TestState, action: string): TestState => {
  switch (action) {
    case 'ACTION1':
      return {
        lastAction: 1
      }
    default:
      return prevState
  }
}

const testArgsReducerDefinition: SyncReducer<TestState, [string, number, string]> = (prevState: TestState, action: string, arg1: number, arg2: string): TestState => {
  return prevState
}

const testNoArgsReducerDefinition: SyncReducer<TestState> = (prevState: TestState): TestState => {
  return {
    lastAction: Math.random()
  }
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
      id='testNamedReducer'
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
      id='testNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSyncReducerProviderWithFunctionAsState({ children }: {children: ReactNode}): ReactElement {
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
      initialState={(x, y) => x - y}
    >
      {children}
    </SyncReducerProvider>
  )
}

function TestAsyncReducerProviderWithFunctionAsState({ children }: {children: ReactNode}): ReactElement {
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
      initialState={(x, y) => x - y}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestSyncReducerProviderWithInitFunction({ children }: {children: ReactNode}): ReactElement {
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

function TestAsyncReducerProviderWithInitFunction({ children }: {children: ReactNode}): ReactElement {
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

function TestAsyncReducerProviderWithEmptyInitial({ children }: {children: ReactNode}): ReactElement {
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

function TestSyncReducerProviderChild(): ReactElement {
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

function TestSyncReducerProviderChildren(): ReactElement {
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

function TestSyncReducerComponent(props: SyncReducerProps<TestState, [string]>): ReactElement {
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

function TestSyncReducerComponentWithNull(props: SyncReducerProps<TestState, [string]>): ReactElement {
  return (
    <SyncReducerProvider
      id={props.id}
      reducer={null}
      initialState={props.initialState}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncReducerProvider>
  )
}

function TestSyncReducerComponentWithUndefined(props: SyncReducerProps<TestState, [string]>): ReactElement {
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

function TestSingletonAsyncNoArgsReducerProvider({ children }: {children: ReactNode}): ReactElement {
  async function reduce(prevState: TestState): Promise<TestState> {
    return {
      lastAction: await Promise.resolve(Math.random())
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

function TestSyncTupleReducerMainHook(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState> = useReducer<TestState>('testNamedReducer')
  return (
    <button onClick={(): any => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestSyncObjectReducerMainHook(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestState> = useReducer<TestState>('testNamedReducer')
  return (
    <button onClick={(): any => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncTupleReducerMainHook(): ReactElement {
  const [ state, dispatch, provider ]: StateProviderValue<TestState, Async> = useReducer<TestState, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}_{provider}
    </button>
  )
}

function TestAsyncObjectReducerMainHook(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestState, Async> = useReducer<TestState, Async>('testNamedReducer')
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
  const [ state, dispatch ]: StateProviderValue<TestState, Sync<TestState>> = useReducer<TestState, Sync<TestState>>('testNamedReducer')
  let newState
  return (
    <button onClick={(): TestState => newState = dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Async<TestState>> = useReducer<TestState, Async<TestState>>('testNamedReducer')
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestSyncReducerMainHookWithFunctionAsState(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestFunctionAsState, Sync<TestFunctionAsState>> = useReducer<TestFunctionAsState, Sync<TestFunctionAsState>>('testNamedReducer')
  return (
    <button onClick={(): TestFunctionAsState => dispatch('ACTION1')}>
      Child{state(1, 2)}
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

function TestReducerStateHookWithFunctionAsState(): ReactElement {
  const theState: TestFunctionAsState = useReducerState<TestFunctionAsState>('testNamedReducer')
  return (
    <button>
      Child{theState(1, 2)}
    </button>
  )
}

function TestSyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher = useReducerDispatcher('testNamedReducer')
  return (
    <button onClick={(): any => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestSyncReducerDispatcherHookNoArgs(): ReactElement {
  const theDispatcher: Dispatcher = useReducerDispatcher('testNamedReducer')
  return (
    <button onClick={(): any => theDispatcher()}>
      Children
    </button>
  )
}

function TestAsyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<Async> = useReducerDispatcher<Async>('testNamedReducer')
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
  const theDispatcher: Dispatcher<Sync<string>> = useReducerDispatcher<Sync<string>>('testNamedReducer')
  return (
    <button onClick={(): any => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestAsyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<Async<string>> = useReducerDispatcher<Async<string>>('testNamedReducer')
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
      id={0}
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
      id={0}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </AsyncReducerProvider>
  )
}

function TestNumberedSyncTupleReducerMainHook(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState> = useReducer<TestState>(0)
  return (
    <button onClick={(): any => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedSyncObjectReducerMainHook(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestState> = useReducer<TestState>(0)
  return (
    <button onClick={(): any => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Async> = useReducer<TestState, Async>(0)
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
  const [ state, dispatch ]: StateProviderValue<TestState, Sync<TestState>> = useReducer<TestState, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncTupleReducerMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Async<TestState>> = useReducer<TestState, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncObjectReducerMainHookWithReturn(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestState, Async<TestState>> = useReducer<TestState, Async<TestState>>(0)
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
  const theDispatcher: Dispatcher = useReducerDispatcher(0)
  return (
    <button onClick={(): any => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncReducerDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<Async> = useReducerDispatcher<Async>(0)
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
  const theDispatcher: Dispatcher<Sync<string>> = useReducerDispatcher<Sync<string>>(0)
  return (
    <button onClick={(): any => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestNumberedAsyncReducerDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<Async<string>> = useReducerDispatcher<Async<string>>(0)
  const someFunc = (value: string) => value.toLowerCase()
  return (
    <button onClick={(): Promise<string> => theDispatcher(123)
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestNumberedAsyncMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestNumberedSyncMapperMainHook(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState> = useMapper<TestState>(0)
  return (
    <button onClick={(): any => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncMapperMainHook(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Async> = useMapper<TestState, Async>(0)
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedSyncMapperMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Sync<TestState>> = useMapper<TestState, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncTupleMapperMainHookWithReturn(): ReactElement {
  const [ state, dispatch ]: StateProviderValue<TestState, Async<TestState>> = useMapper<TestState, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncObjectMapperMainHookWithReturn(): ReactElement {
  const { state, dispatch }: StateProviderValue<TestState, Async<TestState>> = useMapper<TestState, Async<TestState>>(0)
  const someFunc = (value: TestState) => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedMapperStateHook(): ReactElement {
  const theState: TestState = useMapperState<TestState>(0)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestNumberedSyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher = useMapperDispatcher(0)
  return (
    <button onClick={(): any => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<Async> = useMapperDispatcher<Async>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestNumberedSyncMapperDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<Sync<string>> = useMapperDispatcher<Sync<string>>(0)
  return (
    <button onClick={(): any => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHookWithReturn(): ReactElement {
  const theDispatcher: Dispatcher<Async<string>> = useMapperDispatcher<Async<string>>(0)
  const someFunc = (value: string) => value.toLowerCase()
  return (
    <button onClick={(): Promise<string> => theDispatcher(123)
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestArgsSyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestArgsAsyncReducerProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestArgsSyncMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestArgsAsyncMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestArgsSyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher = useMapperDispatcher(0)
  return (
    <button onClick={(): any => theDispatcher('ACTION1', 'somevalue1', {})}>
      Children
    </button>
  )
}

function TestArgsAsyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<Async> = useMapperDispatcher<Async>(0)
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
      .then(someFunc)
    }>
      Children
    </button>
  )
}

function TestArgsSyncMapperSymbolProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestArgsAsyncMapperSymbolDispatcherHook(): ReactElement {
  const id = Symbol()
  const theDispatcher: Dispatcher<Async> = useMapperDispatcher<Async>(id)
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
