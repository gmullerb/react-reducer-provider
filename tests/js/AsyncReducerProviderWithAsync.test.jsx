// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import {
  AsyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState
} from '../../cjs/react-reducer-provider'

import delay from 'delay'
import { mount } from 'enzyme'

async function testReduce(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return await delay(5, { value: '1' })
    default:
      return prevState
  }
}

describe('AsyncReducerProvider with Async reducer tests', () => {
  it('should render', () => {
    const testInitialState = {}

    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAA0'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <div>Child</div>
      </AsyncReducerProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('name', 'testNamedReducerAA0')
    expect(provider).toHaveProp('reducer', testReduce)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useReducerDispatcher and get state', async () => {
    const testInitialState = '0'
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerAA1')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducerAA1')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAA1'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with useReducer', async () => {
    const testInitialState = '0'
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerAA2')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAA2'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </AsyncReducerProvider>
    )

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Child1')
  })

  it('should get nested providers', async () => {
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
      <AsyncReducerProvider
        name='testNamedReducerAA7'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent
          id='A'
          reducer='testNamedReducerAA7'
        />
        <AsyncReducerProvider
          name='testNamedReducerAA8'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent
            id='B'
            reducer='testNamedReducerAA8'
          />
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
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    let newState = null
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerAA9')
      return (
        <button onClick={async () => dispatch().then(value => newState = value)}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducerAA9')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAA9'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider).toHaveText('ClickChild0')

    provider.find('button').simulate('click')
    await delay(10)
    provider.find('button').simulate('click')
    await delay(10)

    expect(newState).toBe(2)
    expect(provider).toHaveText('ClickChild2')
  })

  it('should get the different dispatcher references after state changes', async () => {
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
      const [ state, dispatch ] = useReducer('testNamedReducer10')
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
      const dispatch = useReducerDispatcher('testNamedReducer10')
      redraws++
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
        <AsyncReducerProvider
          name='testNamedReducer10'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </AsyncReducerProvider>
      </div>
    )
    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child0')

    provider.find('#buttonRC').simulate('click')
    provider.update()
    await delay(10)

    expect(redraws).toBe(4)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(2)
    expect(useReducerDispatcherSet.size).toBe(2)
    expect(provider.find('#button1')).toHaveText('Child1')
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
      const [ state, dispatch ] = useReducer('testNamedReducer10')
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
      const dispatch = useReducerDispatcher('testNamedReducer10')
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
        <AsyncReducerProvider
          name='testNamedReducer10'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer10')
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
      const dispatch = useReducerDispatcher('testNamedReducer10')
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
        <AsyncReducerProvider
          name='testNamedReducer10'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
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
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducer10')
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
      const dispatch = useReducerDispatcher('testNamedReducer10')
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
        <AsyncReducerProvider
          name='testNamedReducer10'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent />
          <FunComponent1 />
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
})
