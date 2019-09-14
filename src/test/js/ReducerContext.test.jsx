// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, { createContext } from 'react'

import { mount } from 'enzyme'
import ReducerContext from '../../main/js/ReducerContext'

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
        <div>Children</div>
      </ReducerContext>
    )

    expect(context).toHaveText('Children')
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
                Children{theState}
              </button>
            )
          }
        </testReducerContext.Consumer>
      </ReducerContext>
    )

    expect(context).toHaveText('Children0')

    context.find('button').simulate('click')
    context.update()

    expect(context).toHaveText('Children1')
  })
})
