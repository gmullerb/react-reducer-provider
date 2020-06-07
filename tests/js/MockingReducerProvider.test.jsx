// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'
import { mount, shallow } from 'enzyme'

import * as ReducerProviderModule from '../../cjs/react-reducer-provider'


describe('Mocking tests', () => {
  it('should work when mocking and testing a custom hook', () => {
    const useCustom = (defaultAction) => {
      const [ state, dispatch ] = ReducerProviderModule.useReducer('someProvider')
      const someProcess = React.useCallback(() => {
        dispatch(state.field1 === ''
          ? defaultAction
          : 'ACTION1')
      }, [ dispatch ])
      return React.useMemo({
        field1: state.field1,
        someProcess
      }, [ state ])
    }
    const mockDispatcher = jasmine.createSpy()
    spyOn(ReducerProviderModule, 'useReducer')
      .and
      .returnValue([
        {
          field1: 'A'
        },
        mockDispatcher
      ])
    spyOn(React, 'useMemo')
      .and
      .callFake(v => v)
    spyOn(React, 'useCallback')
      .and
      .callFake(f => f)
    const FunComponent1 = () => {
      const { field1, someProcess } = useCustom('ACTION0')
      return (
        <div>
          Child{field1}
          <button onClick={() => someProcess()}>
            Click
          </button>
        </div>
      )
    }

    const provider1 = shallow(
      <FunComponent1 />
    )
    provider1.find('button').simulate('click')

    expect(provider1).toHaveText('ChildAClick')
    expect(mockDispatcher).toHaveBeenCalledWith('ACTION1')
  })

  it('should work when mocking and using enzyme shallow', () => {
    const mockDispatcher = jasmine.createSpy()
    spyOn(ReducerProviderModule, 'useReducerState')
      .and
      .returnValue('A')
    spyOn(ReducerProviderModule, 'useReducerDispatcher')
      .and
      .returnValue(mockDispatcher)
    const FunComponent1 = () => {
      const dispatch = ReducerProviderModule.useReducerDispatcher()
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = ReducerProviderModule.useReducerState()
      return (
        <div>
          Child{state}
        </div>
      )
    }

    const provider1 = shallow(
      <FunComponent1 />
    )
    provider1.find('button').simulate('click')
    expect(mockDispatcher).toHaveBeenCalled()

    const provider2 = shallow(
      <FunComponent2 />
    )
    expect(provider2).toHaveText('ChildA')
  })

  it('should work when mocking and using enzyme mount', () => {
    const mockDispatcher = jasmine.createSpy()
    spyOn(ReducerProviderModule, 'useReducerState')
      .and
      .returnValue('A')
    spyOn(ReducerProviderModule, 'useReducerDispatcher')
      .and
      .returnValue(mockDispatcher)
    const FunComponent1 = () => {
      const dispatch = ReducerProviderModule.useReducerDispatcher()
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = ReducerProviderModule.useReducerState()
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const testInitialState = '0'
    function testReduce(prevState, action) {
      switch (action) {
        case 'ACTION1':
          return '1'
        default:
          return prevState
      }
    }

    const provider = mount(
      <ReducerProviderModule.SyncReducerProvider
        reducer={testReduce}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </ReducerProviderModule.SyncReducerProvider>
    )
    provider.find('button').simulate('click')

    expect(provider).toHaveText('ClickChildA')
    expect(mockDispatcher).toHaveBeenCalled()
  })
})
