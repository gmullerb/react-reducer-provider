// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
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
  StateTaggedProviderValue,
  TaggedProviderGetter,
  useTaggedAny,
  useTaggedMapper,
  useTaggedMapperState,
  useTaggedMapperDispatcher
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

interface TestSyncTaggedProviderGetter extends TaggedProviderGetter<StateTaggedProviderValue<TestState1 | TestStateN>> {}

interface TestAsyncTaggedProviderGetter extends TaggedProviderGetter<StateTaggedProviderValue<TestState1 | TestStateN, Async<TestState1 | TestStateN>>> {}

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
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN>>('testNamedMapper')
  return (
    <button onClick={(): any => providers.get('Tag1').dispatch('ACTION1', 'somevalue1', {})}>
      Child{providers.get('TagN').state.lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): ReactElement {
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN>>('testNamedMapper')
  return (
    <button onClick={(): any => providers.get('TagN')[1]('ACTION1', 'somevalue1', {})}>
      Child{providers.get('Tag1')[0].lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): ReactElement {
  const providers: TestAsyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN, Async<TestState1 | TestStateN>>>('testNamedMapper')
  return (
    <button onClick={async (): Promise<void> => providers.get('Tag1').dispatch('ACTION1', 'somevalue1', {}).then(() => {})}>
      Child{providers.get('TagN')[0].lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcher(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<TestState1> = useTaggedMapperDispatcher<TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcherForAsync(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<Async<TestState1>> = useTaggedMapperDispatcher<Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapper(): ReactElement {
  const [ state, dispatch ]: StateTaggedProviderValue<TestState1> = useTaggedMapper<TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION', 'somevalue1', {}).lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperForAsync(): ReactElement {
  const [ state, dispatch ]: StateTaggedProviderValue<TestState1, Async<TestState1>> = useTaggedMapper<TestState1, Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION', 'somevalue1', {}).then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}
