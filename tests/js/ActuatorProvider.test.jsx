// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'
import delay from 'delay'
import { mount } from 'enzyme'

import {
  ActuatorProvider,
  useActuator
} from '../../src/react-reducer-provider'

describe('ActuatorProvider tests', () => {
  it('should render', () => {
    function testActuator() {}
    const provider = mount(
      <ActuatorProvider
        id={256}
        actuator={testActuator}
      >
        <div>Child</div>
      </ActuatorProvider>
    )

    expect(provider).toHaveText('Child')
    expect(provider).toHaveProp('id', 256)
    expect(provider).toHaveProp('actuator', testActuator)
  })

  it('should have "provider", not writable and prevent extension', () => {
    let accessors = null
    const FunComponent1 = () => {
      accessors = useActuator(257)
      const dispatch = accessors
      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = () => setState('1')
      return (
        <div>
          <ActuatorProvider
            id={257}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    expect(Object.keys(accessors)).toEqual([ 'provider' ])
    expect(accessors.provider).not.toBeFalsy()
    expect(() => accessors.provider = 1).toThrow()
    expect(() => accessors.extra = 'extra').toThrow()
    expect(() => accessors[0] = 'extra').toThrow()
  })

  it('should useActuator without args', () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(257)
      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = () => setState('1')
      return (
        <div>
          <ActuatorProvider
            id={257}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChild1')
  })

  it('should useActuator with args', () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(258)
      return (
        <button onClick={() =>dispatch('1')}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = a => setState(a)
      return (
        <div>
          <ActuatorProvider
            id={258}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChild1')
  })

  it('should ignore actuator when null/undefined/empty', () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(259)
      return (
        <button onClick={() =>dispatch('1')}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state ] = React.useState('A')
      return (
        <div>
          <ActuatorProvider
            id={259}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickChildA')
  })

  it('should useActuator with args and return value', () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(260)
      const [ state, setState ] = React.useState('B')
      return (
        <button onClick={() => setState(dispatch('1'))}>
          Click{state}
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = a => {
        setState(a)
        return a
      }
      return (
        <div>
          <ActuatorProvider
            id={260}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('Click1Child1')
  })

  it('should ignore actuator when null/undefined/empty and return undefined', () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(261)
      const [ state, setState ] = React.useState('B')
      return (
        <button onClick={() => setState(dispatch('1') === undefined ? 'U' : '1')}>
          Click{state}
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state ] = React.useState('A')
      return (
        <div>
          <ActuatorProvider
            id={261}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    expect(component).toHaveText('ClickUChildA')
  })

  it('should useActuator with async', async () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(257)
      return (
        <button onClick={dispatch}>
          Click
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = () => Promise.resolve(setState('1'))
      return (
        <div>
          <ActuatorProvider
            id={257}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickChildA')

    component.find('button').simulate('click')
    component.update()

    await delay(10)
    expect(component).toHaveText('ClickChild1')
  })

  it('should useActuator with args and return value with async', async () => {
    const FunComponent1 = () => {
      const dispatch = useActuator(260)
      const [ state, setState ] = React.useState('B')
      return (
        <button onClick={async () => setState(await dispatch('1'))}>
          Click{state}
        </button>
      )
    }
    const ActuatorContainer = () => {
      const [ state, setState ] = React.useState('A')
      const testActuator = async a => {
        await delay(1)
        setState(a)
        return a
      }
      return (
        <div>
          <ActuatorProvider
            id={260}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ClickBChildA')

    component.find('button').simulate('click')
    component.update()

    await delay(10)

    expect(component).toHaveText('Click1Child1')
  })

  it('should use new actuator and not re-render when actuator is changed', () => {
    let redrawsDispatcher = 0
    const FunComponent1 = () => {
      const dispatch = useActuator(262)
      redrawsDispatcher++
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
      const [ testActuator, setTestActuator ] = React.useState(() => testActuator1)
      return (
        <div>
          <button onClick={() => setTestActuator(() => testActuator2)}>
            ChangeAct
          </button>
          <ActuatorProvider
            id={262}
            actuator={testActuator}
          >
            <FunComponent1/>
          </ActuatorProvider>
          Child{state}
        </div>
      )
    }
    const component = mount(<ActuatorContainer/>)

    expect(component).toHaveText('ChangeActClickChildA')
    expect(redrawsDispatcher).toBe(1)

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(component).toHaveText('ChangeActClickChild1')

    component.find('button').first()
      .simulate('click')
    component.update()

    component.find('button').last()
      .simulate('click')
    component.update()

    expect(redrawsDispatcher).toBe(1)
    expect(component).toHaveText('ChangeActClickChild2')
  })
})
