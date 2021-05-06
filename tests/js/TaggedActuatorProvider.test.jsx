// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  TaggedActuatorProvider,
  useTaggedActuator,
  useTaggedAny,
} from '../../src/react-reducer-provider'


describe('TaggedActuatorProvider tests', () => {
  it('should render', () => {
    function testActuator1() {}
    function testActuator2() {}
    const provider = mount(
      <TaggedActuatorProvider
        id={226}
        actuators={[
          [ 'Tag1', testActuator1 ],
          [ 'TagN', testActuator2 ]
        ]}
      >
        <div>Child</div>
      </TaggedActuatorProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 226)
    expect(provider).toHaveProp('actuators')
    const actuators = provider.prop('actuators')
    expect(actuators[0]).toEqual(jasmine.arrayContaining([ 'Tag1', testActuator1 ]))
    expect(actuators[1]).toEqual(jasmine.arrayContaining([ 'TagN', testActuator2 ]))
  })

  it('should have "provider" & "tag, all not writable and prevent extension', () => {
    let accessors = null
    const FunComponent1 = () => {
      accessors = useTaggedActuator('Tag1', 227)
      const dispatch = accessors

      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 227)
      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      return (
        <div>
          <TaggedActuatorProvider
            id={227}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <FunComponent1/>
            <FunComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    expect(Object.keys(accessors)).toEqual([ 'provider', 'tag' ])
    expect(accessors.provider).not.toBeFalsy()
    expect(accessors.tag).not.toBeFalsy()
    expect(() => accessors.provider = 1).toThrow()
    expect(() => accessors.tag = 1).toThrow()
    expect(() => accessors.extra = 'extra').toThrow()
    expect(() => accessors[0] = 'extra').toThrow()
  })

  it('should useTaggedActuator without args', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 227)

      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 227)
      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      return (
        <div>
          <TaggedActuatorProvider
            id={227}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <FunComponent1/>
            <FunComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild1')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild2')
  })

  it('should useTaggedAny with args', () => {
    const FunComponent1 = () => {
      const dispatchers = useTaggedAny(229)

      return (
        <button onClick={()=> dispatchers.get('Tag1')(3)}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatchers = useTaggedAny(229)
      return (
        <button onClick={()=> dispatchers.get('TagN')(4)}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = a => setState(`1${a}`)
      const testActuator2 = b => setState(`2${b}`)
      return (
        <div>
          <TaggedActuatorProvider
            id={229}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <FunComponent1/>
            <FunComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild13')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild24')
  })

  it('should useTaggedActuator with args', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 228)

      return (
        <button onClick={()=> dispatch(3)}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 228)
      return (
        <button onClick={()=> dispatch(4)}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = a => setState(`1${a}`)
      const testActuator2 = b => setState(`2${b}`)
      return (
        <div>
          <TaggedActuatorProvider
            id={228}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <FunComponent1/>
            <FunComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild13')

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ClickClickChild24')
  })

  it('should useTaggedActuator with async', async () => {
    const log = a => {}
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 228)

      return (
        <button onClick={async ()=> log(await dispatch(3))}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 228)
      return (
        <button onClick={async ()=> log(await dispatch(4))}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = async a => {
        setState(`1${a}`); Promise.resolve(1)
      }
      const testActuator2 = async b => {
        setState(`2${b}`); Promise.resolve(2)
      }
      return (
        <div>
          <TaggedActuatorProvider
            id={228}
            actuators={[
              [ 'Tag1', testActuator1 ],
              [ 'TagN', testActuator2 ]
            ]}
          >
            <FunComponent1/>
            <FunComponent2/>
          </TaggedActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickClickChildA')

    component.find('button').first()
      .simulate('click')
    component.update()
    await delay(10)

    expect(component).toHaveText('ClickClickChild13')

    component.find('button').last()
      .simulate('click')
    component.update()
    await delay(10)

    expect(component).toHaveText('ClickClickChild24')
  })

  it('should use a new actuator function', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 2127)

      return (
        <button id='F1' onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 2127)
      return (
        <button id='FN' onClick={dispatch}>
          Click
        </button>
      )
    }
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const testActuator3 = () => setState('3')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: testActuator3 })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <FunComponent1/>
              <FunComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild3')
  })

  it('should use do nothing when actuator set to null/undefined/empty', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 2127)

      return (
        <button id='F1' onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 2127)
      return (
        <button id='FN' onClick={dispatch}>
          Click
        </button>
      )
    }
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: null })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <FunComponent1/>
              <FunComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')
  })

  it('should use a new actuator function', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 2127)

      return (
        <button id='F1' onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 2127)
      return (
        <button id='FN' onClick={dispatch}>
          Click
        </button>
      )
    }
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const testActuator3 = () => setState('3')
      const [ actuator, setActuator ] = React.useState({ fun: testActuator1 })
      return (
        <>
          <button id='outer' onClick={() => setActuator({ fun: testActuator3 })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2127}
              actuators={[
                [ 'Tag1', actuator.fun ],
                [ 'TagN', testActuator2 ]
              ]}
            >
              <FunComponent1/>
              <FunComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild3')
  })

  it('should use do nothing when actuators are set to null/undefined/empty', () => {
    const FunComponent1 = () => {
      const dispatch = useTaggedActuator('Tag1', 2128)

      return (
        <button id='F1' onClick={dispatch}>
          Click
        </button>
      )
    }
    const FunComponent2 = () => {
      const dispatch = useTaggedActuator('TagN', 2128)
      return (
        <button id='FN' onClick={dispatch}>
          Click
        </button>
      )
    }
    const MainComponent = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator1 = () => setState('1')
      const testActuator2 = () => setState('2')
      const [ actuators, setActuators ] = React.useState({ funs: [
        [ 'Tag1', testActuator1 ],
        [ 'TagN', testActuator2 ]
      ]})
      return (
        <>
          <button id='outer' onClick={() => setActuators({ funs: null })}>
            ChangeReducer
          </button>
          <div>
            <TaggedActuatorProvider
              id={2128}
              actuators={actuators.funs}
            >
              <FunComponent1/>
              <FunComponent2/>
            </TaggedActuatorProvider>
            Child{state}
          </div>
        </>
      )
    }
    const provider = mount(<MainComponent />)

    expect(provider).toHaveText('ChangeReducerClickClickChildA')

    provider.find('#F1').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild1')

    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')

    provider.find('#outer').simulate('click')
    provider.update()
    provider.find('#F1').simulate('click')
    provider.update()
    provider.find('#FN').simulate('click')
    provider.update()

    expect(provider).toHaveText('ChangeReducerClickClickChild2')
  })

  describe('when mounting and not definitions', () => {
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

    it('with id', async () => {
      const FunComponent1 = () => {
        const dispatch = useTaggedActuator('Tag1', 2128)

        return (
          <button id='F1' onClick={dispatch}>
            Click
          </button>
        )
      }
      const FunComponent2 = () => {
        const dispatch = useTaggedActuator('TagN', 2128)
        return (
          <button id='FN' onClick={dispatch}>
            Click
          </button>
        )
      }

      const provider = mount(
        <ErrorCatcher>
          <TaggedActuatorProvider id={499}>
            <FunComponent1 />
            <FunComponent2 />
          </TaggedActuatorProvider>
        </ErrorCatcher>
      )

      expect(provider).toHaveText('props must be define before mounting TaggedActuatorProvider component with id 499')
    })

    it('for singleton', async () => {
      const FunComponent1 = () => {
        const dispatch = useTaggedActuator('Tag1', 2128)

        return (
          <button id='F1' onClick={dispatch}>
            Click
          </button>
        )
      }
      const FunComponent2 = () => {
        const dispatch = useTaggedActuator('TagN', 2128)
        return (
          <button id='FN' onClick={dispatch}>
            Click
          </button>
        )
      }

      const provider = mount(
        <ErrorCatcher>
          <TaggedActuatorProvider>
            <FunComponent1 />
            <FunComponent2 />
          </TaggedActuatorProvider>
        </ErrorCatcher>
      )

      expect(provider).toHaveText('props must be define before mounting TaggedActuatorProvider singleton component')
    })
  })
})
