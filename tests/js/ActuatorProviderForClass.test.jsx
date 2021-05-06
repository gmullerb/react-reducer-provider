// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  ActuatorProvider,
  injectActuator
} from '../../src/react-reducer-provider'

describe('ActuatorProvider for Class component tests', () => {
  it('should injectActuator without args', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator01')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = () => setState('1')
      return (
        <div>
          <ActuatorProvider
            id='testActuator01'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChild1')
  })

  it('should injectActuator with args', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('1')}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator02')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = a => setState(a)
      return (
        <div>
          <ActuatorProvider
            id='testActuator02'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChild1')
  })

  it('should ignore actuator when null/undefined/empty', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('1')}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator03')
    const ActuatorContainer = () => {
      const [ state ] = React.useState('A')
      return (
        <div>
          <ActuatorProvider
            id='testActuator03'
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChildA')
  })

  it('should injectActuator with args and return value', () => {
    class ClassComponentA1 extends React.Component {
      constructor(props) {
        super(props)
        this.state = { v: 'B' }
      }
      render() {
        return (
          <button onClick={() => this.setState({ v: this.props.dispatch('1') })}>
            Click{this.state.v}
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator04')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = a => {
        setState(a)
        return a
      }
      return (
        <div>
          <ActuatorProvider
            id='testActuator04'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('Click1Child1')
  })

  it('should ignore actuator when null/undefined/empty and return undefined', () => {
    class ClassComponentA1 extends React.Component {
      constructor(props) {
        super(props)
        this.state = { v: 'B' }
      }
      render() {
        return (
          <button onClick={() => this.setState({ v: this.props.dispatch('1') === undefined ? 'U' : '1' })}>
            Click{this.state.v}
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator05')
    const ActuatorContainer = () => {
      const [ state ] = React.useState('A')
      return (
        <div>
          <ActuatorProvider
            id='testActuator05'
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickUChildA')
  })

  xit('should injectActuator with async', async () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator06')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = () => Promise.resolve(setState('1'))
      return (
        <div>
          <ActuatorProvider
            id='testActuator06'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    await delay(10)
    expect(component).toHaveText('ClickChild1')
  })

  xit('should injectActuator with args and return value with async', async () => {
    class ClassComponentA1 extends React.Component {
      constructor(props) {
        super(props)
        this.state = { v: 'B' }
      }
      render() {
        return (
          <button onClick={async () => this.setState({ v: await this.props.dispatch('1') })}>
            Click{this.state.v}
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator07')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = async a => {
        await delay(1)
        setState(a)
        return a
      }
      return (
        <div>
          <ActuatorProvider
            id='testActuator07'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    await delay(10)

    expect(component).toHaveText('Click1Child1')
  })

  it('should not re-render when actuator is changed', () => {
    let redrawsDispatcher = 0
    class ClassComponentA1 extends React.Component {
      render() {
        redrawsDispatcher++
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectActuator(ClassComponentA1, 'dispatch', 'testActuator08')
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const [ testActuator, setTestActuator ] = React.useState(() => testActuator1)
      return (
        <div>
          <button onClick={() => setTestActuator(() => testActuator2)}>
            ChangeAct
          </button>
          <ActuatorProvider
            id='testActuator08'
            actuator={testActuator}
          >
            <ClassComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ChangeActClickChildA')
    expect(redrawsDispatcher).toBe(1)

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ChangeActClickChild1')

    component.find('button').first()
      .simulate('click')
    component.update()

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(redrawsDispatcher).toBe(1)
    expect(component).toHaveText('ChangeActClickChild2')
  })
})
