// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueTaggedStateProvider, nextStateForTagged, setTaggedContextValue } from './imbueTaggedStateProvider'

export class SyncTaggedReducerProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueTaggedStateProvider(this, props.id, props.reducers)
  }

  wd(processor, index, ...args) {
    return setTaggedContextValue(this, processor, nextStateForTagged(processor, this.props.reducers, index, processor.state, ...args))
  }
}
