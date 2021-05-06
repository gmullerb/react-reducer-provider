// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  ActuatorProvider,
  ActuatorProviderValue,
  useActuator
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

function TestActuatorProvider({ children }: {children: ReactNode}): ReactElement {
  function actuate(): void {}
  return (
    <ActuatorProvider
      id='testActuator'
      actuator={actuate}
    >
      {children}
    </ActuatorProvider>
  )
}

function TestActuatorProviderWithNullActuator({ children }: {children: ReactNode}): ReactElement {
  function actuate(): void {}
  return (
    <ActuatorProvider
      id='testActuator'
      actuator={null}
    >
      {children}
    </ActuatorProvider>
  )
}

function TestActuatorProviderWithUndefinedActuator({ children }: {children: ReactNode}): ReactElement {
  function actuate(): void {}
  return (
    <ActuatorProvider
      id='testActuator'
      actuator={undefined}
    >
      {children}
    </ActuatorProvider>
  )
}

function TestUseActuatorNoArgs(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useActuator<VoidFunction>('testActuator')
    return (
      <button onClick={dispatch}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator = () => setState('1')
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <FunComponent1/>
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

type VoidFunctionA = (...arg: any) => void

function TestUseActuatorWithArgs(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useActuator<VoidFunctionA>('testActuator')
    return (
      <button onClick={() => dispatch('B')}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator = (a: string) => setState(a)
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <FunComponent1/>
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestUseActuatorWithReturnValue(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useActuator('testActuator')
    return (
      <button onClick={() => console.log(dispatch('B'))}>
        Click
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator = (a: string) => {
    setState(a)
    return a
  }
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <FunComponent1/>
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestUseActuatorAccessingProvider(): ReactElement {
  const FunComponent1 = () => {
    const dispatch = useActuator('testActuator')
    return (
      <button onClick={dispatch as any}>
        Click{dispatch.provider}
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator = () => setState('1')
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <FunComponent1/>
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestUseActuatorAsyncActuator(): ReactElement {
  const FunComponent1 = () => {
    const dispatch: ActuatorProviderValue<() => Promise<string>> = useActuator<() => Promise<string>>('testActuator')
    return (
      <button onClick={async () => console.log(await dispatch())}>
        Click{dispatch.provider}
      </button>
    )
  }
  const [state, setState] = React.useState('A')
  const testActuator = () => Promise.resolve(setState('1'))
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <FunComponent1/>
      </ActuatorProvider>
      Child{state}
    </div>
  )
}
