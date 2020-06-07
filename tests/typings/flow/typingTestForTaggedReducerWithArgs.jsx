// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  SyncTaggedReducerProvider,
  AsyncTaggedReducerProvider,
  useTaggedAny,
  useTaggedAnyState,
  useTaggedAnyDispatcher,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher
} from '../../../src/react-reducer-provider'

import React from 'react'

import type {
  Element,
  Node
} from 'react'
import type {
  Async,
  Dispatcher,
  AnyAsyncDispatcher,
  ProviderValue,
  SyncTaggedReducer,
  SyncTaggedReducerProps,
  AsyncTaggedReducerProps,
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

function TestSyncTaggedReducerProvider({ children }: {children: Element<any>}): Node {
  function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return prevState
    }
  }
  const reducers: SyncTaggedReducer[] = [
    ['Tag1', testReduce1, testInitialState1],
    ['TagN', testReduceN, testInitialStateN]
  ]
  return (
    <SyncTaggedReducerProvider
      id='someTaggedReducerS0'
      reducers={reducers}
    >
      {children}
    </SyncTaggedReducerProvider>
  )
}

function TestSyncTaggedReducerProviderChild(): Node {
  function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
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
    <SyncTaggedReducerProvider
      id='someTaggedReducerS0'
      reducers={[
        ['Tag1', testReduce1, testInitialState1],
        ['TagN', testReduceN, testInitialStateN]
      ]}
    >
      <div>Child1</div>
    </SyncTaggedReducerProvider>
  )
}

function TestSyncTaggedReducerProviderChildren(): Node {
  function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
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
    <SyncTaggedReducerProvider
      id='someTaggedReducerS0'
      reducers={[
        ['Tag1', testReduce1, testInitialState1],
        ['TagN', testReduceN, testInitialStateN]
      ]}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedReducerProvider>
  )
}

function TestSingletonSyncTaggedReducerProvider({ children }: {children: Element<any>}): Node {
  function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
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
    <SyncTaggedReducerProvider
      reducers={[
        ['Tag1', testReduce1, testInitialState1],
        ['TagN', testReduceN, testInitialStateN]
      ]}
    >
      {children}
    </SyncTaggedReducerProvider>
  )
}

function TestSyncTaggedReducerComponent(props: SyncTaggedReducerProps): Node {
  return (
    <SyncTaggedReducerProvider
      id={props.id}
      reducers={props.reducers}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedReducerProvider>
  )
}

function TestAsyncTaggedReducerProvider({ children }: {children: Element<any>}): Node {
  async function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return prevState
    }
  }

  async function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
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
    <AsyncTaggedReducerProvider
      id='someAsyncTaggedReducerS0'
      reducers={[
        ['Tag1', testReduce1, testInitialState1],
        ['TagN', testReduceN, testInitialStateN]
      ]}
    >
      {children}
    </AsyncTaggedReducerProvider>
  )
}

function TestSingletonAsyncTaggedReducerProvider({ children }: {children: Element<any>}): Node {
  async function testReduce1(prevState: TestState1, action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return prevState
    }
  }

  async function testReduceN(prevState: TestStateN, action: string, moreData1: string, moreDataN: {}) {
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
    <AsyncTaggedReducerProvider
      reducers={[
        ['Tag1', testReduce1, testInitialState1],
        ['TagN', testReduceN, testInitialStateN]
      ]}
    >
      {children}
    </AsyncTaggedReducerProvider>
  )
}

function TestAsyncTaggedReducerComponent(props: AsyncTaggedReducerProps): Node {
  return (
    <AsyncTaggedReducerProvider
      id={props.id}
      reducers={props.reducers}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </AsyncTaggedReducerProvider>
  )
}

function TestUseTaggedAny(): Node {
  const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedReducer')
  return (
    <button onClick={(): void => ((dispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {})}>
      Child{((states.get('Tag1'): any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): Node {
  const states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAnyState<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedReducer')
  const dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = useTaggedAnyDispatcher<'Tag1' | 'TagN'>('testNamedReducer')
  return (
    <button onClick={(): void => ((dispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {})}>
      Child{((states.get('Tag1'): any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): Node {
  const states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAnyState<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedReducer')
  const dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = useTaggedAnyDispatcher<'Tag1' | 'TagN', AnyAsyncDispatcher<>>('testNamedReducer')
  return (
    <button onClick={async (): Promise<void> => ((dispatchers.get('Tag1'): any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {}).then(() => {})}>
      Child{((states.get('Tag1'): any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedReducerStateDispatcher(): Node {
  const state: TestState1 = useTaggedReducerState<TestState1>('Tag1','testNamedReducer')
  const dispatch: Dispatcher<'ACTION', TestState1> = useTaggedReducerDispatcher<'ACTION', TestState1>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducerStateDispatcherForAsync(): Node {
  const state: TestState1 = useTaggedReducerState<TestState1>('Tag1','testNamedReducer')
  const dispatch: Dispatcher<'ACTION', Async<TestState1>> = useTaggedReducerDispatcher<'ACTION', Async<TestState1>>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducer(): Node {
  const [ state, dispatch ]: ProviderValue<TestState1, 'ACTION', TestState1> = useTaggedReducer<TestState1, 'ACTION', TestState1>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducerForAsync(): Node {
  const [ state, dispatch ]: ProviderValue<TestState1, 'ACTION', Async<TestState1>> = useTaggedReducer<TestState1, 'ACTION', Async<TestState1>>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}
