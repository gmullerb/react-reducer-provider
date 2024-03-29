// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  AsyncMapperProvider,
  useMapper,
  useMapperDispatcher,
  useMapperState
} from '../../src/react-reducer-provider'

async function testMap(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(1, { value: '1' })
    default:
      return await delay(1, { value: '0' })
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

  it('should map with useMapperDispatcher and get state', async () => {
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

  it('should map with useMapperDispatcher, get state and init function', async () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(1557)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(1557)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncMapperProvider
        id={1557}
        mapper={testMap}
        initialState={() => testInitialState}
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

  it('should map with useMapper and get state', async () => {
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

  it('should have enumerable "state", "dispatch" & "provider" and not enumerable "0", "1" & "2", all not writable and prevent extension', () => {
    const testInitialState = 'A'
    let accessors = null
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(1, { value: extra })
        default:
          return await delay(1, { value: '0' })
      }
    }
    const FunComponent1 = () => {
      accessors = useMapper(5950)
      const [ state, dispatch ] = accessors
      return (
        <button onClick={() => dispatch('ACTION1', 'Superb')}>
          Click{state}
        </button>
      )
    }
    const provider = mount(
      <AsyncMapperProvider
        id={5950}
        mapper={testMapArgs}
        initialState={testInitialState}
      >
        <FunComponent1 />
      </AsyncMapperProvider>
    )
    expect(provider).toHaveText('ClickA')

    expect(Object.keys(accessors)).toEqual([ 'state', 'dispatch', 'provider' ])
    expect(accessors.map(e => e)).toEqual([ accessors.state, accessors.dispatch, accessors.provider ])
    expect(() => accessors.state = 1).toThrow()
    expect(() => accessors.dispatch = 1).toThrow()
    expect(() => accessors.provider = 1).toThrow()
    expect(() => accessors[0] = 1).toThrow()
    expect(() => accessors[1] = 1).toThrow()
    expect(() => accessors[2] = 1).toThrow()
    expect(() => accessors.extra = 'extra').toThrow()
    expect(() => accessors[3] = 'extra').toThrow()
  })

  it('should map with useMapper and get state with extra args', async () => {
    const testInitialState = 'A'
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(1, { value: extra })
        default:
          return await delay(1, { value: '0' })
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

  it('should map with useMapper and get state with no args', async () => {
    const testInitialState = 'A'
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(1, { value: extra })
        default:
          return await delay(1, { value: '0' })
      }
    }
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(595)
      return (
        <button onClick={() => dispatch()}>
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
    expect(provider).toHaveText('Click0Child0')
  })

  it('should not re-render when same state', async () => {
    const testInitialState = 'A'
    let redrawsDispatcher = 0
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
      redrawsDispatcher++
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

    provider.find('button').simulate('click')
    provider.update()

    await delay(10)
    expect(redrawsDispatcher).toBe(2)
    expect(provider).toHaveText('ClickChild1')
  })
})
