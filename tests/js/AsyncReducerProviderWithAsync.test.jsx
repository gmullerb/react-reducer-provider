// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  AsyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState
} from '../../cjs/react-reducer-provider'

import delay from 'delay'
import { mount } from 'enzyme'
import React from 'react'

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
})
