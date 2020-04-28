// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  SyncReducerProvider,
  useReducer,
  useReducerDispatcher,
  useReducerState
} from '../../src/NamedReducer'

import { mount } from 'enzyme'
import React from 'react'

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
        name='testNamedReducer0'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <div>Child</div>
      </SyncReducerProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('name', 'testNamedReducer0')
    expect(provider).toHaveProp('reducer', testReduce)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useReducerDispatcher and get state', async () => {
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
        name='testNamedReducer2'
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


  it('should reduce with useReducer', () => {
    const testInitialState = '0'
    const FunComponent = () => {
      const [state, dispatch] = useReducer('testNamedReducer1')
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Child{state}
        </button>
      )
    }
    const provider = mount(
      <SyncReducerProvider
        name='testNamedReducer1'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </SyncReducerProvider>
    )

    expect(provider).toHaveText('Child0')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('Child1')
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
        name='testNamedReducer7'
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent
          id='A'
          reducer='testNamedReducer7'
        />
        <SyncReducerProvider
          name='testNamedReducer8'
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
})
