// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  ActuatorProvider,
  ActuatorProviderValue,
  injectActuator
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

interface TestActuatorProps<T extends Function = VoidFunction> {
  dispatch: ActuatorProviderValue<T>
  someProp: string
}

function TestInjectActuatorNoArgs(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps> {
    render() {
      return (
        <button onClick={this.props.dispatch}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectActuator<TestActuatorProps, 'dispatch'>(ClassComponentA1, 'dispatch', 'testActuator01')
  const [state, setState] = React.useState('A')
  const testActuator = () => setState('1')
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <ClassComponent1 someProp='someString' />
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestInjectActuatorWithArgs(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps<Function>> {
    render() {
      return (
        <button onClick={() => this.props.dispatch('1')}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectActuator<TestActuatorProps<Function>, 'dispatch'>(ClassComponentA1, 'dispatch', 'testActuator02')
  const [state, setState] = React.useState('A')
  const testActuator = (a: string) => setState(a)
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <ClassComponent1 someProp='someString' />
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestInjectActuatorWithReturnValue(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps<Function>> {
    render() {
      return (
        <button onClick={() => console.log(this.props.dispatch('1'))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectActuator<TestActuatorProps<Function>, 'dispatch'>(ClassComponentA1, 'dispatch', 'testActuator03')
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
        <ClassComponent1 someProp='someString' />
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

function TestInjectActuatorAccessingProvider(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps> {
    render() {
      const dispatch = this.props.dispatch
      return (
        <button onClick={dispatch}>
          Click{dispatch.provider}
        </button>
      )
    }
  }
  const ClassComponent1 = injectActuator<TestActuatorProps, 'dispatch'>(ClassComponentA1, 'dispatch', 'testActuator02')
  const [state, setState] = React.useState('A')
  const testActuator = () => setState('1')
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <ClassComponent1 someProp='someString' />
      </ActuatorProvider>
      Child{state}
    </div>
  )
}

type ActuatorFunction = (a: string) => Promise<string>

function TestInjectActuatorAsyncActuator(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps<ActuatorFunction>> {
    render() {
      return (
        <button onClick={async () => console.log(await this.props.dispatch('1'))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectActuator<TestActuatorProps<ActuatorFunction>, 'dispatch'>(ClassComponentA1, 'dispatch', 'testActuator03')
  const [state, setState] = React.useState('A')
  const testActuator = () => Promise.resolve(setState('1'))
  return (
    <div>
      <ActuatorProvider
        id='testActuator'
        actuator={testActuator}
      >
        <ClassComponent1 someProp='someString' />
      </ActuatorProvider>
      Child{state}
    </div>
  )
}
