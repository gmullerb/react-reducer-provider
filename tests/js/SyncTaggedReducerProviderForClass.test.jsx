// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncTaggedReducerProvider,
  injectTaggedAny,
  injectTaggedReducer,
  injectTaggedReducerState,
  injectTaggedReducerDispatcher
} from '../../src/react-reducer-provider'


function testReduce1(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return 'A'
    default:
      return prevState
  }
}


function testReduceN(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return 1
    default:
      return prevState
  }
}

describe('SyncTaggedReducerProvider for Class components tests', () => {
  it('should reduce with injectTaggedAny', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        const dispatch = this.props.reducers.get('Tag1').dispatch
        return (
          <button id='F1' onClick={() => dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedAny(ClassComponentA11, 'reducers', 'someTaggedReducerS0')
    class ClassComponentA12 extends React.Component {
      render() {
        const state = this.props.reducers.get('Tag1').state
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedAny(ClassComponentA12, 'reducers', 'someTaggedReducerS0')
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id= 'FN' onClick={() => this.props.reducers.get('TagN').dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedAny(ClassComponentAN1, 'reducers', 'someTaggedReducerS0')
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.reducers.get('TagN').state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedAny(ClassComponentAN2, 'reducers', 'someTaggedReducerS0')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS0'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with injectTaggedAny and get state with injectTaggedAny', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        const dispatch = this.props.dispatchers.get('Tag1').dispatch
        return (
          <button id='F1' onClick={() => dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedAny(ClassComponentA11, 'dispatchers', 'someTaggedReducerS1')
    class ClassComponentA12 extends React.Component {
      render() {
        const state = this.props.states.get('Tag1').state
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedAny(ClassComponentA12, 'states', 'someTaggedReducerS1')
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id= 'FN' onClick={() => this.props.dispatchers.get('TagN').dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedAny(ClassComponentAN1, 'dispatchers', 'someTaggedReducerS1')
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.states.get('TagN').state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedAny(ClassComponentAN2, 'states', 'someTaggedReducerS1')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS1'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with injectTaggedReducerDispatcher and get state with injectTaggedReducerState', () => {
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
    const ClassComponent11 = injectTaggedReducerDispatcher(ClassComponentA11, 'dispatch', 'Tag1', 'someTaggedReducerS2')
    class ClassComponentA12 extends React.Component {
      render() {
        return (
          <div>
            Child1{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedReducerState(ClassComponentA12, 'state', 'Tag1', 'someTaggedReducerS2')
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={() => this.props.dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedReducerDispatcher(ClassComponentAN1, 'dispatch', 'TagN', 'someTaggedReducerS2')
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedReducerState(ClassComponentAN2, 'state', 'TagN', 'someTaggedReducerS2')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS2'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with injectTaggedReducer', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ClassComponentA11 extends React.Component {
      render() {
        const [ , dispatch ] = this.props.reducer
        return (
          <button id='F1' onClick={() => dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedReducer(ClassComponentA11, 'reducer', 'Tag1', 'someTaggedReducerS3')
    class ClassComponentA12 extends React.Component {
      render() {
        const [ state ] = this.props.reducer
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedReducer(ClassComponentA12, 'reducer', 'Tag1', 'someTaggedReducerS3')
    class ClassComponentAN1 extends React.Component {
      render() {
        const [ , dispatch ] = this.props.reducer
        return (
          <button id= 'FN' onClick={() => dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedReducer(ClassComponentAN1, 'reducer', 'TagN', 'someTaggedReducerS3')
    class ClassComponentAN2 extends React.Component {
      render() {
        const [ state ] = this.props.reducer
        return (
          <div>
            ChildN{state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedReducer(ClassComponentAN2, 'reducer', 'TagN', 'someTaggedReducerS3')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS3'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should get nested providers', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    class ComponentClass extends React.Component {
      render() {
        const { TheClass, ...props } = this.props
        return <TheClass {...props}/>
      }
    }
    class ClassComponentA11 extends React.Component {
      render() {
        const [ , dispatch ] = this.props.reducer
        return (
          <button id={this.props.id} onClick={() => dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const createClassComponent11 = (id) => injectTaggedReducer(ClassComponentA11, 'reducer', 'Tag1', id)
    class ClassComponentA12 extends React.Component {
      render() {
        const [ state ] = this.props.reducer
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const createClassComponent12 = (id) => injectTaggedReducer(ClassComponentA12, 'reducer', 'Tag1', id)
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id={this.props.id} onClick={() => this.props.dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const createClassComponentN1 = (id) => injectTaggedReducerDispatcher(ClassComponentAN1, 'dispatch', 'TagN', id)
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const createClassComponentN2 = (id) => injectTaggedReducerState(ClassComponentAN2, 'state', 'TagN', id)
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS4'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ComponentClass TheClass={createClassComponent11('someTaggedReducerS4')} id='F1'/>
        <ComponentClass TheClass={createClassComponent12('someTaggedReducerS4')}/>
        <ComponentClass TheClass={createClassComponentN1('someTaggedReducerS4')} id='N1'/>
        <ComponentClass TheClass={createClassComponentN2('someTaggedReducerS4')}/>
        <SyncTaggedReducerProvider
          id='someTaggedReducerS5'
          reducers={[
            [ 'Tag1', testReduce1, testInitialState1 ],
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <ComponentClass TheClass={createClassComponent11('someTaggedReducerS5')} id='F2'/>
          <ComponentClass TheClass={createClassComponent12('someTaggedReducerS5')}/>
          <ComponentClass TheClass={createClassComponentN1('someTaggedReducerS5')} id='N2'/>
          <ComponentClass TheClass={createClassComponentN2('someTaggedReducerS5')}/>
        </SyncTaggedReducerProvider>
      </SyncTaggedReducerProvider>
    )

    expect(provider).toHaveText('Click1Child1XClickNChildN0Click1Child1XClickNChildN0')

    provider.find('button[id="F1"]').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0Click1Child1XClickNChildN0')

    provider.find('button[id="N2"]').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0Click1Child1XClickNChildN1')
  })

  it('should get the new state when dispatching', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    let newState1 = null
    let newStateN = null
    class ClassComponentA11 extends React.Component {
      render() {
        const dispatch = this.props.dispatchers.get('Tag1').dispatch
        return (
          <button id='F1' onClick={() => newState1 = dispatch('ACTION1')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedAny(ClassComponentA11, 'dispatchers', 'someTaggedReducerS6')
    class ClassComponentA12 extends React.Component {
      render() {
        const state = this.props.states.get('Tag1').states
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedAny(ClassComponentA12, 'states', 'someTaggedReducerS6')
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={() => newStateN = this.props.dispatch('ACTION1')}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedReducerDispatcher(ClassComponentAN1, 'dispatch', 'TagN', 'someTaggedReducerS6')
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedReducerState(ClassComponentAN2, 'state', 'TagN', 'someTaggedReducerS6')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS6'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(newState1).toBeNull()
    expect(newStateN).toBeNull()

    provider.find('#F1').simulate('click')
    provider.update()
    provider.find('#FN').simulate('click')
    provider.update()

    expect(newState1).toBe('A')
    expect(newStateN).toBe(1)
  })

  it('should reduce with injectReducerDispatcher and get state with extra args', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    function testReduce(prevState, action, extra) {
      switch (action) {
        case 'ACTION1':
          return extra
        default:
          return prevState
      }
    }
    class ClassComponentA11 extends React.Component {
      render() {
        const dispatch = this.props.dispatchers.get('Tag1').dispatch
        return (
          <button id='F1' onClick={() => dispatch('ACTION1', 'A')}>
            Click1
          </button>
        )
      }
    }
    const ClassComponent11 = injectTaggedAny(ClassComponentA11, 'dispatchers', 'someTaggedReducerS7')
    class ClassComponentA12 extends React.Component {
      render() {
        const state = this.props.states.get('Tag1').state
        return (
          <div>
            Child1{state}
          </div>
        )
      }
    }
    const ClassComponent12 = injectTaggedAny(ClassComponentA12, 'states', 'someTaggedReducerS7')
    class ClassComponentAN1 extends React.Component {
      render() {
        return (
          <button id='FN' onClick={() => this.props.dispatch('ACTION1', 1)}>
            ClickN
          </button>
        )
      }
    }
    const ClassComponentN1 = injectTaggedReducerDispatcher(ClassComponentAN1, 'dispatch', 'TagN', 'someTaggedReducerS7')
    class ClassComponentAN2 extends React.Component {
      render() {
        return (
          <div>
            ChildN{this.props.state}
          </div>
        )
      }
    }
    const ClassComponentN2 = injectTaggedReducerState(ClassComponentAN2, 'state', 'TagN', 'someTaggedReducerS7')
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS7'
        reducers={[
          [ 'Tag1', testReduce, testInitialState1 ],
          [ 'TagN', testReduce, testInitialStateN ]
        ]}
      >
        <ClassComponent11 />
        <ClassComponent12 />
        <ClassComponentN1 />
        <ClassComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })
})
