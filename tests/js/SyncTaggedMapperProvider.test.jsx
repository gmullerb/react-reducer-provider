// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncTaggedMapperProvider,
  useTaggedAny,
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
      const [ , dispatch, provider, tag ] = useTaggedMapper('Tag1', 497)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1{tag}_{provider}
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
    expect(provider).toHaveText('Click1Tag1_497Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Tag1_497Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Tag1_497Child1AClickNChildN1')
  })

  it('should map with useTaggedMapper, get state and init function', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const { dispatch, provider, tag } = useTaggedMapper('Tag1', 3497)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1{tag}_{provider}
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedMapper('Tag1', 3497)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedMapper('TagN', 3497)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedMapper('TagN', 3497)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedMapperProvider
        id={3497}
        mappers={[
          [ 'Tag1', testMap1, () => testInitialState1 ],
          [ 'TagN', testMapN, () => testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Tag1_3497Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Tag1_3497Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Tag1_3497Child1AClickNChildN1')
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

  it('should map with useTaggedMapper and get state when initial state empty', () => {
    const FunComponent11 = () => {
      const { dispatch } = useTaggedMapper('Tag1', 457)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const { state } = useTaggedMapper('Tag1', 457)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const { dispatch } = useTaggedMapper('TagN', 457)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const { state } = useTaggedMapper('TagN', 457)
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
          [ 'Tag1', testMap1 ],
          [ 'TagN', testMapN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1ClickNChildN')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should use a new mapper function', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    function testMap2(action) {
      switch (action) {
        case 'C':
          return extra
        default:
          return 'D'
      }
    }
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedMapper('Tag1', 496)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedMapper('Tag1', 496)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedMapper('TagN', 496)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedMapper('TagN', 496)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const MainComponent = () => {
      const [ mapper, setMapper ] = React.useState({ fun: testMap1 })
      return (
        <>
          <button id='outer' onClick={() => setMapper({ fun: testMap2 })}>
            ChangeReducer
          </button>
          <SyncTaggedMapperProvider
            id={496}
            mappers={[
              [ 'Tag1', mapper.fun, testInitialState1 ],
              [ 'TagN', testMapN, testInitialStateN ]
            ]}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedMapperProvider>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClick1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN1')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1DClickNChildN1')
  })

  it('should default to last state when mapper is set to null', () => {
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
    const MainComponent = () => {
      const [ mapper, setMapper ] = React.useState({ fun: testMap1 })
      return (
        <>
          <button id='outer' onClick={() => setMapper({ fun: null })}>
            ChangeReducer
          </button>
          <SyncTaggedMapperProvider
            id={497}
            mappers={[
              [ 'Tag1', mapper.fun, testInitialState1 ],
              [ 'TagN', testMapN, testInitialStateN ]
            ]}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedMapperProvider>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClick1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN1')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN1')
  })

  it('should default to last states when definitions are set to null', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const { dispatch } = useTaggedMapper('Tag1', 498)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const { state } = useTaggedMapper('Tag1', 498)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const { dispatch } = useTaggedMapper('TagN', 498)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const { state } = useTaggedMapper('TagN', 498)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const MainComponent = () => {
      const [ mappers, setMappers ] = React.useState([
        [ 'Tag1', testMap1, testInitialState1 ],
        [ 'TagN', testMapN, testInitialStateN ]
      ])
      return (
        <>
          <button id='outer' onClick={() => setMappers(null)}>
            ChangeReducer
          </button>
          <SyncTaggedMapperProvider
            id={498}
            mappers={mappers}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedMapperProvider>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClick1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN1')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClick1Child1AClickNChildN1')
  })

  it('should not re-render when same state', () => {
    const testInitialState1 = 'X'
    let redrawsDispatcher = 0
    const FunComponent11 = () => {
      const dispatch = useTaggedMapperDispatcher('Tag1', 600)
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const state = useTaggedMapperState('Tag1', 600)
      redrawsDispatcher++
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedMapperProvider
        id={600}
        mappers={[
          [ 'Tag1', testMap1, testInitialState1 ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click1Child1X')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1A')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(redrawsDispatcher).toBe(2)
    expect(provider).toHaveText('Click1Child1A')
  })

  it('should not allow new fields in mapper', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const mapper = useTaggedMapper('Tag1', 3666)
      let error = 0
      try {
        mapper.newField = '23'
      }
      catch(e) {
        error = 1
      }
      return (
        <button id='F1' onClick={() => mapper.dispatch('ACTION1')}>
          Click1{error}
        </button>
      )
    }
    const FunComponent12 = () => {
      const mapper = useTaggedMapper('Tag1', 3666)
      return (
        <div>
          Child1{mapper.state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const { dispatch } = useTaggedMapper('TagN', 3666)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const { state } = useTaggedMapper('TagN', 3666)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedMapperProvider
        id={3666}
        mappers={[
          [ 'Tag1', testMap1, () => testInitialState1 ],
          [ 'TagN', testMapN, () => testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click11Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click11Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click11Child1AClickNChildN1')
  })

  it('should not allow to add new fields to "get"', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const providers = useTaggedAny(3650)
      const { dispatch } = providers.get('Tag1')
      let error = 0
      try {
        providers.newField = '23'
      }
      catch(e) {
        error = 1
      }
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1{error}
        </button>
      )
    }
    const FunComponent12 = () => {
      const mapper = useTaggedMapper('Tag1', 3650)
      return (
        <div>
          Child1{mapper.state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const { dispatch } = useTaggedMapper('TagN', 3650)
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const { state } = useTaggedMapper('TagN', 3650)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }

    const provider = mount(
      <SyncTaggedMapperProvider
        id={3650}
        mappers={[
          [ 'Tag1', testMap1, () => testInitialState1 ],
          [ 'TagN', testMapN, () => testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedMapperProvider>
    )
    expect(provider).toHaveText('Click11Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click11Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click11Child1AClickNChildN1')
  })

  describe('should throw an error', () => {
    class ErrorCatcher extends React.Component {
      constructor(props) {
        super(props)
        this.state = {}
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      render() {
        return !!this.state.error ? this.state.error : this.props.children
      }
    }

    beforeAll(() => spyOn(window, 'onerror'))

    describe('when mounting and not definitions', () => {
      it('with id', async () => {
        const FunComponent11 = () => {
          const [ , dispatch ] = useTaggedMapper('Tag1', 499)
          return (
            <button id='F1' onClick={() => dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const [ state ] = useTaggedMapper('Tag1', 499)
          return (
            <div>
              Child1{state}
            </div>
          )
        }

        const provider = mount(
          <ErrorCatcher>
            <SyncTaggedMapperProvider id={499}>
              <FunComponent11 />
              <FunComponent12 />
            </SyncTaggedMapperProvider>
          </ErrorCatcher>
        )

        expect(provider).toHaveText('props must be define before mounting SyncTaggedMapperProvider component with id 499')
      })

      it('for singleton', async () => {
        const FunComponent11 = () => {
          const [ , dispatch ] = useTaggedMapper('Tag1')
          return (
            <button id='F1' onClick={() => dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const [ state ] = useTaggedMapper('Tag1')
          return (
            <div>
              Child1{state}
            </div>
          )
        }

        const provider = mount(
          <ErrorCatcher>
            <SyncTaggedMapperProvider>
              <FunComponent11 />
              <FunComponent12 />
            </SyncTaggedMapperProvider>
          </ErrorCatcher>
        )

        expect(provider).toHaveText('props must be define before mounting SyncTaggedMapperProvider singleton component')
      })
    })

    describe('seal mapper', () => {
      it('should not allow to change dispatcher', () => {
        const testInitialState1 = 'X'
        const testInitialStateN = 0
        let newState = null
        const FunComponent11 = () => {
          const mapper = useTaggedMapper('Tag1', 3664)
          return (
            <button id='F1' onClick={() => newState = mapper.dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const mapper = useTaggedMapper('Tag1', 3664)
          mapper.dispatch = () => 'what!'
          return (
            <div>
              Child1{mapper.state}
            </div>
          )
        }
        const FunComponentN1 = () => {
          const { dispatch } = useTaggedMapper('TagN', 3664)
          return (
            <button id= 'FN' onClick={() => dispatch('ACTION1')}>
              ClickN
            </button>
          )
        }
        const FunComponentN2 = () => {
          const { state } = useTaggedMapper('TagN', 3664)
          return (
            <div>
              ChildN{state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncTaggedMapperProvider
                id={3664}
                mappers={[
                  [ 'Tag1', testMap1, () => testInitialState1 ],
                  [ 'TagN', testMapN, () => testInitialStateN ]
                ]}
              >
                <FunComponent11 />
                <FunComponent12 />
                <FunComponentN1 />
                <FunComponentN2 />
              </SyncTaggedMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('Click1Child1XClickNChildN0')
          expect(newState).toBeUndefined()

          provider.find('#F1').simulate('click')
          provider.update()

          expect(newState).toBe('what!')
          expect(provider).toHaveText('Click1Child1XClickNChildN0')

          provider.find('#FN').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1XClickNChildN1')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property 'dispatch' of object '[object Array]'")
        }

      })

      it('should not allow to change dispatcher by tuple', () => {
        const testInitialState1 = 'X'
        const testInitialStateN = 0
        let newState = null
        const FunComponent11 = () => {
          const mapper = useTaggedMapper('Tag1', 3663)
          return (
            <button id='F1' onClick={() => newState = mapper[1]('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const mapper = useTaggedMapper('Tag1', 3663)
          mapper[1] = () => 'what!'
          return (
            <div>
              Child1{mapper.state}
            </div>
          )
        }
        const FunComponentN1 = () => {
          const { dispatch } = useTaggedMapper('TagN', 3663)
          return (
            <button id= 'FN' onClick={() => dispatch('ACTION1')}>
              ClickN
            </button>
          )
        }
        const FunComponentN2 = () => {
          const { state } = useTaggedMapper('TagN', 3663)
          return (
            <div>
              ChildN{state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncTaggedMapperProvider
                id={3663}
                mappers={[
                  [ 'Tag1', testMap1, () => testInitialState1 ],
                  [ 'TagN', testMapN, () => testInitialStateN ]
                ]}
              >
                <FunComponent11 />
                <FunComponent12 />
                <FunComponentN1 />
                <FunComponentN2 />
              </SyncTaggedMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('Click1Child1XClickNChildN0')
          expect(newState).toBeUndefined()

          provider.find('#F1').simulate('click')
          provider.update()

          expect(newState).toBe('what!')
          expect(provider).toHaveText('Click1Child1XClickNChildN0')

          provider.find('#FN').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1XClickNChildN1')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property '1' of object '[object Array]'")
        }
      })

      it('should not allow to directly change state', () => {
        const testInitialState1 = 'X'
        const testInitialStateN = 0
        const FunComponent11 = () => {
          const mapper = useTaggedMapper('Tag1', 3662)
          mapper.state = 'What!'
          return (
            <button id='F1' onClick={() => mapper.dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const mapper = useTaggedMapper('Tag1', 3666)
          return (
            <div>
              Child1{mapper.state}
            </div>
          )
        }
        const FunComponentN1 = () => {
          const { dispatch } = useTaggedMapper('TagN', 3662)
          return (
            <button id= 'FN' onClick={() => dispatch('ACTION1')}>
              ClickN
            </button>
          )
        }
        const FunComponentN2 = () => {
          const { state } = useTaggedMapper('TagN', 3662)
          return (
            <div>
              ChildN{state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncTaggedMapperProvider
                id={3662}
                mappers={[
                  [ 'Tag1', testMap1, () => testInitialState1 ],
                  [ 'TagN', testMapN, () => testInitialStateN ]
                ]}
              >
                <FunComponent11 />
                <FunComponent12 />
                <FunComponentN1 />
                <FunComponentN2 />
              </SyncTaggedMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('Click1Child1What!ClickNChildN0')

          provider.find('#F1').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1What!ClickNChildN0')

          provider.find('#FN').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1What!ClickNChildN1')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property 'state' of object '[object Array]'")
        }
      })

      it('should not allow to directly change state by tuple', () => {
        const testInitialState1 = 'X'
        const testInitialStateN = 0
        const FunComponent11 = () => {
          const mapper = useTaggedMapper('Tag1', 3661)
          mapper[0] = 'What!'
          return (
            <button id='F1' onClick={() => mapper.dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const mapper = useTaggedMapper('Tag1', 3661)
          return (
            <div>
              Child1{mapper[0]}
            </div>
          )
        }
        const FunComponentN1 = () => {
          const { dispatch } = useTaggedMapper('TagN', 3661)
          return (
            <button id= 'FN' onClick={() => dispatch('ACTION1')}>
              ClickN
            </button>
          )
        }
        const FunComponentN2 = () => {
          const { state } = useTaggedMapper('TagN', 3661)
          return (
            <div>
              ChildN{state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncTaggedMapperProvider
                id={3661}
                mappers={[
                  [ 'Tag1', testMap1, () => testInitialState1 ],
                  [ 'TagN', testMapN, () => testInitialStateN ]
                ]}
              >
                <FunComponent11 />
                <FunComponent12 />
                <FunComponentN1 />
                <FunComponentN2 />
              </SyncTaggedMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('Click1Child1What!ClickNChildN0')

          provider.find('#F1').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1What!ClickNChildN0')

          provider.find('#FN').simulate('click')
          provider.update()

          expect(provider).toHaveText('Click1Child1What!ClickNChildN1')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property '0' of object '[object Array]'")
        }
      })

      it('should not allow to change get', () => {
        const testInitialState1 = 'X'
        const testInitialStateN = 0
        const FunComponent11 = () => {
          const providers = useTaggedAny(3660)
          const { dispatch } = providers.get('Tag1')
          providers.get = () => 'what!'
          return (
            <button id='F1' onClick={() => dispatch('ACTION1')}>
              Click1
            </button>
          )
        }
        const FunComponent12 = () => {
          const mapper = useTaggedMapper('Tag1', 3660)
          return (
            <div>
              Child1{mapper.state}
            </div>
          )
        }
        const FunComponentN1 = () => {
          const { dispatch } = useTaggedMapper('TagN', 3660)
          return (
            <button id= 'FN' onClick={() => dispatch('ACTION1')}>
              ClickN
            </button>
          )
        }
        const FunComponentN2 = () => {
          const { state } = useTaggedMapper('TagN', 3660)
          return (
            <div>
              ChildN{state}
            </div>
          )
        }
        try {
          mount(
            <ErrorCatcher>
              <SyncTaggedMapperProvider
                id={3660}
                mappers={[
                  [ 'Tag1', testMap1, () => testInitialState1 ],
                  [ 'TagN', testMapN, () => testInitialStateN ]
                ]}
              >
                <FunComponent11 />
                <FunComponent12 />
                <FunComponentN1 />
                <FunComponentN2 />
              </SyncTaggedMapperProvider>
            </ErrorCatcher>
          )

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property 'get' of object '#<Object>'")
        }
      })
    })
  })
})
