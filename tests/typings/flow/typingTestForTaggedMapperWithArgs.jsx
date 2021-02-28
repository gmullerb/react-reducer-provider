// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  SyncTaggedMapperProvider,
  AsyncTaggedMapperProvider,
  useTaggedAny,
  useTaggedMapper,
  useTaggedMapperState,
  useTaggedMapperDispatcher
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
  TaggedProviderValue,
  TaggedProviderGetter,
  SyncTaggedMapper,
  SyncTaggedMapperProps,
  AsyncTaggedMapperProps

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

interface SyncTaggedProviderGetter extends TaggedProviderGetter<'Tag1' | 'TagN', TestState1 | TestStateN> {}

function TestSyncTaggedMapperProvider({ children }: {children: Element<any>}): Node {
  function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return {
          lastAction: 'B'
        }
    }
  }

  function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return {
          lastAction: -1
        }
    }
  }
  const mappers: SyncTaggedMapper[] = [
    ['Tag1', testMapper1, testInitialState1],
    ['TagN', testMapperN, testInitialStateN]
  ]
  return (
    <SyncTaggedMapperProvider
      id='someTaggedMapperS0'
      mappers={mappers}
    >
      {children}
    </SyncTaggedMapperProvider>
  )
}

function TestSyncTaggedMapperProviderChild(): Node {
  function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return {
          lastAction: 'B'
        }
    }
  }

  function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return {
          lastAction: -1
        }
    }
  }

  return (
    <SyncTaggedMapperProvider
      id='someTaggedMapperS0'
      mappers={[
        ['Tag1', testMapper1, testInitialState1],
        ['TagN', testMapperN, testInitialStateN]
      ]}
    >
      <div>Child1</div>
    </SyncTaggedMapperProvider>
  )
}

function TestSyncTaggedMapperProviderChildren(): Node {
  function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return {
          lastAction: 'B'
        }
    }
  }

  function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return {
          lastAction: -1
        }
    }
  }

  return (
    <SyncTaggedMapperProvider
      id='someTaggedMapperS0'
      mappers={[
        ['Tag1', testMapper1, testInitialState1],
        ['TagN', testMapperN, testInitialStateN]
      ]}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedMapperProvider>
  )
}

function TestSingletonSyncTaggedMapperProvider({ children }: {children: Element<any>}): Node {
  function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return {
          lastAction: 'B'
        }
    }
  }

  function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return {
          lastAction: -1
        }
    }
  }

  return (
    <SyncTaggedMapperProvider
      mappers={[
        ['Tag1', testMapper1, testInitialState1],
        ['TagN', testMapperN, testInitialStateN]
      ]}
    >
      {children}
    </SyncTaggedMapperProvider>
  )
}

function TestSyncTaggedMapperComponent(props: SyncTaggedMapperProps): Node {
  return (
    <SyncTaggedMapperProvider
      id={props.id}
      mappers={props.mappers}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedMapperProvider>
  )
}

function TestAsyncTaggedMapperProvider({ children }: {children: Element<any>}): Node {
  async function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return {
          lastAction: await Promise.resolve('B')
        }
    }
  }

  async function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return {
          lastAction: await Promise.resolve(-1)
        }
    }
  }

  return (
    <AsyncTaggedMapperProvider
      id='someAsyncTaggedMapperS0'
      mappers={[
        ['Tag1', testMapper1, testInitialState1],
        ['TagN', testMapperN, testInitialStateN]
      ]}
    >
      {children}
    </AsyncTaggedMapperProvider>
  )
}

function TestSingletonAsyncTaggedMapperProvider({ children }: {children: Element<any>}): Node {
  async function testMapper1(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return {
          lastAction: await Promise.resolve('B')
        }
    }
  }

  async function testMapperN(action: string, moreData1: string, moreDataN: {}) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve(1)
        }
      default:
        return {
          lastAction: await Promise.resolve(-1)
        }
    }
  }

  return (
    <AsyncTaggedMapperProvider
      mappers={[
        ['Tag1', testMapper1, testInitialState1],
        ['TagN', testMapperN, testInitialStateN]
      ]}
    >
      {children}
    </AsyncTaggedMapperProvider>
  )
}

function TestAsyncTaggedMapperComponent(props: AsyncTaggedMapperProps): Node {
  return (
    <AsyncTaggedMapperProvider
      id={props.id}
      mappers={props.mappers}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </AsyncTaggedMapperProvider>
  )
}

function TestUseTaggedAny(): Node {
  const providers: SyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={(): void => ((providers.get('Tag1').dispatch: any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {})}>
      Child{((providers.get('TagN').state: any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): Node {
  const providers: SyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={(): void => ((providers.get('Tag1')[1]: any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {})}>
      Child{((providers.get('Tag1')[0]: any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): Node {
  const providers: SyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={async (): Promise<void> => ((providers.get('Tag1').dispatch: any): Dispatcher<any, any>)('ACTION1', 'somevalue1', {}).then(() => {})}>
      Child{((providers.get('Tag1')[0]: any): TestState1).lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcher(): Node {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', TestState1> = useTaggedMapperDispatcher<'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcherForAsync(): Node {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', Async<TestState1>> = useTaggedMapperDispatcher<'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapper(): Node {
  const [ state, dispatch, provider ]: TaggedProviderValue<TestState1, 'ACTION', TestState1> = useTaggedMapper<TestState1, 'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}_{!!provider && provider.toString()}
    </button>
  )
}

function TestUseTaggedMapperForAsync(): Node {
  const { state, dispatch, tag }: TaggedProviderValue<TestState1, 'ACTION', Async<TestState1>> = useTaggedMapper<TestState1, 'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}_{!!tag && tag.toString()}
    </button>
  )
}
