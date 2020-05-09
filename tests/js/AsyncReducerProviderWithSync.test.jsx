// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import {
  AsyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState
} from '../../src/react-reducer-provider'

import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

function testReduce(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return '1'
    default:
      return prevState
  }
}

describe('AsyncReducerProvider wit Sync reducer tests', () => {
  it('should render', () => {
    const testInitialState = {}

    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAS0'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <div>Child</div>
      </AsyncReducerProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('name', 'testNamedReducerAS0')
    expect(provider).toHaveProp('reducer', testReduce)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useReducerDispatcher and get state', async () => {
    const testInitialState = '0'
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerAS2')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducerAS2')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAS2'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ClickChild0')

    await act(() => {
      provider.find('button').simulate('click')
      provider.update()
    })

    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with useReducer', async () => {
    const testInitialState = '0'
    const FunComponent = () => {
      const [ state, dispatch ] = useReducer('testNamedReducerAS1')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAS1'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('Child0')

    await act(() => {
      provider.find('button').simulate('click')
      provider.update()
    })

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
        name='testNamedReducerAS7'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent
          id='A'
          reducer='testNamedReducerAS7'
        />
        <AsyncReducerProvider
          name='testNamedReducerAS8'
          reducer={testReduce}
          initialState={testInitialState}
        >
          <FunComponent
            id='B'
            reducer='testNamedReducerAS8'
          />
        </AsyncReducerProvider>
      </AsyncReducerProvider>
    )
    expect(provider).toHaveText('ChildA0ChildB0')

    await act(() => {
      provider.find('button[id="B"]').simulate('click')
      provider.update()
    })

    expect(provider).toHaveText('ChildA0ChildB1')
  })

  it('should get the new state when dispatching', async () => {
    function testReduce(prevState, action) {
      return prevState + 1
    }
    const testInitialState = 0
    let newState = null
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher('testNamedReducerAS9')
      return (
        <button onClick={async () => dispatch('ACTION1').then(value => newState = value)}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState('testNamedReducerAS9')
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncReducerProvider
        name='testNamedReducerAS9'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncReducerProvider>
    )
    expect(newState).toBeNull()
    expect(provider).toHaveText('ClickChild0')

    await act(() => {
      provider.find('button').simulate('click')
    })
    await act(() => {
      provider.find('button').simulate('click')
    })

    expect(newState).toBe(2)
    expect(provider).toHaveText('ClickChild2')
  })
})
