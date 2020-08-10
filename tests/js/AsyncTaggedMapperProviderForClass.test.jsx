// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  AsyncTaggedMapperProvider,
  injectTaggedMapper,
  injectTaggedMapperDispatcher,
  injectTaggedMapperState
} from '../../src/react-reducer-provider'


async function testMap1(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(5, { value: 'A' })
    default:
      return await delay(5, { value: 'B' })
  }
}


async function testMapN(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(5, { value: 1 })
    default:
      return await delay(5, { value: -1 })
  }
}

describe('AsyncTaggedMapperProvider for Class components tests', () => {
  it('should map with injectTaggedMapperDispatcher and get state with injectTaggedMapperState', async () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        return (
          <button id='F1' onClick={() => this.props.dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedMapperDispatcher(ClassComponentA11, 'dispatch', 'Tag1', 457)
    class ClassComponentA12 extends React.Component {
      render() {
        return (
          <div>
            Child1{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedMapperState(ClassComponentA12, 'state', 'Tag1', 457)
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={() => this.props.dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedMapperDispatcher(ClassComponentAN1, 'dispatch', 'TagN', 457)
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedMapperState(ClassComponentAN2, 'state', 'TagN', 457)
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={457}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with injectTaggedMapper and get state', async () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        const [ , dispatch ] = this.props.mapper
        return (
          <button id='F1' onClick={() => dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedMapper(ClassComponentA11, 'mapper', 'Tag1', 497)
    class ClassComponentA12 extends React.Component {
      render() {
        const [ state ] = this.props.mapper
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedMapper(ClassComponentA12, 'mapper', 'Tag1', 497)
    class ClassComponentAN1 extends React.Component {
      render() {
        const [ , dispatch ] = this.props.mapper
        return (
          <button id= 'FN' onClick={() => dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedMapper(ClassComponentAN1, 'mapper', 'TagN', 497)
    class ClassComponentAN2 extends React.Component {
      render() {
        const [ state ] = this.props.mapper
        return (
          <div>
            ChildN{state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedMapper(ClassComponentAN2, 'mapper', 'TagN', 497)
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={497}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper and get state with extra args', async () => {
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(5, { value: extra })
        default:
          return await delay(5, { value: '0' })
      }
    }
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        return (
          <button id='F1' onClick={() => this.props.dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedMapperDispatcher(ClassComponentA11, 'dispatch', 'Tag1', 495)
    class ClassComponentA12 extends React.Component {
      render() {
        return (
          <div>
            Child1{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedMapperState(ClassComponentA12, 'state', 'Tag1', 495)
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={() => this.props.dispatch('ACTION1', 'Yes!')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedMapperDispatcher(ClassComponentAN1, 'dispatch', 'TagN', 495)
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedMapperState(ClassComponentAN2, 'state', 'TagN', 495)
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={495}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapArgs, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildNYes!')
  })
})
