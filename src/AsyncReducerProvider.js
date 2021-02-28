// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueStateProvider, nextState, setContextValue } from './imbueStateProvider'

export class AsyncReducerProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueStateProvider(this, props)
  }

  async wd(action, ...args) {
    return setContextValue(this, await nextState(this, this.props.reducer, this.state.value.state, action, ...args))
  }
}
