// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  injectReducer,
  injectReducerDispatcher,
  injectReducerState,
  injectMapper,
  injectMapperDispatcher,
  injectMapperState
} from '../../../src/react-reducer-provider'

import React from 'react'

import type {
  Async,
  Dispatcher,
  ProviderValue
} from '../../../src/react-reducer-provider'

interface TestState {
  lastAction: number;
}

interface TestSyncReducerMainHocProps { reducer: ProviderValue<TestState, string>, someProp: string }
interface TestSyncReducerMainHocState { someState: number }

class TestSyncReducerMainHoc extends React.Component<TestSyncReducerMainHocProps, TestSyncReducerMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState, string> = this.props.reducer
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestSyncReducerMainHoc0 = injectReducer<{ reducer: * }, TestSyncReducerMainHocProps>(TestSyncReducerMainHoc, 'reducer', 'someNamedReducer')

class TestUseSyncReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerMainHocProps { reducer: ProviderValue<TestState, string, Async<TestState>>, someProp: string }
interface TestAsyncReducerMainHocState { someState: number }

class TestAsyncReducerMainHoc extends React.Component<TestAsyncReducerMainHocProps, TestAsyncReducerMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = this.props.reducer
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncReducerMainHoc0 = injectReducer<{ reducer: * }, TestAsyncReducerMainHocProps>(TestAsyncReducerMainHoc, 'reducer', 'someNamedReducer')

class TestUseAsyncReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStateHocProps { state: TestState, someProp: string }
interface TestSyncReducerStateHocState { someState: number }

class TestSyncReducerStateHoc extends React.Component<TestSyncReducerStateHocProps, TestSyncReducerStateHocState> {
  render() {
    const theState: TestState = this.props.state
    return (
      <button>
        Child{theState.lastAction}
      </button>
    )
  }
}
const TestSyncReducerStateHoc0 = injectReducerState<{ state: * }, TestSyncReducerStateHocProps>(TestSyncReducerStateHoc, 'state', 'someNamedReducer')

class TestUseSyncReducerStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStateHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerDispatcherHocProps { dispatcher: Dispatcher<string>, someProp: string }
interface TestSyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestSyncReducerDispatcherHoc extends React.Component<TestSyncReducerDispatcherHocProps, TestSyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string> = this.props.dispatcher
    return (
      <button onClick={(): void => theDispatcher('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncReducerDispatcherHoc0 = injectReducerDispatcher<{ dispatcher: * }, TestSyncReducerDispatcherHocProps>(TestSyncReducerDispatcherHoc, 'dispatcher', 'someNamedReducer')

class TestUseSyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerDispatcherHocProps { dispatcher: Dispatcher<string, Async<TestState>>, someProp: string }
interface TestAsyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncReducerDispatcherHoc extends React.Component<TestAsyncReducerDispatcherHocProps, TestAsyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string, Async<TestState>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncReducerDispatcherHoc0 = injectReducerDispatcher<{ dispatcher: * }, TestAsyncReducerDispatcherHocProps>(TestAsyncReducerDispatcherHoc, 'dispatcher', 0)

class TestUseAsyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperMainHocProps { mapper: ProviderValue<TestState, string>, someProp: string }
interface TestSyncMapperMainHocState { someState: number }

class TestSyncMapperMainHoc extends React.Component<TestSyncMapperMainHocProps, TestSyncMapperMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState, string> = this.props.mapper
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestSyncMapperMainHoc0 = injectMapper<{ mapper: * }, TestSyncMapperMainHocProps>(TestSyncMapperMainHoc, 'mapper', 0)

class TestUseSyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperMainHocProps { mapper: ProviderValue<TestState, string, Async<TestState>>, someProp: string }
interface TestAsyncMapperMainHocState { someState: number }

class TestAsyncMapperMainHoc extends React.Component<TestAsyncMapperMainHocProps, TestAsyncMapperMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = this.props.mapper
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncMapperMainHoc0 = injectMapper<{ mapper: * }, TestAsyncMapperMainHocProps>(TestAsyncMapperMainHoc, 'mapper', 'someNamedMapper')

class TestUseAsyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStateHocProps { state: TestState, someProp: string }
interface TestSyncMapperStateHocState { someState: number }

class TestSyncMapperStateHoc extends React.Component<TestSyncMapperStateHocProps, TestSyncMapperStateHocState> {
  render() {
    const theState: TestState = this.props.state
    return (
      <button>
        Child{theState.lastAction}
      </button>
    )
  }
}
const TestSyncMapperStateHoc0 = injectMapperState<{ state: * }, TestSyncMapperStateHocProps>(TestSyncMapperStateHoc, 'state', 'someNamedMapper')

class TestUseSyncMapperStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStateHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperDispatcherHocProps { dispatcher: Dispatcher<string>, someProp: string }
interface TestSyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestSyncMapperDispatcherHoc extends React.Component<TestSyncMapperDispatcherHocProps, TestSyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string> = this.props.dispatcher
    return (
      <button onClick={(): void => theDispatcher('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncMapperDispatcherHoc0 = injectMapperDispatcher<{ dispatcher: * }, TestSyncMapperDispatcherHocProps>(TestSyncMapperDispatcherHoc, 'dispatcher', 'someNamedMapper')

class TestUseSyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperDispatcherHocProps { dispatcher: Dispatcher<string, Async<TestState>>, someProp: string }
interface TestAsyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncMapperDispatcherHoc extends React.Component<TestAsyncMapperDispatcherHocProps, TestAsyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string, Async<TestState>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncMapperDispatcherHoc0 = injectMapperDispatcher<{ dispatcher: * }, TestAsyncMapperDispatcherHocProps>(TestAsyncMapperDispatcherHoc, 'dispatcher', 0)

class TestUseAsyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}
