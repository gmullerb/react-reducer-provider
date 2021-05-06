// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueProvider, shouldActuatorProviderUpdate, renderActuatorProvider } from './imbueProvider'

export class ActuatorProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueProvider(this, props.id, shouldActuatorProviderUpdate, renderActuatorProvider)
    this.wd.provider = props.id
    this._v = { value: Object.freeze(this.wd) }
  }

  wd(...args) {
    return typeof this.props.actuator !== 'function' ? undefined : this.props.actuator(...args)
  }
}
