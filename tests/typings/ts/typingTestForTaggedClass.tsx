// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  Async,
  Dispatcher,
  StateProviderValue,
  StateTaggedProviderValue,
  Sync,
  injectTaggedAny,
  injectTaggedMapper,
  injectTaggedMapperState,
  injectTaggedMapperDispatcher,
  injectTaggedReducer,
  injectTaggedReducerState,
  injectTaggedReducerDispatcher,
  TaggedProviderGetter
} from '../../../src/react-reducer-provider'
import React from 'react'

interface TestState1 {
  lastAction: string;
}

const testInitialState1: TestState1 = {
  lastAction: 'X'
}

interface TestStateN {
  lastAction: number;
}

const testInitialStateN: TestStateN = {
  lastAction: 0
}

interface TestSyncTaggedProviderGetter extends TaggedProviderGetter<StateTaggedProviderValue<TestState1 | TestStateN>> {}

interface TestSyncReducerMainHoc0Props { someProp: string }
interface TestSyncReducerMainHocProps extends TestSyncReducerMainHoc0Props { tagged: TestSyncTaggedProviderGetter }
interface TestSyncReducerMainHocState { someState: number }

class TestSyncReducerMainHoc extends React.Component<TestSyncReducerMainHocProps, TestSyncReducerMainHocState> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.tagged
    return (
      <button onClick={(): any => theProviders.get('Tag1')[1]('ACTION1')}>
        Child{theProviders.get('Tag1')[0].lastAction}
      </button>
    )
  }
}
const TestSyncReducerMainHoc0 = injectTaggedAny<TestSyncReducerMainHocProps, 'tagged'>(TestSyncReducerMainHoc, 'tagged', 'someNamedReducer')

class TestUseSyncReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStatesHoc0Props { someProp: string }
interface TestSyncReducerStatesHocProps extends TestSyncReducerStatesHoc0Props { providers: TestSyncTaggedProviderGetter }
interface TestSyncReducerStatesHocState { someState: number }

class TestSyncReducerStatesHoc extends React.Component<TestSyncReducerStatesHocProps, TestSyncReducerStatesHocState> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.providers
    return (
      <button>
      Child{theProviders.get('Tag1').state.lastAction}
      </button>
    )
  }
}
const TestSyncReducerStatesHoc0 = injectTaggedAny<TestSyncReducerStatesHocProps, 'providers'>(TestSyncReducerStatesHoc, 'providers', 'someNamedReducer')

class TestUseSyncReducerStatesHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStatesHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerDispatchersHoc0Props { someProp: string }
interface TestSyncReducerDispatchersHocProps extends TestSyncReducerDispatchersHoc0Props { providers: TestSyncTaggedProviderGetter }
interface TestSyncReducerDispatchersHocDispatcher { someDispatcher: number }

class TestSyncReducerDispatchersHoc extends React.Component<TestSyncReducerDispatchersHocProps, TestSyncReducerDispatchersHocDispatcher> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.providers
    return (
      <button onClick={(): any => theProviders.get('Tag1').dispatch('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncReducerDispatchersHoc0 = injectTaggedAny<TestSyncReducerStatesHocProps, 'providers'>(TestSyncReducerDispatchersHoc, 'providers', 'someNamedReducer')

class TestUseSyncReducerDispatchersHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerDispatchersHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStateHoc0Props { someProp: string }
interface TestSyncReducerStateHocProps extends TestSyncReducerStateHoc0Props { state: TestState1 }
interface TestSyncReducerStateHocState { someState: number }

class TestSyncReducerStateHoc extends React.Component<TestSyncReducerStateHocProps, TestSyncReducerStateHocState> {
  render() {
    const theState: TestState1 = this.props.state
    return (
      <button>
        Child{theState.lastAction}
      </button>
    )
  }
}
const TestSyncReducerStateHoc0 = injectTaggedReducerState<TestSyncReducerStateHocProps, 'state'>(TestSyncReducerStateHoc, 'state', 'Tag1', 'someNamedReducer')

class TestUseSyncReducerStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStateHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerDispatcherHoc0Props { someProp: string }
interface TestAsyncReducerDispatcherHocProps extends TestAsyncReducerDispatcherHoc0Props { dispatcher: Dispatcher<Async<TestState1>> }
interface TestAsyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncReducerDispatcherHoc extends React.Component<TestAsyncReducerDispatcherHocProps, TestAsyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<Async<TestState1>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncReducerDispatcherHoc0 = injectTaggedReducerDispatcher<TestAsyncReducerDispatcherHocProps, 'dispatcher'>(TestAsyncReducerDispatcherHoc, 'dispatcher', 'Tag1', 0)

class TestUseAsyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncTaggedReducerMainHoc0Props { someProp: string }
interface TestAsyncTaggedReducerMainHocProps extends TestAsyncTaggedReducerMainHoc0Props { reducer: StateProviderValue<TestState1, Async<TestState1>> }
interface TestAsyncTaggedReducerMainHocState { someState: number }

class TestAsyncTaggedReducerMainHoc extends React.Component<TestAsyncTaggedReducerMainHocProps, TestAsyncTaggedReducerMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState1, Async<TestState1>> = this.props.reducer
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncTaggedReducerMainHoc0 = injectTaggedReducer<TestAsyncTaggedReducerMainHocProps, 'reducer'>(TestAsyncTaggedReducerMainHoc, 'reducer', 'Tag1', 'someNamedReducer')

class TestUseAsyncTaggedReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncTaggedReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperMainHoc0Props { someProp: string }
interface TestSyncMapperMainHocProps extends TestSyncMapperMainHoc0Props { tagged: TestSyncTaggedProviderGetter }
interface TestSyncMapperMainHocState { someState: number }

class TestSyncMapperMainHoc extends React.Component<TestSyncMapperMainHocProps, TestSyncMapperMainHocState> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.tagged
    return (
      <button onClick={(): any => theProviders.get('Tag1').dispatch('ACTION1')}>
        Child{theProviders.get('Tag1').state.lastAction}
      </button>
    )
  }
}
const TestSyncMapperMainHoc0 = injectTaggedAny<TestSyncMapperMainHocProps, 'tagged'>(TestSyncMapperMainHoc, 'tagged', 'someNamedMapper')

class TestUseSyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStatesHoc0Props { someProp: string }
interface TestSyncMapperStatesHocProps extends TestSyncMapperStatesHoc0Props { providers: TestSyncTaggedProviderGetter }
interface TestSyncMapperStatesHocState { someState: number }

class TestSyncMapperStatesHoc extends React.Component<TestSyncMapperStatesHocProps, TestSyncMapperStatesHocState> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.providers
    return (
      <button>
      Child{theProviders.get('Tag1').state.lastAction}
      </button>
    )
  }
}
const TestSyncMapperStatesHoc0 = injectTaggedAny<TestSyncMapperStatesHocProps, 'providers'>(TestSyncMapperStatesHoc, 'providers', 'someNamedMapper')

class TestUseSyncMapperStatesHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStatesHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperDispatchersHoc0Props { someProp: string }
interface TestSyncMapperDispatchersHocProps extends TestSyncMapperDispatchersHoc0Props { providers: TestSyncTaggedProviderGetter }
interface TestSyncMapperDispatchersHocDispatcher { someDispatcher: number }

class TestSyncMapperDispatchersHoc extends React.Component<TestSyncMapperDispatchersHocProps, TestSyncMapperDispatchersHocDispatcher> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.providers
    return (
      <button onClick={(): any => theProviders.get('Tag1').dispatch('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncMapperDispatchersHoc0 = injectTaggedAny<TestSyncMapperDispatchersHocProps, 'providers'>(TestSyncMapperDispatchersHoc, 'providers', 'someNamedMapper')

class TestUseSyncMapperDispatchersHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperDispatchersHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStateHoc0Props { someProp: string }
interface TestSyncMapperStateHocProps extends TestSyncMapperStateHoc0Props { state: TestState1 }
interface TestSyncMapperStateHocState { someState: number }

class TestSyncMapperStateHoc extends React.Component<TestSyncMapperStateHocProps, TestSyncMapperStateHocState> {
  render() {
    const theState: TestState1 = this.props.state
    return (
      <button>
        Child{theState.lastAction}
      </button>
    )
  }
}
const TestSyncMapperStateHoc0 = injectTaggedMapperState<TestSyncMapperStateHocProps, 'state'>(TestSyncMapperStateHoc, 'state', 'Tag1', 'someNamedMapper')

class TestUseSyncMapperStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStateHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperDispatcherHoc0Props { someProp: string }
interface TestAsyncMapperDispatcherHocProps extends TestAsyncMapperDispatcherHoc0Props { dispatcher: Dispatcher<Async<TestState1>> }
interface TestAsyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncMapperDispatcherHoc extends React.Component<TestAsyncMapperDispatcherHocProps, TestAsyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<Async<TestState1>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncMapperDispatcherHoc0 = injectTaggedMapperDispatcher<TestAsyncMapperDispatcherHocProps, 'dispatcher'>(TestAsyncMapperDispatcherHoc, 'dispatcher', 'Tag1', 0)

class TestUseAsyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncTaggedMapperMainHoc0Props { someProp: string }
interface TestAsyncTaggedMapperMainHocProps extends TestAsyncTaggedMapperMainHoc0Props { mapper: StateProviderValue<TestState1, Async<TestState1>> }
interface TestAsyncTaggedMapperMainHocState { someState: number }

class TestAsyncTaggedMapperMainHoc extends React.Component<TestAsyncTaggedMapperMainHocProps, TestAsyncTaggedMapperMainHocState> {
  render() {
    const [ state, dispatch ]: StateProviderValue<TestState1, Async<TestState1>> = this.props.mapper
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncTaggedMapperMainHoc0 = injectTaggedMapper<TestAsyncTaggedMapperMainHocProps, 'mapper'>(TestAsyncTaggedMapperMainHoc, 'mapper', 'Tag1', 'someNamedMapper')

class TestUseAsyncTaggedMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncTaggedMapperMainHoc0 someProp='someString'/>
    )
  }
}
