// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import {
  SyncReducerProvider,
  useReducerDispatcher,
  useReducerState
} from '../../src/react-reducer-provider'

import { mount } from 'enzyme'

function testReduce(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return '1'
    default:
      return prevState
  }
}

describe('SingletonReducerProvider tests', () => {
  it('should reduce with useReducerDispatcher and get state', () => {
    const testInitialState = '0'
    const FunComponent1 = () => {
      const dispatch = useReducerDispatcher()
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useReducerState()
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncReducerProvider
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
})
