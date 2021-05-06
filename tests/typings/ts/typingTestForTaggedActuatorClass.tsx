// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
// Some test may seen "over-typed", this is intentionally only for testing.
import {
  ActuatorProviderValue,
  TaggedActuatorProvider,
  TaggedProcessor,
  TaggedProviderGetter,
  injectTaggedActuator,
  injectTaggedAny
} from '../../../src/react-reducer-provider'
import React, {
  ReactElement,
  ReactNode
} from 'react'

interface TestActuatorProps<T extends Function = VoidFunction> {
  dispatch: ActuatorProviderValue<T>
  someProp: string
}

function TestInjectTaggedActuatorNoArgs(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps> {
    render() {
      return (
        <button onClick={this.props.dispatch}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectTaggedActuator<TestActuatorProps, 'dispatch'>(ClassComponentA1, 'dispatch', 'Tag1', 227)
  class ClassComponentA2 extends React.Component<TestActuatorProps> {
    render() {
      return (
        <button onClick={this.props.dispatch}>
          Click
        </button>
      )
    }
  }
  const ClassComponent2 = injectTaggedActuator<TestActuatorProps, 'dispatch'>(ClassComponentA2, 'dispatch', 'TagN', 227)
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
        <ClassComponent1 someProp='someString' />
        <ClassComponent2 someProp='someString' />
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

type AnyFunction = (...arg: any) => any

interface TestActuatorsProps<T extends Function = VoidFunction> {
  dispatchers: TaggedProviderGetter<ActuatorProviderValue<T>>
  someProp: string
}

function TestInjectTaggedActuatorWithArgs(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorsProps<AnyFunction>> {
    render() {
      return (
        <button onClick={()=> this.props.dispatchers.get('Tag1')(3)}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectTaggedAny<TestActuatorsProps<AnyFunction>, 'dispatchers'>(ClassComponentA1, 'dispatchers', 229)
  class ClassComponentA2 extends React.Component<TestActuatorsProps<AnyFunction>> {
    render() {
      return (
        <button onClick={()=> this.props.dispatchers.get('Tag1')(4)}>
          Click
        </button>
      )
    }
  }
  const ClassComponent2 = injectTaggedAny<TestActuatorsProps<AnyFunction>, 'dispatchers'>(ClassComponentA1, 'dispatchers', 229)
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
        <ClassComponent1 someProp='someString' />
        <ClassComponent2 someProp='someString' />
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

function TestUseActuatorWithReturnValue(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorsProps<AnyFunction>> {
    render() {
      return (
        <button onClick={()=> console.log(this.props.dispatchers.get('Tag1')(3))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectTaggedAny<TestActuatorsProps<AnyFunction>, 'dispatchers'>(ClassComponentA1, 'dispatchers', 229)
  class ClassComponentA2 extends React.Component<TestActuatorsProps<AnyFunction>> {
    render() {
      return (
        <button onClick={()=> console.log(this.props.dispatchers.get('Tag1')(4))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent2 = injectTaggedAny<TestActuatorsProps<AnyFunction>, 'dispatchers'>(ClassComponentA1, 'dispatchers', 229)
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
        <ClassComponent1 someProp='someString' />
        <ClassComponent2 someProp='someString' />
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}

type AnyAsyncFunction = (...arg: any) => Promise<any>

function TestUseActuatorAsyncActuator(): ReactElement {
  class ClassComponentA1 extends React.Component<TestActuatorProps<AnyAsyncFunction>> {
    render() {
      return (
        <button onClick={async ()=> console.log(await this.props.dispatch(3))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent1 = injectTaggedActuator<TestActuatorProps<AnyAsyncFunction>, 'dispatch'>(ClassComponentA1, 'dispatch', 'Tag1', 227)
  class ClassComponentA2 extends React.Component<TestActuatorProps<AnyAsyncFunction>> {
    render() {
      return (
        <button onClick={async ()=> console.log(await this.props.dispatch(4))}>
          Click
        </button>
      )
    }
  }
  const ClassComponent2 = injectTaggedActuator<TestActuatorProps<AnyAsyncFunction>, 'dispatch'>(ClassComponentA1, 'dispatch', 'TagN', 227)
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
        <ClassComponent1 someProp='someString' />
        <ClassComponent2 someProp='someString' />
      </TaggedActuatorProvider>
      Child{state}
    </div>
  )
}
