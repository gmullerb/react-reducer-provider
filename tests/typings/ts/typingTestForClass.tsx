// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  Async,
  Dispatcher,
  StateProviderValue,
  Sync,
  injectMapper,
  injectMapperDispatcher,
  injectMapperState,
  injectReducer,
  injectReducerDispatcher,
  injectReducerState
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

interface TestSyncReducerMainHoc0Props { someProp: string }
interface TestSyncReducerMainHocProps extends TestSyncReducerMainHoc0Props { reducer: StateProviderValue<TestState> }
interface TestSyncReducerMainHocState { someState: number }

class TestSyncReducerMainHoc extends React.Component<TestSyncReducerMainHocProps, TestSyncReducerMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState> = this.props.reducer
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestSyncReducerMainHoc0 = injectReducer<TestSyncReducerMainHocProps, 'reducer'>(TestSyncReducerMainHoc, 'reducer', 'someNamedReducer')

class TestUseSyncReducerMainHoc extends React.Component {
  render() {
    return (
      <TestSyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerMainHoc0Props { someProp: string }
interface TestAsyncReducerMainHocProps extends TestAsyncReducerMainHoc0Props { reducer: StateProviderValue<TestState, Async<TestState>> }
interface TestAsyncReducerMainHocState { someState: number }

class TestAsyncReducerMainHoc extends React.Component<TestAsyncReducerMainHocProps, TestAsyncReducerMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState, Async<TestState>> = this.props.reducer
    return (
      <button onClick={async (): Promise<void> => await dispatch('ACTION1').then(() => {})
      }>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncReducerMainHoc0 = injectReducer<TestAsyncReducerMainHocProps, 'reducer'>(TestAsyncReducerMainHoc, 'reducer', 'someNamedReducer')

class TestUseAsyncReducerMainHoc extends React.Component {
  render() {
    return (
      <TestAsyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStateHoc0Props { someProp: string }
interface TestSyncReducerStateHocProps extends TestSyncReducerStateHoc0Props { state: TestState }
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
const TestSyncReducerStateHoc0 = injectReducerState<TestSyncReducerStateHocProps, 'state'>(TestSyncReducerStateHoc, 'state', 'someNamedReducer')

class TestUseSyncReducerStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStateHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerDispatcherHoc0Props { someProp: string }
interface TestSyncReducerDispatcherHocProps extends TestSyncReducerDispatcherHoc0Props { dispatcher: Dispatcher }
interface TestSyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestSyncReducerDispatcherHoc extends React.Component<TestSyncReducerDispatcherHocProps, TestSyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher = this.props.dispatcher
    return (
      <button onClick={(): any => theDispatcher('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncReducerDispatcherHoc0 = injectReducerDispatcher<TestSyncReducerDispatcherHocProps, 'dispatcher'>(TestSyncReducerDispatcherHoc, 'dispatcher', 'someNamedReducer')

class TestUseSyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerDispatcherHoc0Props { someProp: string }
interface TestAsyncReducerDispatcherHocProps extends TestAsyncReducerDispatcherHoc0Props { dispatcher: Dispatcher<Async<TestState>> }
interface TestAsyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncReducerDispatcherHoc extends React.Component<TestAsyncReducerDispatcherHocProps, TestAsyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<Async<TestState>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncReducerDispatcherHoc0 = injectReducerDispatcher<TestAsyncReducerDispatcherHocProps, 'dispatcher'>(TestAsyncReducerDispatcherHoc, 'dispatcher', 0)

class TestUseAsyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperMainHoc0Props { someProp: string }
interface TestSyncMapperMainHocProps extends TestSyncMapperMainHoc0Props { mapper: StateProviderValue<TestState>, someProp: string }
interface TestSyncMapperMainHocState { someState: number }

class TestSyncMapperMainHoc extends React.Component<TestSyncMapperMainHocProps, TestSyncMapperMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState> = this.props.mapper
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestSyncMapperMainHoc0 = injectMapper<TestSyncMapperMainHocProps, 'mapper'>(TestSyncMapperMainHoc, 'mapper', 0)

class TestUseSyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperMainHoc0Props { someProp: string }
interface TestAsyncMapperMainHocProps extends TestAsyncMapperMainHoc0Props { mapper: StateProviderValue<TestState, Async<TestState>> }
interface TestAsyncMapperMainHocState { someState: number }

class TestAsyncMapperMainHoc extends React.Component<TestAsyncMapperMainHocProps, TestAsyncMapperMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState, Async<TestState>> = this.props.mapper
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncMapperMainHoc0 = injectMapper<TestAsyncMapperMainHocProps, 'mapper'>(TestAsyncMapperMainHoc, 'mapper', 'someNamedMapper')

class TestUseAsyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStateHoc0Props { someProp: string }
interface TestSyncMapperStateHocProps extends TestSyncMapperStateHoc0Props { state: TestState }
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
const TestSyncMapperStateHoc0 = injectMapperState<TestSyncMapperStateHocProps, 'state'>(TestSyncMapperStateHoc, 'state', 'someNamedMapper')

class TestUseSyncMapperStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStateHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperDispatcherHoc0Props { someProp: string }
interface TestSyncMapperDispatcherHocProps extends TestSyncMapperDispatcherHoc0Props { dispatcher: Dispatcher }
interface TestSyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestSyncMapperDispatcherHoc extends React.Component<TestSyncMapperDispatcherHocProps, TestSyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher = this.props.dispatcher
    return (
      <button onClick={(): any => theDispatcher('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncMapperDispatcherHoc0 = injectMapperDispatcher<TestSyncMapperDispatcherHocProps, 'dispatcher'>(TestSyncMapperDispatcherHoc, 'dispatcher', 'someNamedMapper')

class TestUseSyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperDispatcherHoc0Props { someProp: string }
interface TestAsyncMapperDispatcherHocProps extends TestAsyncMapperDispatcherHoc0Props { dispatcher: Dispatcher<Async<TestState>> }
interface TestAsyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncMapperDispatcherHoc extends React.Component<TestAsyncMapperDispatcherHocProps, TestAsyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<Async<TestState>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncMapperDispatcherHoc0 = injectMapperDispatcher<TestAsyncMapperDispatcherHocProps, 'dispatcher'>(TestAsyncMapperDispatcherHoc, 'dispatcher', 0)

class TestUseAsyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}
