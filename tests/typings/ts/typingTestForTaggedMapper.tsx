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
  TaggedProviderValue,
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

interface TestFunctionAsState {
  (): number;
}

interface TestSyncTaggedProviderGetter extends TaggedProviderGetter<'Tag1' | 'TagN', TestState1 | TestStateN> {}

interface TestAsyncTaggedProviderGetter extends TaggedProviderGetter<'Tag1' | 'TagN', TestState1 | TestStateN, string, Async<TestState1 | TestStateN>> {}

function TestSyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
  function testMapper1(action: string) {
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

  function testMapperN(action: string) {
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

function TestSyncTaggedMapperProviderWithEmptyInitialState({ children }: {children: ReactNode}): ReactElement {
  function testMapper1(action: string) {
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

  function testMapperN(action: string) {
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
    ['Tag1', testMapper1],
    ['TagN', testMapperN]
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

function TestSyncTaggedMapperProviderWithFunctionAsState({ children }: {children: ReactNode}): ReactElement {
  function testMapper1(action: string) {
    switch (action) {
      case 'ACTION1':
        return (x: number, y: number) => x + y
      default:
        return (x: number, y: number) => x - y
    }
  }

  function testMapperN(action: string) {
    switch (action) {
      case 'ACTION1':
        return (x: number, y: number) => x - y
      default:
        return (x: number, y: number) => x + y
    }
  }
  const mappers: SyncTaggedMapper[] = [
    ['Tag1', testMapper1, (x: number, y: number) => x + y],
    ['TagN', testMapperN, (x: number, y: number) => x - y]
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
  function testMapper1(action: string) {
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

  function testMapperN(action: string) {
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
  function testMapper1(action: string) {
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

  function testMapperN(action: string) {
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
  function testMapper1(action: string) {
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

  function testMapperN(action: string) {
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

function TestSyncTaggedMapperComponent(props: SyncTaggedMapperProps): ReactElement {
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

function TestAsyncTaggedMapperProvider({ children }: {children: ReactNode}): ReactElement {
  async function testMapper1(action: string) {
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

  async function testMapperN(action: string) {
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
  async function testMapper1(action: string) {
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

  async function testMapperN(action: string) {
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

function TestAsyncTaggedMapperComponent(props: AsyncTaggedMapperProps): ReactElement {
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

function TestUseTaggedAny(): ReactElement {
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={(): void => providers.get('Tag1').dispatch('ACTION1')}>
      Child{providers.get('Tag1').state.lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): ReactElement {
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('testNamedMapper')
  return (
    <button onClick={(): void => providers.get('Tag1').dispatch('ACTION1')}>
      Child{providers.get('Tag1').state.lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): ReactElement {
  const providers: TestAsyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN, string, Async<TestState1 | TestStateN>>('testNamedMapper')
  return (
    <button onClick={async (): Promise<void> => providers.get('Tag1').dispatch('ACTION1').then(() => {})}>
      Child{providers.get('Tag1').state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcher(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', TestState1> = useTaggedMapperDispatcher<'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION').lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperStateDispatcherForAsync(): ReactElement {
  const state: TestState1 = useTaggedMapperState<TestState1>('Tag1','testNamedMapper')
  const dispatch: Dispatcher<'ACTION', Async<TestState1>> = useTaggedMapperDispatcher<'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION').then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedTupleMapper(): ReactElement {
  const [ state, dispatch ]: TaggedProviderValue<TestState1, 'ACTION', TestState1> = useTaggedMapper<TestState1, 'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION').lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedObjectMapper(): ReactElement {
  const { state, dispatch }: TaggedProviderValue<TestState1, 'ACTION', TestState1> = useTaggedMapper<TestState1, 'ACTION', TestState1>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION').lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedMapperWithFunctionAsState(): ReactElement {
  const { state, dispatch }: TaggedProviderValue<TestFunctionAsState, 'ACTION', TestFunctionAsState> = useTaggedMapper<TestFunctionAsState, 'ACTION', TestFunctionAsState>('Tag1','testNamedMapper')
  let result: Function
  return (
    <button onClick={(): Function => result = dispatch('ACTION')}>
      Child{state()}
    </button>
  )
}

function TestUseTaggedTupleMapperForAsync(): ReactElement {
  const [ state, dispatch ]: TaggedProviderValue<TestState1, 'ACTION', Async<TestState1>> = useTaggedMapper<TestState1, 'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION').then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedObjectMapperForAsync(): ReactElement {
  const { state, dispatch }: TaggedProviderValue<TestState1, 'ACTION', Async<TestState1>> = useTaggedMapper<TestState1, 'ACTION', Async<TestState1>>('Tag1','testNamedMapper')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION').then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}
