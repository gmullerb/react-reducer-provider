// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  Action,
  Async,
  AsyncMapperProvider,
  AsyncReducerProvider,
  Dispatcher,
  ProviderValue,
  Sync,
  SyncMapperProvider,
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
  const [ state, dispatch ]: ProviderValue<TestState, string> = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async> = useReducer<TestState, string, Async>('testNamedReducer')
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
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, Sync<TestState>>('testNamedReducer')
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestAsyncReducerMainHookWithReturn(): ReactElement {
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
  const [ state, dispatch ]: ProviderValue<TestState, string> = useReducer<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHook(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async> = useReducer<TestState, string, Async>(0)
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
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<TestState>> = useReducer<TestState, string, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncReducerMainHookWithReturn(): ReactElement {
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
      name={0}
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
      name={0}
      mapper={map}
      initialState={initialState}
    >
      {children}
    </AsyncMapperProvider>
  )
}

function TestNumberedSyncMapperMainHook(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState, string> = useMapper<TestState, string>(0)
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncMapperMainHook(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState, string, Async> = useMapper<TestState, string, Async>(0)
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
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<TestState>> = useMapper<TestState, string, Sync<TestState>>(0)
  return (
    <button onClick={(): TestState => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
}

function TestNumberedAsyncMapperMainHookWithReturn(): ReactElement {
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

function TestNumberedMapperStateHook(): ReactElement {
  const theState: TestState = useMapperState<TestState>(0)
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
}

function TestNumberedSyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string> = useMapperDispatcher<string>(0)
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHook(): ReactElement {
  const theDispatcher: Dispatcher<string, Async> = useMapperDispatcher<string, Async>(0)
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
  const theDispatcher: Dispatcher<number, Sync<string>> = useMapperDispatcher<number, Sync<string>>(0)
  return (
    <button onClick={(): void => {
      const newState: string = theDispatcher(123)
    }}>
      Children
    </button>
  )
}

function TestNumberedAsyncMapperDispatcherHookWithReturn(): ReactElement {
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
