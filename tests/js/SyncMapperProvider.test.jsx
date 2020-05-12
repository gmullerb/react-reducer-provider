// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import {
  SyncMapperProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState
} from '../../src/react-reducer-provider'

import { mount } from 'enzyme'

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
        name={456}
        mapper={testMap}
        initialState={testInitialState}
      >
        <div>Child</div>
      </SyncMapperProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('name', 456)
    expect(provider).toHaveProp('mapper', testMap)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useMapperDispatcher and get state', () => {
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
        name={457}
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

  it('should reduce with useMapper and get state', () => {
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
        name={458}
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
})
