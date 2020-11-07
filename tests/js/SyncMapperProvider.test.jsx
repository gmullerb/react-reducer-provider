// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncMapperProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState
} from '../../src/react-reducer-provider'


function testMap(action) {
  switch (action) {
    case 'ACTION1':
      return '1'
    default:
      return '0'
  }
}

describe('SyncMapperProvider tests', () => {
  it('should render', () => {
    const testInitialState = 'A'
    const provider = mount(
      <SyncMapperProvider
        id={456}
        mapper={testMap}
        initialState={testInitialState}
      >
        <div>Child</div>
      </SyncMapperProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 456)
    expect(provider).toHaveProp('mapper', testMap)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should map with useMapperDispatcher and get state', () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(457)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(457)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={457}
        mapper={testMap}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChildA')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChild1')
  })

  it('should map with useMapperDispatcher, get state and init function', () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(3560)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(3560)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={3560}
        mapper={testMap}
        initialState={() => testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChildA')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChild1')
  })

  it('should map with useMapper and get state', () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(458)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click{state}
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(458)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={458}
        mapper={testMap}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1')
  })

  it('should map with useMapper and get state with extra args', () => {
    const testInitialState = 'A'
    function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return extra
        default:
          return '0'
      }
    }
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(495)
      return (
        <button onClick={() => dispatch('ACTION1', 'Yes!')}>
          Click{state}
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(495)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={495}
        mapper={testMapArgs}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickYes!ChildYes!')
  })
})
