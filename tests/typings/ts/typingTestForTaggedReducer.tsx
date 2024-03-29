// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  Async,
  Dispatcher,
  AnyAsyncDispatcher,
  Sync,
  SyncTaggedReducer,
  SyncTaggedReducerProps,
  AsyncTaggedReducerProps,
  SyncTaggedReducerProvider,
  AsyncTaggedReducerProvider,
  StateTaggedProviderValue,
  TaggedProviderGetter,
  useTaggedAny,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher
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

function TestSyncTaggedReducerProvider({ children }: {children: ReactNode}): ReactElement {
  function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string) {
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

function TestSyncTaggedReducerProviderChild(): ReactElement {
  function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string) {
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
      ] as SyncTaggedReducer[]}
    >
      <div>Child1</div>
    </SyncTaggedReducerProvider>
  )
}

function TestSyncTaggedReducerProviderChildren(): ReactElement {
  function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string) {
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
      ] as SyncTaggedReducer[]}
    >
      <div>Child1</div>
      <div>ChildN</div>
    </SyncTaggedReducerProvider>
  )
}

function TestSingletonSyncTaggedReducerProvider({ children }: {children: ReactNode}): ReactElement {
  function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 'A'
        }
      default:
        return prevState
    }
  }

  function testReduceN(prevState: TestStateN, action: string) {
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

function TestSyncTaggedReducerComponent(props: SyncTaggedReducerProps): ReactElement {
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

function TestAsyncTaggedReducerProvider({ children }: {children: ReactNode}): ReactElement {
  async function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return prevState
    }
  }

  async function testReduceN(prevState: TestStateN, action: string) {
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

function TestSingletonAsyncTaggedReducerProvider({ children }: {children: ReactNode}): ReactElement {
  async function testReduce1(prevState: TestState1, action: string) {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: await Promise.resolve('A')
        }
      default:
        return prevState
    }
  }

  async function testReduceN(prevState: TestStateN, action: string) {
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

function TestAsyncTaggedReducerComponent(props: AsyncTaggedReducerProps): ReactElement {
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

function TestUseTaggedAny(): ReactElement {
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN>>('testNamedReducer')
  return (
    <button onClick={(): any => providers.get('Tag1').dispatch('ACTION1')}>
      Child{providers.get('TagN').state.lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcher(): ReactElement {
  const providers: TestSyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN>>('testNamedReducer')
  return (
    <button onClick={(): any => providers.get('Tag1')[1]('ACTION1')}>
      Child{providers.get('TagN')[0].lastAction}
    </button>
  )
}

function TestUseTaggedAnyStateDispatcherForAsync(): ReactElement {
  const providers: TestAsyncTaggedProviderGetter = useTaggedAny<StateTaggedProviderValue<TestState1 | TestStateN, Async<TestState1 | TestStateN>>>('testNamedReducer')
  return (
    <button onClick={async (): Promise<void> => providers.get('Tag1').dispatch('ACTION1').then(() => {})}>
      Child{providers.get('TagN')[0].lastAction}
    </button>
  )
}

function TestUseTaggedReducerStateDispatcher(): ReactElement {
  const state: TestState1 = useTaggedReducerState<TestState1>('Tag1','testNamedReducer')
  const dispatch: Dispatcher<TestState1> = useTaggedReducerDispatcher<TestState1>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION').lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducerStateDispatcherForAsync(): ReactElement {
  const state: TestState1 = useTaggedReducerState<TestState1>('Tag1','testNamedReducer')
  const dispatch: Dispatcher<Async<TestState1>> = useTaggedReducerDispatcher<Async<TestState1>>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION').then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducer(): ReactElement {
  const [ state, dispatch ]: StateTaggedProviderValue<TestState1> = useTaggedReducer<TestState1>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={(): string => result = dispatch('ACTION').lastAction}>
      Child{state.lastAction}
    </button>
  )
}

function TestUseTaggedReducerForAsync(): ReactElement {
  const [ state, dispatch ]: StateTaggedProviderValue<TestState1, Async<TestState1>> = useTaggedReducer<TestState1, Async<TestState1>>('Tag1','testNamedReducer')
  let result: string
  return (
    <button onClick={async (): Promise<string> => result = await dispatch('ACTION').then(state => state.lastAction)}>
      Child{state.lastAction}
    </button>
  )
}
