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

  it('should map with useMapper and get state when initial state empty', () => {
    const FunComponent1 = () => {
      const [ state, dispatch ] = useMapper(401)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click{state}
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(401)
      return (
        <div>
          Child{state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={401}
        mapper={testMap}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChild')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1')
  })

  it('should not re-render when same state', () => {
    const testInitialState = 'A'
    let redrawsDispatcher = 0
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
      redrawsDispatcher++
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

    provider.find('button').simulate('click')
    provider.update()

    expect(redrawsDispatcher).toBe(2)
    expect(provider).toHaveText('ClickYes!ChildYes!')
  })

  it('should use a new mapper function', () => {
    const testInitialState = 'A'
    function testMap2(action) {
      switch (action) {
        case 'ACTION1':
          return '2'
        default:
          return '0'
      }
    }
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(391)
      return (
        <button id='inner' onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(391)
      return (
        <div>
          Child{state}
        </div>
      )
    }

    const MainComponent = () => {
      const [ mapper, setMapper ] = React.useState(() => testMap)
      return (
        <>
          <button id='outer' onClick={() => setMapper(() => testMap2)}>
            Change Reducer
          </button>
          <SyncMapperProvider
            id={391}
            mapper={mapper}
            initialState={testInitialState}
          >
            <FunComponent1 />
            <FunComponent2 />
          </SyncMapperProvider>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('Change ReducerClickChildA')
    provider.find('#inner').simulate('click')
    provider.update()

    expect(provider).toHaveText('Change ReducerClickChild1')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#inner').simulate('click')
    provider.update()

    expect(provider).toHaveText('Change ReducerClickChild2')
  })

  it('should default to last state when mapper is set to null', () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(757)
      return (
        <button id='inner' onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(757)
      return (
        <div>
          Child{state}
        </div>
      )
    }

    const MainComponent = () => {
      const [ mapper, setMapper ] = React.useState(() => testMap)
      return (
        <>
          <button id='outer' onClick={() => setMapper(null)}>
            Change Reducer
          </button>
          <SyncMapperProvider
            id={757}
            mapper={mapper}
            initialState={testInitialState}
          >
            <FunComponent1 />
            <FunComponent2 />
          </SyncMapperProvider>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('Change ReducerClickChildA')
    provider.find('#inner').simulate('click')
    provider.update()

    expect(provider).toHaveText('Change ReducerClickChild1')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#inner').simulate('click')
    provider.update()
    provider.find('#inner').simulate('click')
    provider.update()

    expect(provider).toHaveText('Change ReducerClickChild1')
  })

  it('should allow function as state', () => {
    function testMapF(action) {
      switch (action) {
        case 'ACTION1':
          return (x, y) => x + y
        default:
          return (x, y) => x - y
      }
    }
    const FunComponent1 = () => {
      const dispatch = useMapperDispatcher(758)
      return (
        <button onClick={() => dispatch('ACTION1')}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const state = useMapperState(758)
      return (
        <div>
          Child{state(4, 3)}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={758}
        mapper={testMapF}
        initialState={() => (x, y) => x - y}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickChild1')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('ClickChild7')
  })

  it('should not allow new fields in mapper', () => {
    const testInitialState = 'A'
    const FunComponent1 = () => {
      const mapper = useMapper(667)
      let error = 0
      try {
        mapper.newField = '23'
      }
      catch(e) {
        error = 1
      }
      return (
        <button onClick={() => mapper.dispatch('ACTION1')}>
          Click{mapper.state}{error}
        </button>
      )
    }
    const FunComponent2 = () => {
      const mapper = useMapper(667)
      return (
        <div>
          Child{mapper.state}
        </div>
      )
    }
    const provider = mount(
      <SyncMapperProvider
        id={667}
        mapper={testMap}
        initialState={testInitialState}
      >
        <FunComponent1 />
        <FunComponent2 />
      </SyncMapperProvider>
    )
    expect(provider).toHaveText('ClickA1ChildA')

    provider.find('button').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click11Child1')
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

    describe('seal mapper', () => {
      it('should not allow to change dispatcher', () => {
        const testInitialState = 'A'
        let newState = null
        const FunComponent1 = () => {
          const mapper = useMapper(664)
          return (
            <button onClick={() => newState = mapper.dispatch('ACTION1')}>
              Click{mapper.state}
            </button>
          )
        }
        const FunComponent2 = () => {
          const mapper = useMapper(664)
          mapper.dispatch = () => 'what!'
          return (
            <div>
              Child{mapper.state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncMapperProvider
                id={664}
                mapper={testMap}
                initialState={testInitialState}
              >
                <FunComponent1 />
                <FunComponent2 />
              </SyncMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('ClickAChildA')
          expect(newState).toBeUndefined()

          provider.find('button').simulate('click')
          provider.update()

          expect(newState).toBe('what!')
          expect(provider).toHaveText('ClickAChildA')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property 'dispatch' of object '[object Array]'")
        }
      })

      it('should not allow to change dispatcher by tuple', () => {
        const testInitialState = 'A'
        let newState = null
        const FunComponent1 = () => {
          const mapper = useMapper(663)
          return (
            <button onClick={() => newState = mapper[1]('ACTION1')}>
              Click{mapper.state}
            </button>
          )
        }
        const FunComponent2 = () => {
          const mapper = useMapper(663)
          mapper[1] = () => 'what!'
          return (
            <div>
              Child{mapper.state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncMapperProvider
                id={663}
                mapper={testMap}
                initialState={testInitialState}
              >
                <FunComponent1 />
                <FunComponent2 />
              </SyncMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('ClickAChildA')
          expect(newState).toBeUndefined()

          provider.find('button').simulate('click')
          provider.update()

          expect(newState).toBe('what!')
          expect(provider).toHaveText('ClickAChildA')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property '1' of object '[object Array]'")
        }
      })

      it('should not allow to directly change state', () => {
        const testInitialState = 'A'
        const FunComponent1 = () => {
          const mapper = useMapper(662)
          mapper.state = 'What!'
          return (
            <button onClick={() => mapper.dispatch('ACTION1')}>
              Click{mapper.state}
            </button>
          )
        }
        const FunComponent2 = () => {
          const mapper = useMapper(662)
          return (
            <div>
              Child{mapper.state}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncMapperProvider
                id={662}
                mapper={testMap}
                initialState={testInitialState}
              >
                <FunComponent1 />
                <FunComponent2 />
              </SyncMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('ClickWhat!ChildWhat!')

          provider.find('button').simulate('click')
          provider.update()

          expect(provider).toHaveText('ClickWhat!ChildWhat!')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property 'state' of object '[object Array]'")
        }
      })

      it('should not allow to directly change state by tuple', () => {
        const testInitialState = 'A'
        const FunComponent1 = () => {
          const mapper = useMapper(661)
          mapper[0] = 'What!'
          return (
            <button onClick={() => mapper.dispatch('ACTION1')}>
              Click{mapper[0]}
            </button>
          )
        }
        const FunComponent2 = () => {
          const mapper = useMapper(661)
          return (
            <div>
              Child{mapper[0]}
            </div>
          )
        }
        try {
          const provider = mount(
            <ErrorCatcher>
              <SyncMapperProvider
                id={661}
                mapper={testMap}
                initialState={testInitialState}
              >
                <FunComponent1 />
                <FunComponent2 />
              </SyncMapperProvider>
            </ErrorCatcher>
          )
          expect(provider).toHaveText('ClickWhat!ChildWhat!')

          provider.find('button').simulate('click')
          provider.update()

          expect(provider).toHaveText('ClickWhat!ChildWhat!')

          fail()
        }
        catch(e) {
          expect(e.toString()).toContain("TypeError: Cannot assign to read only property '0' of object '[object Array]'")
        }
      })
    })
  })
})
