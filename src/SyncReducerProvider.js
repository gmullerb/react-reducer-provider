// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueStateProvider, nextState, setContextValue } from './imbueStateProvider'

export class SyncReducerProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueStateProvider(this, props)
  }

  wd(...args) {
    return setContextValue(this, nextState(this, this.props.reducer, this.state.value.state, ...args))
  }
}
