// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  injectTaggedAny,
  injectTaggedAnyState,
  injectTaggedAnyDispatcher,
  injectTaggedMapper,
  injectTaggedMapperState,
  injectTaggedMapperDispatcher,
  injectTaggedReducer,
  injectTaggedReducerState,
  injectTaggedReducerDispatcher
} from '../../../src/react-reducer-provider'

import React from 'react'

import type {
  Async,
  Dispatcher,
  AnyAsyncDispatcher,
  ProviderValue,
  SyncTaggedMapper,
  SyncTaggedMapperProps,
  AsyncTaggedMapperProps,
  TaggedStates,
  TaggedDispatchers,
  TaggedProviderValue

} from '../../../src/react-reducer-provider'

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

interface TestSyncReducerMainHocProps { tagged: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN>, someProp: string }
interface TestSyncReducerMainHocState { someState: number }

class TestSyncReducerMainHoc extends React.Component<TestSyncReducerMainHocProps, TestSyncReducerMainHocState> {
  render() {
    const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.tagged
    return (
      <button onClick={(): void => ((dispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1')}>
        Child{((states.get('Tag1'): any): TestState1).lastAction}
      </button>
    )
  }
}
const TestSyncReducerMainHoc0 = injectTaggedAny<{ tagged: * }, TestSyncReducerMainHocProps>(TestSyncReducerMainHoc, 'tagged', 'someNamedReducer')

class TestUseSyncReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStatesHocProps { states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN>, someProp: string }
interface TestSyncReducerStatesHocState { someState: number }

class TestSyncReducerStatesHoc extends React.Component<TestSyncReducerStatesHocProps, TestSyncReducerStatesHocState> {
  render() {
    const theStates: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.states
    return (
      <button>
      Child{((theStates.get('Tag1'): any): TestState1).lastAction}
      </button>
    )
  }
}
const TestSyncReducerStatesHoc0 = injectTaggedAnyState<{ states: * }, TestSyncReducerStatesHocProps>(TestSyncReducerStatesHoc, 'states', 'someNamedReducer')

class TestUseSyncReducerStatesHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStatesHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerDispatchersHocProps { dispatchers: TaggedDispatchers<'Tag1' | 'TagN'>, someProp: string }
interface TestSyncReducerDispatchersHocDispatcher { someDispatcher: number }

class TestSyncReducerDispatchersHoc extends React.Component<TestSyncReducerDispatchersHocProps, TestSyncReducerDispatchersHocDispatcher> {
  render() {
    const theDispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = this.props.dispatchers
    return (
      <button onClick={(): void => ((theDispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncReducerDispatchersHoc0 = injectTaggedAnyDispatcher<{ dispatchers: * }, TestSyncReducerDispatchersHocProps>(TestSyncReducerDispatchersHoc, 'dispatchers', 'someNamedReducer')

class TestUseSyncReducerDispatchersHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerDispatchersHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncReducerStateHocProps { state: TestState1, someProp: string }
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
const TestSyncReducerStateHoc0 = injectTaggedReducerState<{ state: * }, TestSyncReducerStateHocProps>(TestSyncReducerStateHoc, 'state', 'Tag1', 'someNamedReducer')

class TestUseSyncReducerStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncReducerStateHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncReducerDispatcherHocProps { dispatcher: Dispatcher<string, Async<TestState1>>, someProp: string }
interface TestAsyncReducerDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncReducerDispatcherHoc extends React.Component<TestAsyncReducerDispatcherHocProps, TestAsyncReducerDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string, Async<TestState1>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncReducerDispatcherHoc0 = injectTaggedReducerDispatcher<{ dispatcher: * }, TestAsyncReducerDispatcherHocProps>(TestAsyncReducerDispatcherHoc, 'dispatcher', 'Tag1', 0)

class TestUseAsyncReducerDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncReducerDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncTaggedReducerMainHocProps { reducer: ProviderValue<TestState1, string, Async<TestState1>>, someProp: string }
interface TestAsyncTaggedReducerMainHocState { someState: number }

class TestAsyncTaggedReducerMainHoc extends React.Component<TestAsyncTaggedReducerMainHocProps, TestAsyncTaggedReducerMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState1, string, Async<TestState1>> = this.props.reducer
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncTaggedReducerMainHoc0 = injectTaggedReducer<{ reducer: * }, TestAsyncTaggedReducerMainHocProps>(TestAsyncTaggedReducerMainHoc, 'reducer', 'Tag1', 'someNamedReducer')

class TestUseAsyncTaggedReducerMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncTaggedReducerMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperMainHocProps { tagged: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN>, someProp: string }
interface TestSyncMapperMainHocState { someState: number }

class TestSyncMapperMainHoc extends React.Component<TestSyncMapperMainHocProps, TestSyncMapperMainHocState> {
  render() {
    const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.tagged
    return (
      <button onClick={(): void => ((dispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1')}>
        Child{((states.get('Tag1'): any): TestState1).lastAction}
      </button>
    )
  }
}
const TestSyncMapperMainHoc0 = injectTaggedAny<{ tagged: * }, TestSyncMapperMainHocProps>(TestSyncMapperMainHoc, 'tagged', 'someNamedMapper')

class TestUseSyncMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperMainHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStatesHocProps { states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN>, someProp: string }
interface TestSyncMapperStatesHocState { someState: number }

class TestSyncMapperStatesHoc extends React.Component<TestSyncMapperStatesHocProps, TestSyncMapperStatesHocState> {
  render() {
    const theStates: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.states
    return (
      <button>
      Child{((theStates.get('Tag1'): any): TestState1).lastAction}
      </button>
    )
  }
}
const TestSyncMapperStatesHoc0 = injectTaggedAnyState<{ states: * }, TestSyncMapperStatesHocProps>(TestSyncMapperStatesHoc, 'states', 'someNamedMapper')

class TestUseSyncMapperStatesHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStatesHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperDispatchersHocProps { dispatchers: TaggedDispatchers<'Tag1' | 'TagN'>, someProp: string }
interface TestSyncMapperDispatchersHocDispatcher { someDispatcher: number }

class TestSyncMapperDispatchersHoc extends React.Component<TestSyncMapperDispatchersHocProps, TestSyncMapperDispatchersHocDispatcher> {
  render() {
    const theDispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = this.props.dispatchers
    return (
      <button onClick={(): void => ((theDispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1')}>
        Children
      </button>
    )
  }
}
const TestSyncMapperDispatchersHoc0 = injectTaggedAnyDispatcher<{ dispatchers: * }, TestSyncMapperDispatchersHocProps>(TestSyncMapperDispatchersHoc, 'dispatchers', 'someNamedMapper')

class TestUseSyncMapperDispatchersHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperDispatchersHoc0 someProp='someString'/>
    )
  }
}

interface TestSyncMapperStateHocProps { state: TestState1, someProp: string }
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
const TestSyncMapperStateHoc0 = injectTaggedMapperState<{ state: * }, TestSyncMapperStateHocProps>(TestSyncMapperStateHoc, 'state', 'Tag1', 'someNamedMapper')

class TestUseSyncMapperStateHoc extends React.Component<{}> {
  render() {
    return (
      <TestSyncMapperStateHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncMapperDispatcherHocProps { dispatcher: Dispatcher<string, Async<TestState1>>, someProp: string }
interface TestAsyncMapperDispatcherHocDispatcher { someDispatcher: number }

class TestAsyncMapperDispatcherHoc extends React.Component<TestAsyncMapperDispatcherHocProps, TestAsyncMapperDispatcherHocDispatcher> {
  render() {
    const theDispatcher: Dispatcher<string, Async<TestState1>> = this.props.dispatcher
    const someFunc = () => {}
    return (
      <button onClick={(): Promise<void> => theDispatcher('ACTION1', 'somevalue1', {})
        .then(someFunc)}>
          Children
      </button>
    )
  }
}
const TestAsyncMapperDispatcherHoc0 = injectTaggedMapperDispatcher<{ dispatcher: * }, TestAsyncMapperDispatcherHocProps>(TestAsyncMapperDispatcherHoc, 'dispatcher', 'Tag1', 0)

class TestUseAsyncMapperDispatcherHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncMapperDispatcherHoc0 someProp='someString'/>
    )
  }
}

interface TestAsyncTaggedMapperMainHocProps { mapper: ProviderValue<TestState1, string, Async<TestState1>>, someProp: string }
interface TestAsyncTaggedMapperMainHocState { someState: number }

class TestAsyncTaggedMapperMainHoc extends React.Component<TestAsyncTaggedMapperMainHocProps, TestAsyncTaggedMapperMainHocState> {
  render() {
    const [ state, dispatch ]: ProviderValue<TestState1, string, Async<TestState1>> = this.props.mapper
    return (
      <button onClick={async () => await dispatch('ACTION1').then(() => {})}>
        Child{state.lastAction}
      </button>
    )
  }
}
const TestAsyncTaggedMapperMainHoc0 = injectTaggedMapper<{ mapper: * }, TestAsyncTaggedMapperMainHocProps>(TestAsyncTaggedMapperMainHoc, 'mapper', 'Tag1', 'someNamedMapper')

class TestUseAsyncTaggedMapperMainHoc extends React.Component<{}> {
  render() {
    return (
      <TestAsyncTaggedMapperMainHoc0 someProp='someString'/>
    )
  }
}
