// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncTaggedMapperProvider,
  useTaggedMapper,
  useTaggedMapperDispatcher,
  useTaggedMapperState
} from '../../src/react-reducer-provider'


function testMap1(action) {
  switch (action) {
    case 'ACTION1':
      return 'A'
    default:
      return 'B'
  }
}


function testMapN(action) {
  switch (action) {
    case 'ACTION1':
      return 1
    default:
      return -1
  }
}

describe('SyncTaggedMapperProvider tests', () => {
  it('should render', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const provider = mount(
      <SyncTaggedMapperProvider
        id={456}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ],
          [ 'TagN', testMapN, testInitialStateN ]
        ]}
      >
        <div>Child</div>
      </SyncTaggedMapperProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 456)
    expect(provider).toHaveProp('mappers')
    const mappers = provider.prop('mappers')
    expect(mappers[0]).toEqual(jasmine.arrayContaining([ 'Tag1', testMap1, testInitialState1 ]))
    expect(mappers[1]).toEqual(jasmine.arrayContaining([ 'TagN', testMapN, testInitialStateN ]))
  })

  it('should map with useTaggedMapperDispatcher and get state with useTaggedMapperState', () => {
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
      <SyncTaggedMapperProvider
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
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper and get state', () => {
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
      <SyncTaggedMapperProvider
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
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper and get state with extra args', () => {
    function testMapArgs(action, extra) {
      switch (action) {
        case 'ACTION1':
          return extra
        default:
          return '0'
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
      <SyncTaggedMapperProvider
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
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildNYes!')
  })
})
