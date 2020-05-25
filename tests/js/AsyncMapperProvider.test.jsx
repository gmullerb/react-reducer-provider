// Copyright (c) 2020 Gonzalo Müller Bravo.
import * as React from 'react'

import {
  AsyncMapperProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState
} from '../../src/react-reducer-provider'

import delay from 'delay'
import { mount } from 'enzyme'

async function testMap(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(5, { value: '1' })
    default:
      return '0'
  }
}

describe('AsyncMapperProvider tests', () => {
  it('should render', async () => {
    const testInitialState = 'A'
    const provider = mount(
      <AsyncMapperProvider
        id={456}
        mapper={testMap}
        initialState={testInitialState}
      >
        <div>Child</div>
      </AsyncMapperProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 456)
    expect(provider).toHaveProp('mapper', testMap)
    expect(provider).toHaveProp('initialState', testInitialState)
  })

  it('should reduce with useMapperDispatcher and get state', async () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(557)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(557)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncMapperProvider
        id={557}
        mapper={testMap}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickChild1')
  })

  it('should reduce with useMapper and get state', async () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(558)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click{state}
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(558)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncMapperProvider
        id={558}
        mapper={testMap}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1')
  })

  it('should reduce with useMapper and get state with extra args', async () => {
    const testInitialState = 'A'
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(5, { value: extra })
        default:
          return '0'
      }
    }
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(595)
      return (
        <button onClick={() => dispatch('ACTION1', 'Superb')}>
          Click{state}
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(595)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncMapperProvider
        id={595}
        mapper={testMapArgs}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickAChildA')

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('ClickSuperbChildSuperb')
  })
})
