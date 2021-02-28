// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  AsyncMapperProvider,
  injectMapper,
  injectMapperDispatcher,
  injectMapperState
} from '../../src/react-reducer-provider'

async function testMap(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(1, { value: '1' })
    default:
      return await delay(1, { value: '0' })
  }
}

describe('AsyncMapperProvider for Class components tests', () => {
  it('should map with injectMapperDispatcher and get state injectMapperState', async () => {
    const testInitialState = 'A'
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('ACTION1')}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectMapperDispatcher(ClassComponentA1, 'dispatch', 557)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectMapperState(ClassComponentA2, 'state', 557)
    const provider = mount(
      <AsyncMapperProvider
        id={557}
        mapper={testMap}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickChild1')
  })

  it('should map with injectMapper and get state injectMapperState', async () => {
    const testInitialState = 'A'
    class ClassComponentA1 extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.mapper
        return (
          <button onClick={() => dispatch('ACTION1')}>
            Click{state}
          </button>
        )
      }
    }
    const ClassComponent1 = injectMapper(ClassComponentA1, 'mapper', 558)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectMapperState(ClassComponentA2, 'state', 558)
    const provider = mount(
      <AsyncMapperProvider
        id={558}
        mapper={testMap}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1')
  })

  it('should map with injectMapper and get state injectMapperState with extra args', async () => {
    const testInitialState = 'A'
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(1, { value: extra })
        default:
          return await delay(1, { value: '0' })
      }
    }
    class ClassComponentA1 extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.mapper
        return (
          <button onClick={() => dispatch('ACTION1', 'Superb')}>
            Click{state}
          </button>
        )
      }
    }
    const ClassComponent1 = injectMapper(ClassComponentA1, 'mapper', 595)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectMapperState(ClassComponentA2, 'state', 595)
    const provider = mount(
      <AsyncMapperProvider
        id={595}
        mapper={testMapArgs}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickSuperbChildSuperb')
  })

  it('should update WrappedComponent properties', async () => {
    const testInitialState = 'A'
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('ACTION1')}>
            Click{this.props.text}
          </button>
        )
      }
    }
    const ClassComponent1 = injectMapperDispatcher(ClassComponentA1, 'dispatch', 557)
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
            <ClassComponent1 text={this.props.state}/>
          </div>
        )
      }
    }
    const ClassComponent2 = injectMapperState(ClassComponentA2, 'state', 557)
    const provider = mount(
      <AsyncMapperProvider
        id={557}
        mapper={testMap}
        initialState={testInitialState}
      >
        <ClassComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ChildAClickA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Child1Click1')
  })
})
