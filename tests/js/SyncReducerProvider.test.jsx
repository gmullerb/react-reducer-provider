// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState
} from '../../src/react-reducer-provider'


function testReduce(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return '1'
    default:
      return prevState
  }
}

describe('SyncReducerProvider tests', () => {
  it('should render', () => {
    const testInitialState = {}

    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer0'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <div>Child</div>
      </SyncReducerProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 'testNamedReducer0')
    expect(provider).toHaveProp('reducer', testReduce)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useReducerDispatcher and get state', () => {
    const testInitialState = '0'
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer2')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducer2')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer2'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with useReducerDispatcher, get state and init function', () => {
    const testInitialState = '0'
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer2f')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducer2f')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer2f'
        reducer={testReduce}
        initialState={() => testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with useReducer', () => {
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer1')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer1'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </SyncReducerProvider>
    )

    expect(provider).toHaveText('Child0')

    provider.find('button').simulate('click')
    provider.update()
    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('Child2')
  })

  it('should get nested providers', () => {
    const testInitialState = '0'
    const FunComponent = (props) => {
      const [ state, dispatch ] = useReducer(props.reducer)
      return (
        <button
          id={props.id}
          onClick={() => dispatch('ACTION1')}
        >
          Child{props.id}{state}
        </button>
      )
    }

    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer7'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent
          id='A'
          reducer='testNamedReducer7'
        />
        <SyncReducerProvider
          id='testNamedReducer8'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent
            id='B'
            reducer='testNamedReducer8'
          />
        </SyncReducerProvider>
      </SyncReducerProvider>
    )

    expect(provider).toHaveText('ChildA0ChildB0')

    provider.find('button[id="B"]').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChildA0ChildB1')
  })

  it('should get the new state when dispatching', () => {
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    let newState = null
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer9')
      return (
        <button onClick={() => newState = dispatch()}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducer9')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducer9'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()
    provider.find('button').simulate('click')
    provider.update()

    expect(newState).toBe(2)
    expect(provider).toHaveText('ClickChild2')
  })

  it('should get the new state when dispatching from useReducerDispatcher and using useReducer', () => {
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    let newState = null
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerD11')
      return (
        <button
          id='button1'
          onClick={() => newState = dispatch()}
        >
          Click
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerD11')
      return (
        <button
          id='button0'
          onClick={() => dispatch()}
        >
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducerD11'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
        <FunComponent1 />
      </SyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider.find('#button0')).toHaveText('Child0')

    provider.find('#button1').simulate('click')
    provider.update()
    provider.find('#button1').simulate('click')
    provider.update()

    expect(newState).toBe(2)
    expect(provider.find('#button0')).toHaveText('Child2')
  })

  it('should get the new state when dispatching from useReducer and using useReducer', () => {
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    let newState = null
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerD12')
      return (
        <button
          id='button1'
          onClick={() => dispatch()}
        >
          Click
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerD12')
      return (
        <button
          id='button0'
          onClick={() => newState = dispatch()}
        >
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducerD12'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
        <FunComponent1 />
      </SyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider.find('#button0')).toHaveText('Child0')

    provider.find('#button0').simulate('click')
    provider.update()
    provider.find('#button0').simulate('click')
    provider.update()

    expect(newState).toBe(2)
    expect(provider.find('#button0')).toHaveText('Child2')
  })

  it('should get the same dispatcher references after state changes', () => {
    const testInitialState = '0'
    let redrawsReducer = 0
    let redrawsDispatcher = 0
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer10')
      redrawsReducer++
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
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer10')
      redrawsDispatcher++
      useReducerDispatcherSet.add(dispatch)
      return React.useMemo(() => (
        <RelatedChildComponent
          onClick={dispatch}
        />
      ), [ dispatch ])
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducer10'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
      </div>
    )
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child0')

    provider.find('#buttonRC').simulate('click')
    provider.update()

    expect(redrawsReducer).toBe(2)
    expect(redrawsDispatcher).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child1')
  })

  it('should get the same references when Inner children change', () => {
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerS11')
      redrawsReducer++
      stateSet.add(state)
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
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerS11')
      redrawsDispatcher++
      useReducerDispatcherSet.add(dispatch)
      return React.useMemo(() => (
        <RelatedChildComponent
          onClick={dispatch}
        />
      ), [ dispatch ])
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducerS11'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
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

    expect(stateSet.size).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(innerChildrenRedraws).toBe(2)
    expect(relatedChildrenRedraws).toBe(1)
    expect(provider.find('#buttonIC')).toHaveText('Inner3')
  })

  it('should get the same references when Inner Inner children change', () => {
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerS12a')
      redrawsReducer++
      stateSet.add(state)
      useReducerDispatcherSet.add(dispatch)
      return (
        <div
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
          <InnerChildComponent />
        </div>
      )
    }
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerS12a')
      redrawsDispatcher++
      useReducerDispatcherSet.add(dispatch)
      return React.useMemo(() => (
        <RelatedChildComponent
          onClick={dispatch}
        />
      ), [ dispatch ])
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducerS12a'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
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

    expect(stateSet.size).toBe(1)
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer11')
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
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer11')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />
      )
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducer11'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer12')
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
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer12')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />
      )
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducer12'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer13')
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
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducer13')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />
      )
    }
    const provider = mount(
      <ParentComponent>
        <SiblingComponent />
        <SyncReducerProvider
          id='testNamedReducer13'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncReducerProvider>
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

  it('should reduce with useReducerDispatcher and get state with extra args', () => {
    const testInitialState = '0'
    function testReduceArgs(prevState, action, extra) {
      switch (action) {
        case 'ACTION1':
          return extra
        default:
          return prevState
      }
    }
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerArgs001')
      return (
        <button onClick={() => dispatch('ACTION1', 'What!')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducerArgs001')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id='testNamedReducerArgs001'
        reducer={testReduceArgs}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChildWhat!')
  })

  it('should reduce with useReducerDispatcher with symbol and get state with extra args', () => {
    const id = Symbol()
    const testInitialState = '0'
    function testReduceArgs(prevState, action, extra) {
      switch (action) {
        case 'ACTION1':
          return extra
        default:
          return prevState
      }
    }
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher(id)
      return (
        <button onClick={() => dispatch('ACTION1', 'What!')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState(id)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        id={id}
        reducer={testReduceArgs}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChildWhat!')
  })
})
