// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { nextStateForTagged, computeTaggedContextValue } from './imbueTaggedStateProvider'
import { imbueProvider, shouldActuatorProviderUpdate, renderActuatorProvider } from './imbueProvider'
import { throwDefinitionError } from './errors'

function computeTaggedProcessorValue(providerId, tag, dispatcher) {
  dispatcher.provider = providerId
  dispatcher.tag = tag
  return Object.freeze(dispatcher)
}

export class TaggedActuatorProvider extends React.Component {
  constructor(props) {
    super(props)
    !(props.actuators instanceof Array) && throwDefinitionError(this, props.id)
    imbueProvider(this, props.id, shouldActuatorProviderUpdate, renderActuatorProvider)
    this._ps = new Map(props.actuators.map((processor, index) => [ processor[0],
      computeTaggedProcessorValue(props.id, processor[0], (...args) => this.wd(index, ...args)) ]
    ))
    this._v = computeTaggedContextValue(tag => this._ps.get(tag))
  }

  wd(index, ...args) {
    return nextStateForTagged(this /** state will be undefined, exactly what is needed */, this.props.actuators, index, ...args)
  }
}
