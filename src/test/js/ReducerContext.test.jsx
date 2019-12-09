// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, { createContext } from 'react'
import ReducerContext, { useReducerContext, useReducerDispatcher, useReducerState } from '../../main/js/ReducerContext'

import { mount } from 'enzyme'

describe('ReducerContext tests', () => {
  it('should render', () => {
    const testInitialState = {}
    const testReduce = () => {}
    const testReducerContext = createContext(null)

    const context = mount(
      <ReducerContext
        context={testReducerContext}
        reducer={testReduce}
        initialState={testInitialState}
      >
        <div>Child</div>
      </ReducerContext>
    )

    expect(context).toHaveText('Child')
    expect(context).toHaveProp('context', testReducerContext)
    expect(context).toHaveProp('reducer', testReduce)
    expect(context).toHaveProp('initialState', testInitialState)
  })

  it('should reduce', () => {
    const testInitialState = '0'
    function testReduce(prevState, action) {
      switch (action) {
        case 'ACTION1':
          return '1'
        default:
          return prevState
      }
    }
    const testReducerContext = createContext(null)
    const context = mount(
      <ReducerContext
        context={testReducerContext}
        reducer={testReduce}
        initialState={testInitialState}
      >
        <testReducerContext.Consumer>
          {
            ([theState, theDispatcher]) => (
              <button onClick={() => theDispatcher('ACTION1')}>
                Child{theState}
              </button>
            )
          }
        </testReducerContext.Consumer>
      </ReducerContext>
    )

    expect(context).toHaveText('Child0')

    context.find('button').simulate('click')
    context.update()

    expect(context).toHaveText('Child1')
  })

  it('should get context', () => {
    const testInitialState = '0'
    function testReduce(prevState, action) {
      switch (action) {
        case 'ACTION1':
          return '1'
        default:
          return prevState
      }
    }
    const testReducerContext = createContext(null)
    const FunComponent = () => {
      const { state, dispatch } = useReducerContext(testReducerContext)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Child{state}
        </button>
      )
    }
    const context = mount(
      <ReducerContext
        context={testReducerContext}
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </ReducerContext>
    )

    expect(context).toHaveText('Child0')

    context.find('button').simulate('click')
    context.update()

    expect(context).toHaveText('Child1')
  })

  it('should get state', () => {
    const testInitialState = '0'
    function testReduce(prevState, action) {
      switch (action) {
        case 'ACTION1':
          return '1'
        default:
          return prevState
      }
    }
    const testReducerContext = createContext(null)
    const FunComponent = () => {
      const theState = useReducerState(testReducerContext)
      return (
        <button>
          Child{theState}
        </button>
      )
    }
    const context = mount(
      <ReducerContext
        context={testReducerContext}
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent />
      </ReducerContext>
    )

    expect(context).toHaveText('Child0')
  })

  it('should get dispatch', () => {
    const testInitialState = '0'
    const mockReducer = jasmine.createSpy()
    const testReducerContext = createContext(null)
    const FunComponent = () => {
      const theDispatcher = useReducerDispatcher(testReducerContext)
      return (
        <button onClick={() => theDispatcher('ACTION1')}>
          Child
        </button>
      )
    }
    const context = mount(
      <ReducerContext
        context={testReducerContext}
        reducer={mockReducer}
        initialState={testInitialState}
      >
        <FunComponent />
      </ReducerContext>
    )

    context.find('button').simulate('click')
    expect(mockReducer).toHaveBeenCalled()
  })
})
