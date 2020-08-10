// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  AsyncReducerProvider,
  injectReducer,
  injectReducerDispatcher,
  injectReducerState
} from '../../src/react-reducer-provider'

async function testReduce(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return await delay(5, { value: '1' })
    default:
      return prevState
  }
}

describe('AsyncReducerProvider with Async reducer for Class components tests', () => {
  it('should reduce with injectReducerDispatcher and get state injectReducerState', async () => {
    const testInitialState = '0'
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('ACTION1')}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA1')
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectReducerState(ClassComponentA2, 'state', 'testNamedReducerAA1')
    const provider = mount(
      <AsyncReducerProvider
        id='testNamedReducerAA1'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with injectReducer', async () => {
    const testInitialState = '0'
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        return (
          <button onClick={() => dispatch('ACTION1')}>
            Child{state}
          </button>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA2')
    const provider = mount(
      <AsyncReducerProvider
        id='testNamedReducerAA2'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <ClassComponent />
      </AsyncReducerProvider>
    )

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Child1')
  })

  it('should get nested providers', async () => {
    const testInitialState = '0'
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        return (
          <button
            id={this.props.id}
            onClick={() => dispatch('ACTION1')}
          >
            Child{this.props.id}{state}
          </button>
        )
      }
    }
    const ClassComponent1 = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA7')
    const ClassComponent2 = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA8')
    const provider = mount(
      <AsyncReducerProvider
        id='testNamedReducerAA7'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <ClassComponent1 id='A'/>
        <AsyncReducerProvider
          id='testNamedReducerAA8'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent2 id='B'/>
        </AsyncReducerProvider>
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ChildA0ChildB0')

    provider.find('button[id="B"]').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ChildA0ChildB1')
  })

  it('should get the new state when dispatching', async () => {
    async function testReduce(prevState, action) {
      return await delay(5, { value: prevState + 1 })
    }
    const testInitialState = 0
    let newState = null
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={async () => this.props.dispatch().then(value => newState = value)}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA9')
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectReducerState(ClassComponentA2, 'state', 'testNamedReducerAA9')
    const provider = mount(
      <AsyncReducerProvider
        id='testNamedReducerAA9'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()
    await delay(20)
    provider.find('button').simulate('click')
    provider.update()
    await delay(20)

    expect(newState).toBe(2)
    expect(provider).toHaveText('ClickChild2')
  })

  it('should get the same references when Inner children change', async () => {
    const testInitialState = '0'
    let redrawsReducer = 0
    let redrawsDispatcher = 0
    let innerChildrenRedraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const stateSet = new Set()
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const InnerChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      innerChildrenRedraws++
      return (
        <button
          id='buttonIC'
          onFocus={() => setState(state + 1)}
        >
          Inner{state}
        </button>
      )
    }
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        redrawsReducer++
        this.props.stateSet.add(state)
        useReducerDispatcherSet.add(dispatch)
        return (
          <div
            id='buttonX1'
            onClick={() => {
              dispatch('ACTION1')
            }}
          >
            Child{state}
            <InnerChildComponent />
          </div>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA11z')
    class ClassComponentA1 extends React.Component {
      render() {
        redrawsDispatcher++
        useReducerDispatcherSet.add(this.props.dispatch)
        return <RelatedChildComponent
          onClick={this.props.dispatch}
        />
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA11z')
    const provider = mount(
      <div>
        <SiblingComponent />
        <AsyncReducerProvider
          id='testNamedReducerAA11z'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent stateSet={stateSet}/>
          <ClassComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </div>
    )
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(innerChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(stateSet.size).toBe(1)
    expect(provider.find('#buttonIC').length).toBe(1)
    expect(provider.find('#buttonIC')).toHaveText('Inner2')

    provider.find('#buttonIC').simulate('focus')
    provider.update()
    await delay(10)

    expect(stateSet.size).toBe(1)
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(innerChildrenRedraws).toBe(2)
    expect(relatedChildrenRedraws).toBe(1)
    expect(provider.find('#buttonIC')).toHaveText('Inner3')
  })

  it('should get the same references when Inner Inner children change', async () => {
    const testInitialState = '0'
    let redrawsReducer = 0
    let redrawsDispatcher = 0
    let innerChildrenRedraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const InnerChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      innerChildrenRedraws++
      return (
        <button
          id='buttonIC'
          onFocus={() => setState(state + 1)}
        >
          Inner{state}
        </button>
      )
    }
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        redrawsReducer++
        useReducerDispatcherSet.add(dispatch)
        return (
          <div>
            <button
              id='button1'
              onClick={() => dispatch('ACTION1')}
            >
              Child{state}
            </button>
            <InnerChildComponent />
          </div>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA12a')
    class ClassComponentA1 extends React.Component {
      render() {
        redrawsDispatcher++
        useReducerDispatcherSet.add(this.props.dispatch)
        return <RelatedChildComponent
          onClick={this.props.dispatch}
        />
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA12a')
    const provider = mount(
      <div>
        <SiblingComponent />
        <AsyncReducerProvider
          id='testNamedReducerAA12a'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent />
          <ClassComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </div>
    )
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(innerChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonIC')).toHaveText('Inner2')

    provider.find('#buttonIC').simulate('focus')
    provider.update()
    await delay(10)

    expect(useReducerDispatcherSet.size).toBe(1)
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(innerChildrenRedraws).toBe(2)
    expect(relatedChildrenRedraws).toBe(1)
    expect(provider.find('#buttonIC')).toHaveText('Inner3')
  })

  it('should get the same references when Provider siblings changes', () => {
    const testInitialState = '0'
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        redraws++
        useReducerDispatcherSet.add(dispatch)
        return (
          <button
            id='button1'
            onClick={() => dispatch('ACTION1')}
          >
            Child{state}
          </button>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA12')
    class ClassComponentA1 extends React.Component {
      render() {
        redraws++
        useReducerDispatcherSet.add(this.props.dispatch)
        return <RelatedChildComponent
          onClick={this.props.dispatch}
        />
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA12')
    const provider = mount(
      <div>
        <SiblingComponent />
        <AsyncReducerProvider
          id='testNamedReducerAA12'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent />
          <ClassComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </div>
    )
    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonS')).toHaveText('Sibling1')

    provider.find('#buttonS').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(2)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonS')).toHaveText('Sibling2')
  })

  it('should get the same references when Unrelated children changes', () => {
    const testInitialState = '0'
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        redraws++
        useReducerDispatcherSet.add(dispatch)
        return (
          <button
            id='button1'
            onClick={() => dispatch('ACTION1')}
          >
            Child{state}
          </button>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA13')
    class ClassComponentA1 extends React.Component {
      render() {
        redraws++
        useReducerDispatcherSet.add(this.props.dispatch)
        return <RelatedChildComponent
          onClick={this.props.dispatch}
        />
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA13')
    const provider = mount(
      <div>
        <SiblingComponent />
        <AsyncReducerProvider
          id='testNamedReducerAA13'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent />
          <ClassComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </div>
    )
    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonUC')).toHaveText('Unrelated2')

    provider.find('#buttonUC').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(2)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonUC')).toHaveText('Unrelated3')
  })

  it('should get the same references when Parent changes', () => {
    const testInitialState = '0'
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const ParentComponent = ({ children }) => {
      const [ state, setState ] = React.useState(3)
      return (
        <div
          id='buttonP'
          onClick={() => setState(state + 1)}
        >
          <span>Parent{state}</span>
          { children }
        </div>
      )
    }
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    class ClassComponentA extends React.Component {
      render() {
        const [ state, dispatch ] = this.props.reducer
        redraws++
        useReducerDispatcherSet.add(dispatch)
        return (
          <button
            id='button1'
            onClick={() => dispatch('ACTION1')}
          >
            Child{state}
          </button>
        )
      }
    }
    const ClassComponent = injectReducer(ClassComponentA, 'reducer', 'testNamedReducerAA14')
    class ClassComponentA1 extends React.Component {
      render() {
        redraws++
        useReducerDispatcherSet.add(this.props.dispatch)
        return <RelatedChildComponent
          onClick={this.props.dispatch}
        />
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAA14')
    const provider = mount(
      <ParentComponent>
        <SiblingComponent />
        <AsyncReducerProvider
          id='testNamedReducerAA14'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <ClassComponent />
          <ClassComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </ParentComponent>
    )
    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonP span')).toHaveText('Parent3')

    provider.find('#buttonP').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonP span')).toHaveText('Parent4')
  })

  it('should reduce with injectReducerDispatcher and get state with extra args', async () => {
    const testInitialState = '0'
    async function testReduce(prevState, action, extra1, extra2) {
      switch (action) {
        case 'ACTION1':
          return await delay(5, { value: `${extra1}${extra2}` })
        default:
          return prevState
      }
    }
    class ClassComponentA1 extends React.Component {
      render() {
        return (
          <button onClick={() => this.props.dispatch('ACTION1', 'Wow', 'Good')}>
            Click
          </button>
        )
      }
    }
    const ClassComponent1 = injectReducerDispatcher(ClassComponentA1, 'dispatch', 'testNamedReducerAArgs001')
    class ClassComponentA2 extends React.Component {
      render() {
        return (
          <div>
            Child{this.props.state}
          </div>
        )
      }
    }
    const ClassComponent2 = injectReducerState(ClassComponentA2, 'state', 'testNamedReducerAArgs001')
    const provider = mount(
      <AsyncReducerProvider
        id='testNamedReducerAArgs001'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <ClassComponent1 />
        <ClassComponent2 />
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickChildWowGood')
  })
})
