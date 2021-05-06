// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  TaggedActuatorProvider,
  injectTaggedActuator,
  injectTaggedAny,
} from '../../src/react-reducer-provider'


describe('TaggedActuatorProvider for Class components tests', () => {
  it('should have "provider" & "tag, all not writable and prevent extension', () => {
    let accessors = null
    class ClassComponentA1 extends React.Component {
      render() {
        accessors = this.props.dispatch
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 227)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 227)
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
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
            <ClassComponent1/>
            <ClassComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    expect(Object.keys(accessors)).toEqual([ 'provider', 'tag' ])
    expect(accessors.provider).not.toBeFalsy()
    expect(accessors.tag).not.toBeFalsy()
    expect(() => accessors.provider = 1).toThrow()
    expect(() => accessors.tag = 1).toThrow()
    expect(() => accessors.extra = 'extra').toThrow()
    expect(() => accessors[0] = 'extra').toThrow()
  })

  it('should injectTaggedActuator without args', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 227)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 227)
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
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
            <ClassComponent1/>
            <ClassComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild1')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild2')
  })

  it('should injectTaggedAny with args', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={()=> this.props.dispatchers.get('Tag1')(3)}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedAny(ClassComponentA1, 'dispatchers', 229)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button onClick={()=> this.props.dispatchers.get('TagN')(4)}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedAny(ClassComponentA2, 'dispatchers', 229)
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = a => setState(`1${a}`)
      const testActuator2 = b => setState(`2${b}`)
      return (
        <div>
          <TaggedActuatorProvider
            id={229}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <ClassComponent1/>
            <ClassComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild13')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild24')
  })

  it('should injectTaggedActuator with args', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={()=> this.props.dispatch(3)}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 228)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button onClick={()=> this.props.dispatch(4)}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 228)
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = a => setState(`1${a}`)
      const testActuator2 = b => setState(`2${b}`)
      return (
        <div>
          <TaggedActuatorProvider
            id={228}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <ClassComponent1/>
            <ClassComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild13')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild24')
  })

  it('should use a new actuator function and not re-render', () => {
    let redrawsDispatcher = 0
    class ClassComponentA1 extends React.Component {
      render() {
        redrawsDispatcher++
        return (
          <button id='F1' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 2127)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 2127)
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const testActuator3 = () => setState('3')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: testActuator3 })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <ClassComponent1/>
              <ClassComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(redrawsDispatcher).toBe(1)
    expect(provider).toHaveText('ChangeReducerClickClickChild3')
  })

  it('should use do nothing when actuator set to null/undefined/empty', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button id='F1' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 2127)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 2127)
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: null })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <ClassComponent1/>
              <ClassComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')
  })

  it('should use a new actuator function', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button id='F1' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 2127)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 2127)
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const testActuator3 = () => setState('3')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: testActuator3 })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <ClassComponent1/>
              <ClassComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild3')
  })

  it('should use do nothing when actuators are set to null/undefined/empty', () => {
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button id='F1' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectTaggedActuator(ClassComponentA1, 'dispatch', 'Tag1', 2128)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={this.props.dispatch}>
            Click
          </button>
        )
      }
    }
    const ClassComponent2 = injectTaggedActuator(ClassComponentA2, 'dispatch', 'TagN', 2128)
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const [ actuators, setActuators ] = React.useState({ funs: [
        [ 'Tag1', testActuator1 ],
        [ 'TagN', testActuator2 ]
      ]})
      return (
        <>
          <button id='outer' onClick={() => setActuators({ funs: null })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2128}
              actuators={actuators.funs}
            >
              <ClassComponent1/>
              <ClassComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()
    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')
  })
})
