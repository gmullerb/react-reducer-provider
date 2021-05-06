// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueStateProvider, nextState, setContextValue } from './imbueStateProvider'

export class AsyncMapperProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueStateProvider(this, props)
  }

  async wd(...args) {
    return setContextValue(this, await nextState(this, this.props.mapper, ...args))
  }
}
