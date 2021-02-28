// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueStateProvider, nextState, setContextValue } from './imbueStateProvider'

export class SyncMapperProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueStateProvider(this, props)
  }

  wd(action, ...args) {
    return setContextValue(this, nextState(this, this.props.mapper, action, ...args))
  }
}
