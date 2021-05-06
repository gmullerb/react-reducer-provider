// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  ActuatorProviderValue,
  TaggedActuatorProvider,
  TaggedProcessor,
  useTaggedActuator,
  useTaggedAny
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

function TestTaggedActuatorProvider({ children }: {children: ReactNode}): ReactElement {
  function testActuator1() {}
  function testActuator2() {}
  const actuators: TaggedProcessor[] = [
    [ 'Tag1', testActuator1 ],
    [ 'TagN', testActuator2 ]
  ]
  return (
    <TaggedActuatorProvider
      id={226}
      actuators={actuators}
    >
      {children}
    </TaggedActuatorProvider>
  )
}

function TestTaggedActuatorProviderInline({ children }: {children: ReactNode}): ReactElement {
  function testActuator1() {}
  function testActuator2() {}
  return (
    <TaggedActuatorProvider
      id={226}
      actuators={[
        [ 'Tag1', testActuator1 ],
        [ 'TagN', testActuator2 ]
      ]}
    >
      {children}
    </TaggedActuatorProvider>
  )
}

function TestActuatorProviderWithNullActuators({ children }: {children: ReactNode}): ReactElement {
  function testActuator1() {}
  function testActuator2() {}
  return (
    <TaggedActuatorProvider
      id={226}
      actuators={null}
    >
      {children}
    </TaggedActuatorProvider>
  )
}

function TestTaggedActuatorProviderWithUndefinedActuators({ children }: {children: ReactNode}): ReactElement {
  function testActuator1() {}
  function testActuator2() {}
  return (
    <TaggedActuatorProvider
      id={226}
      actuators={undefined}
    >
      {children}
    </TaggedActuatorProvider>
  )
}

function TestUseTaggedActuatorNoArgs(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useTaggedActuator<VoidFunction>('Tag1', 227)

    return (
      <button onClick={dispatch}>
        Click
      </button>
    )
  }
  const FunComponent2 = () => {
    const dispatch = useTaggedActuator<VoidFunction>('TagN', 227)
    return (
      <button onClick={dispatch}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator1 = () => setState('1')
  const testActuator2 = () => setState('2')
  return (
    <div>
      <TaggedActuatorProvider
        id={227}
        actuators={[
          [ 'Tag1', testActuator1 ],
          [ 'TagN', testActuator2 ]
        ]}
      >
        <FunComponent1/>
        <FunComponent2/>
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

type AnyFunction = (...arg: any) => any

function TestUseTaggedActuatorWithArgs(): ReactElement {
  const FunComponent1 = () => {
    const dispatchers = useTaggedAny<ActuatorProviderValue<AnyFunction>>(229)

    return (
      <button onClick={()=> dispatchers.get('Tag1')(3)}>
        Click
      </button>
    )
  }
  const FunComponent2 = () => {
    const dispatchers = useTaggedAny<ActuatorProviderValue<AnyFunction>>(229)
    return (
      <button onClick={()=> dispatchers.get('TagN')(4)}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator1 = (a: string) => setState(`1${a}`)
  const testActuator2 = (b: string) => setState(`2${b}`)
  return (
    <div>
      <TaggedActuatorProvider
        id={229}
        actuators={[
          [ 'Tag1', testActuator1 ],
          [ 'TagN', testActuator2 ]
        ]}
      >
        <FunComponent1/>
        <FunComponent2/>
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

function TestUseActuatorWithReturnValue(): ReactElement {
  const FunComponent1 = () => {
    const dispatchers = useTaggedAny<ActuatorProviderValue<AnyFunction>>(229)

    return (
      <button onClick={()=> console.log(dispatchers.get('Tag1')(3))}>
        Click
      </button>
    )
  }
  const FunComponent2 = () => {
    const dispatchers = useTaggedAny<ActuatorProviderValue<AnyFunction>>(229)
    return (
      <button onClick={()=> console.log(dispatchers.get('TagN')(4))}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator1 = (a: string) => setState(`1${a}`)
  const testActuator2 = (b: string) => setState(`2${b}`)
  return (
    <div>
      <TaggedActuatorProvider
        id={229}
        actuators={[
          [ 'Tag1', testActuator1 ],
          [ 'TagN', testActuator2 ]
        ]}
      >
        <FunComponent1/>
        <FunComponent2/>
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

type AnyAsyncFunction = (...arg: any) => Promise<any>

function TestUseActuatorAsyncActuator(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useTaggedActuator<AnyAsyncFunction>('Tag1', 227)

    return (
      <button onClick={async ()=> console.log(await dispatch(3))}>
        Click
      </button>
    )
  }
  const FunComponent2 = () => {
    const dispatch = useTaggedActuator<AnyAsyncFunction>('TagN', 227)
    return (
      <button onClick={async ()=> console.log(await dispatch(4))}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator1 = async (a: string) => { setState(`1${a}`); Promise.resolve(1) }
  const testActuator2 = async (b: string) => { setState(`2${b}`); Promise.resolve(2) }
  return (
    <div>
      <TaggedActuatorProvider
        id={227}
        actuators={[
          [ 'Tag1', testActuator1 ],
          [ 'TagN', testActuator2 ]
        ]}
      >
        <FunComponent1/>
        <FunComponent2/>
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}
