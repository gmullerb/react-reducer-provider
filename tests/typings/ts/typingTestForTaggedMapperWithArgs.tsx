// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  Async,
  Dispatcher,
  AnyAsyncDispatcher,
  Sync,
  SyncTaggedMapper,
  SyncTaggedMapperProps,
  AsyncTaggedMapperProps,
  SyncTaggedMapperProvider,
  AsyncTaggedMapperProvider,
  TaggedStates,
  TaggedDispatchers,
  TaggedProviderValue,
  useTaggedAny,
  useTaggedAnyState,
  useTaggedAnyDispatcher,
  useTaggedMapper,
  useTaggedMapperState,
  useTaggedMapperDispatcher,
  ProviderValue
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

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

function TestSyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestSyncTaggedMapperProviderChild(): ReactElement {
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
      ] as SyncTaggedMapper[]}
    >
      <div>Child1</div>
    </SyncTaggedMapperProvider>
  )
}

function TestSyncTaggedMapperProviderChildren(): ReactElement {
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
      ] as SyncTaggedMapper[]}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedMapperProvider>
  )
}

function TestSingletonSyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestAsyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestSingletonAsyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
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

function TestUseTaggedAny(): ReactElement {
  const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={(): void => dispatchers.get('Tag1')('ACTION1', 'somevalue1', {})}>
      Child{states.get('Tag1').lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): ReactElement {
  const states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAnyState<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  const dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = useTaggedAnyDispatcher<'Tag1' | 'TagN'>('testNamedMapper')
  return (
    <button onClick={(): void => dispatchers.get('Tag1')('ACTION1', 'somevalue1', {})}>
      Child{states.get('Tag1').lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): ReactElement {
  const states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAnyState<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  const dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = useTaggedAnyDispatcher<'Tag1' | 'TagN', AnyAsyncDispatcher>('testNamedMapper')
  return (
    <button onClick={async (): Promise<void> => dispatchers.get('Tag1')('ACTION1', 'somevalue1', {}).then(() => {})}>
      Child{states.get('Tag1').lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcher(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', TestState1> = useTaggedMapperDispatcher<'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcherForAsync(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', Async<TestState1>> = useTaggedMapperDispatcher<'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapper(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState1, 'ACTION', TestState1> = useTaggedMapper<TestState1, 'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperForAsync(): ReactElement {
  const [ state, dispatch ]: ProviderValue<TestState1, 'ACTION', Async<TestState1>> = useTaggedMapper<TestState1, 'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}
