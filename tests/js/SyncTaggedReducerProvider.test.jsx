// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import { mount } from 'enzyme'

import {
  SyncTaggedReducerProvider,
  useTaggedAny,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher
} from '../../src/react-reducer-provider'

function testReduce1(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return 'A'
    default:
      return prevState
  }
}

function testReduceN(prevState, action) {
  switch (action) {
    case 'ACTION1':
      return 1
    default:
      return prevState
  }
}

describe('SyncTaggedReducerProvider tests', () => {
  it('should render', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0

    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS0'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <div>Child</div>
      </SyncTaggedReducerProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 'someTaggedReducerS0')
    expect(provider).toHaveProp('reducers')
    const reducers = provider.prop('reducers')
    expect(reducers[0]).toEqual(jasmine.arrayContaining([ 'Tag1', testReduce1, testInitialState1 ]))
    expect(reducers[1]).toEqual(jasmine.arrayContaining([ 'TagN', testReduceN, testInitialStateN ]))
  })

  it('should reduce with useTaggedAny', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const reducers = useTaggedAny('someTaggedReducerS0')
      const dispatch = reducers.get('Tag1').dispatch
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const reducers = useTaggedAny('someTaggedReducerS0')
      const state = reducers.get('Tag1').state
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const reducers = useTaggedAny('someTaggedReducerS0')
      return (
        <button id= 'FN' onClick={() => reducers.get('TagN').dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const reducers = useTaggedAny('someTaggedReducerS0')
      return (
        <div>
          ChildN{reducers.get('TagN').state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS0'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with useTaggedAny and get state with useTaggedAny', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const reducers = useTaggedAny('someTaggedReducerS1')
      const dispatch = reducers.get('Tag1').dispatch
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const reducers = useTaggedAny('someTaggedReducerS1')
      const state = reducers.get('Tag1').state
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const reducers = useTaggedAny('someTaggedReducerS1')
      return (
        <button id= 'FN' onClick={() => reducers.get('TagN').dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const reducers = useTaggedAny('someTaggedReducerS1')
      return (
        <div>
          ChildN{reducers.get('TagN').state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS1'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with useTaggedReducerDispatcher and get state with useTaggedReducerState', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const dispatch = useTaggedReducerDispatcher('Tag1', 'someTaggedReducerS2')
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const state = useTaggedReducerState('Tag1', 'someTaggedReducerS2')
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS2')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const state = useTaggedReducerState('TagN', 'someTaggedReducerS2')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS2'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should reduce with useTaggedReducer', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedReducer('Tag1', 'someTaggedReducerS3')
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedReducer('Tag1', 'someTaggedReducerS3')
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS3')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedReducer('TagN', 'someTaggedReducerS3')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS3'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN1')
  })

  it('should use a new reducer function', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    function testReduce2(prevState, action) {
      switch (action) {
        case 'ACTION1':
          return 100
        default:
          return prevState
      }
    }
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedReducer('Tag1', 'someTaggedReducerS3a')
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedReducer('Tag1', 'someTaggedReducerS3a')
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS3a')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedReducer('TagN', 'someTaggedReducerS3a')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const MainComponent = () => {
      const [ reducer, setReducer ] = React.useState({ fun: testReduce1 })
      return (
        <>
          <button id='outer' onClick={() => setReducer({ fun: testReduce2 })}>
            ChangeReducer
          </button>
          <SyncTaggedReducerProvider
            id='someTaggedReducerS3a'
            reducers={[
              [ 'Tag1', reducer.fun, testInitialState1 ],
              [ 'TagN', testReduceN, testInitialStateN ]
            ]}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedReducerProvider>
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

    expect(provider).toHaveText('ChangeReducerClick1Child1100ClickNChildN1')
  })

  it('should default to last state when reducer is set to null', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = () => {
      const [ , dispatch ] = useTaggedReducer('Tag1', 'someTaggedReducerS3b')
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedReducer('Tag1', 'someTaggedReducerS3b')
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS3b')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedReducer('TagN', 'someTaggedReducerS3b')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const MainComponent = () => {
      const [ reducer, setReducer ] = React.useState({ fun: testReduce1 })
      return (
        <>
          <button id='outer' onClick={() => setReducer({ fun: null })}>
            ChangeReducer
          </button>
          <SyncTaggedReducerProvider
            id='someTaggedReducerS3b'
            reducers={[
              [ 'Tag1', reducer.fun, testInitialState1 ],
              [ 'TagN', testReduceN, testInitialStateN ]
            ]}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedReducerProvider>
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
      const [ , dispatch ] = useTaggedReducer('Tag1', 'someTaggedReducerS3c')
      return (
        <button id='F1' onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const [ state ] = useTaggedReducer('Tag1', 'someTaggedReducerS3c')
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const [ , dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS3c')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const [ state ] = useTaggedReducer('TagN', 'someTaggedReducerS3c')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const MainComponent = () => {
      const [ reducers, setReducers ] = React.useState([
        [ 'Tag1', testReduce1, testInitialState1 ],
        [ 'TagN', testReduceN, testInitialStateN ]
      ])
      return (
        <>
          <button id='outer' onClick={() => setReducers(null)}>
            ChangeReducer
          </button>
          <SyncTaggedReducerProvider
            id='someTaggedReducerS3c'
            reducers={reducers}
          >
            <FunComponent11 />
            <FunComponent12 />
            <FunComponentN1 />
            <FunComponentN2 />
          </SyncTaggedReducerProvider>
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

  it('should get nested providers', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    const FunComponent11 = (props) => {
      const [ , dispatch ] = useTaggedReducer('Tag1', props.provider)
      return (
        <button id={props.id} onClick={() => dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = (props) => {
      const [ state ] = useTaggedReducer('Tag1', props.provider)
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = (props) => {
      const dispatch = useTaggedReducerDispatcher('TagN', props.provider)
      return (
        <button id={props.id} onClick={() => dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = (props) => {
      const state = useTaggedReducerState('TagN', props.provider)
      return (
        <div>
          ChildN{state}
        </div>
      )
    }

    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS4'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 id='F1' provider='someTaggedReducerS4'/>
        <FunComponent12 provider='someTaggedReducerS4'/>
        <FunComponentN1 id='N1' provider='someTaggedReducerS4'/>
        <FunComponentN2 provider='someTaggedReducerS4'/>
        <SyncTaggedReducerProvider
          id='someTaggedReducerS5'
          reducers={[
            [ 'Tag1', testReduce1, testInitialState1 ],
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent11 id='F2' provider='someTaggedReducerS5'/>
          <FunComponent12 provider='someTaggedReducerS5'/>
          <FunComponentN1 id='N2' provider='someTaggedReducerS5'/>
          <FunComponentN2 provider='someTaggedReducerS5'/>
        </SyncTaggedReducerProvider>
      </SyncTaggedReducerProvider>
    )

    expect(provider).toHaveText('Click1Child1XClickNChildN0Click1Child1XClickNChildN0')

    provider.find('button[id="F1"]').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0Click1Child1XClickNChildN0')

    provider.find('button[id="N2"]').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1AClickNChildN0Click1Child1XClickNChildN1')
  })

  it('should get the new state when dispatching', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    let newState1 = null
    let newStateN = null
    const FunComponent11 = () => {
      const reducers = useTaggedAny('someTaggedReducerS6')
      const dispatch = reducers.get('Tag1').dispatch
      return (
        <button id='F1' onClick={() => newState1 = dispatch('ACTION1')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const reducers = useTaggedAny('someTaggedReducerS6')
      const state = reducers.get('Tag1').state
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS6')
      return (
        <button id= 'FN' onClick={() => newStateN = dispatch('ACTION1')}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const state = useTaggedReducerState('TagN', 'someTaggedReducerS6')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS6'
        reducers={[
          [ 'Tag1', testReduce1, testInitialState1 ],
          [ 'TagN', testReduceN, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(newState1).toBeNull()
    expect(newStateN).toBeNull()

    provider.find('#F1').simulate('click')
    provider.update()
    provider.find('#FN').simulate('click')
    provider.update()

    expect(newState1).toBe('A')
    expect(newStateN).toBe(1)
  })

  it('should reduce with useReducerDispatcher and get state with extra args', () => {
    const testInitialState1 = 'X'
    const testInitialStateN = 0
    function testReduce(prevState, action, extra1, extra2) {
      switch (action) {
        case 'ACTION1':
          return extra1 + extra2
        default:
          return prevState
      }
    }
    const FunComponent11 = () => {
      const reducers = useTaggedAny('someTaggedReducerS7')
      const dispatch = reducers.get('Tag1').dispatch
      return (
        <button id='F1' onClick={() => dispatch('ACTION1', 'A', 'B')}>
          Click1
        </button>
      )
    }
    const FunComponent12 = () => {
      const reducers = useTaggedAny('someTaggedReducerS7')
      const state = reducers.get('Tag1').state
      return (
        <div>
          Child1{state}
        </div>
      )
    }
    const FunComponentN1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS7')
      return (
        <button id= 'FN' onClick={() => dispatch('ACTION1', 1, 2)}>
          ClickN
        </button>
      )
    }
    const FunComponentN2 = () => {
      const state = useTaggedReducerState('TagN', 'someTaggedReducerS7')
      return (
        <div>
          ChildN{state}
        </div>
      )
    }
    const provider = mount(
      <SyncTaggedReducerProvider
        id='someTaggedReducerS7'
        reducers={[
          [ 'Tag1', testReduce, testInitialState1 ],
          [ 'TagN', testReduce, testInitialStateN ]
        ]}
      >
        <FunComponent11 />
        <FunComponent12 />
        <FunComponentN1 />
        <FunComponentN2 />
      </SyncTaggedReducerProvider>
    )
    expect(provider).toHaveText('Click1Child1XClickNChildN0')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1ABClickNChildN0')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('Click1Child1ABClickNChildN3')
  })

  it('should get the same dispatcher references after state changes - Case 1', () => {
    const testInitialStateN = 0
    let redrawsReducer = 0
    let redrawsDispatcher = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS8')
      redrawsReducer++
      useReducerDispatcherSet.add(dispatch)
      return (
        <button
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
        </button>
      )
    }
    const FunComponent1 = () => {
      const reducers = useTaggedAny('someTaggedReducerS8')
      const dispatch = reducers.get('TagN').dispatch
      redrawsDispatcher++
      useReducerDispatcherSet.add(dispatch)
      return React.useMemo(() => (
        <RelatedChildComponent
          onClick={dispatch}
        />
      ), [ dispatch ])
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncTaggedReducerProvider
          id='someTaggedReducerS8'
          reducers={[
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncTaggedReducerProvider>
      </div>
    )
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child0')

    provider.find('#buttonRC').simulate('click')
    provider.update()

    expect(redrawsReducer).toBe(2)
    expect(redrawsDispatcher).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child1')
  })

  it('should get the same dispatcher references after state changes - Case 2', () => {
    const testInitialStateN = 0
    let redrawsReducer = 0
    let redrawsDispatcher = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS9')
      redrawsReducer++
      useReducerDispatcherSet.add(dispatch)
      return (
        <button
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
        </button>
      )
    }
    const FunComponent1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS9')
      redrawsDispatcher++
      useReducerDispatcherSet.add(dispatch)
      return React.useMemo(() => (
        <RelatedChildComponent
          onClick={dispatch}
        />
      ), [ dispatch ])
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncTaggedReducerProvider
          id='someTaggedReducerS9'
          reducers={[
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncTaggedReducerProvider>
      </div>
    )
    expect(redrawsReducer).toBe(1)
    expect(redrawsDispatcher).toBe(1)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child0')

    provider.find('#buttonRC').simulate('click')
    provider.update()

    expect(redrawsReducer).toBe(2)
    expect(redrawsDispatcher).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#button1')).toHaveText('Child1')
  })

  it('should get the same references when Provider siblings changes', () => {
    const testInitialStateN = 0
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <button
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
        </button>
      )
    }
    const FunComponent1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />)
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncTaggedReducerProvider
          id='someTaggedReducerS10'
          reducers={[
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncTaggedReducerProvider>
      </div>
    )

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonS')).toHaveText('Sibling1')

    provider.find('#buttonS').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(2)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonS')).toHaveText('Sibling2')
  })

  it('should get the same references when Unrelated children changes', () => {
    const testInitialStateN = 0
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <button
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
        </button>
      )
    }
    const FunComponent1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />
      )
    }
    const provider = mount(
      <div>
        <SiblingComponent />
        <SyncTaggedReducerProvider
          id='someTaggedReducerS10'
          reducers={[
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncTaggedReducerProvider>
      </div>
    )

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonUC')).toHaveText('Unrelated2')

    provider.find('#buttonUC').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(2)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonUC')).toHaveText('Unrelated3')
  })

  it('should get the same references when Parent changes', () => {
    const testInitialStateN = 0
    let redraws = 0
    let siblingRedraws = 0
    let unrelatedChildrenRedraws = 0
    let relatedChildrenRedraws = 0
    const useReducerDispatcherSet = new Set()
    const ParentComponent = ({ children }) => {
      const [ state, setState ] = React.useState(3)
      return (
        <div
          id='buttonP'
          onClick={() => setState(state + 1)}
        >
          <span>Parent{state}</span>
          { children }
        </div>
      )
    }
    const SiblingComponent = () => {
      const [ state, setState ] = React.useState(1)
      siblingRedraws++
      return (
        <button
          id='buttonS'
          onClick={() => setState(state + 1)}
        >
          Sibling{state}
        </button>
      )
    }
    const UnrelatedChildComponent = () => {
      const [ state, setState ] = React.useState(2)
      unrelatedChildrenRedraws++
      return (
        <button
          id='buttonUC'
          onClick={() => setState(state + 1)}
        >
          Unrelated{state}
        </button>
      )
    }
    const RelatedChildComponent = ({ onClick }) => {
      const handleClick = React.useCallback(() => onClick('ACTION1'))
      relatedChildrenRedraws++
      return (
        <button
          id='buttonRC'
          onClick={handleClick}
        >
          Related
        </button>
      )
    }
    const FunComponent = () => {
      const [ state, dispatch ] = useTaggedReducer('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <button
          id='button1'
          onClick={() => dispatch('ACTION1')}
        >
          Child{state}
        </button>
      )
    }
    const FunComponent1 = () => {
      const dispatch = useTaggedReducerDispatcher('TagN', 'someTaggedReducerS10')
      redraws++
      useReducerDispatcherSet.add(dispatch)
      return (
        <RelatedChildComponent
          onClick={dispatch}
        />
      )
    }
    const provider = mount(
      <ParentComponent>
        <SiblingComponent />
        <SyncTaggedReducerProvider
          id='someTaggedReducerS10'
          reducers={[
            [ 'TagN', testReduceN, testInitialStateN ]
          ]}
        >
          <FunComponent />
          <FunComponent1 />
          <UnrelatedChildComponent />
        </SyncTaggedReducerProvider>
      </ParentComponent>
    )
    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonP span')).toHaveText('Parent3')

    provider.find('#buttonP').simulate('click')
    provider.update()

    expect(redraws).toBe(2)
    expect(siblingRedraws).toBe(1)
    expect(unrelatedChildrenRedraws).toBe(1)
    expect(relatedChildrenRedraws).toBe(1)
    expect(useReducerDispatcherSet.size).toBe(1)
    expect(provider.find('#buttonP span')).toHaveText('Parent4')
  })
})
