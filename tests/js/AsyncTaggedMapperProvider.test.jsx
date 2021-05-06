// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  AsyncTaggedMapperProvider,
  useTaggedMapper,
  useTaggedMapperDispatcher,
  useTaggedMapperState
} from '../../src/react-reducer-provider'


async function testMap1(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(1, { value: 'A' })
    default:
      return await delay(1, { value: 'B' })
  }
}


async function testMapN(action) {
  switch (action) {
    case 'ACTION1':
      return await delay(1, { value: 1 })
    default:
      return await delay(1, { value: -1 })
  }
}

describe('AsyncTaggedMapperProvider tests', () => {
  it('should render', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={456}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <div>Child</div>
      </AsyncTaggedMapperProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 456)
    expect(provider).toHaveProp('mappers')
    const mappers = provider.prop('mappers')
    expect(mappers[0]).toEqual(jasmine.arrayContaining([ 'Tag1', testMap1, testInitialState1 ]))
    expect(mappers[1]).toEqual(jasmine.arrayContaining([ 'TagN', testMapN, testInitialStateN ]))
  })

  it('should have enumerable "state", "dispatch", "provider" & "tag" and not enumerable "0", "1", "2" & "3", all not writable and prevent extension', () => {
    let accessors = null
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedMapper('Tag1', 497)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      accessors = useTaggedMapper('Tag1', 497)
      const [ state ] = accessors
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedMapper('TagN', 497)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedMapper('TagN', 497)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={497}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    expect(Object.keys(accessors)).toEqual([ 'state', 'dispatch', 'provider', 'tag' ])
    expect(accessors.map(e => e)).toEqual([ accessors.state, accessors.dispatch, accessors.provider, accessors.tag ])
    expect(() => accessors.state = 1).toThrow()
    expect(() => accessors.dispatch = 1).toThrow()
    expect(() => accessors.provider = 1).toThrow()
    expect(() => accessors.tag = 1).toThrow()
    expect(() => accessors[0] = 1).toThrow()
    expect(() => accessors[1] = 1).toThrow()
    expect(() => accessors[2] = 1).toThrow()
    expect(() => accessors[3] = 1).toThrow()
    expect(() => accessors.extra = 'extra').toThrow()
    expect(() => accessors[4] = 'extra').toThrow()
  })

  it('should map with useTaggedMapperDispatcher and get state with useTaggedMapperState', async () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const dispatch = useTaggedMapperDispatcher('Tag1', 457)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const state = useTaggedMapperState('Tag1', 457)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const dispatch = useTaggedMapperDispatcher('TagN', 457)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const state = useTaggedMapperState('TagN', 457)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={457}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper and get state', async () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedMapper('Tag1', 497)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedMapper('Tag1', 497)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedMapper('TagN', 497)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedMapper('TagN', 497)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={497}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper and get state with extra args', async () => {
    async function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return await delay(1, { value: extra })
        default:
          return await delay(1, { value: '0' })
      }
    }
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const dispatch = useTaggedMapperDispatcher('Tag1', 495)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const state = useTaggedMapperState('Tag1', 495)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const dispatch = useTaggedMapperDispatcher('TagN', 495)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1', 'Yes!')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const state = useTaggedMapperState('TagN', 495)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <AsyncTaggedMapperProvider
        id={495}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapArgs, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </AsyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    await delay(10)
    expect(provider).toHaveText('Click1Child1AClickNChildNYes!')
  })
})
