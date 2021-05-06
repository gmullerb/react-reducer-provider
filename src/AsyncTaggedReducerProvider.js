// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueTaggedStateProvider, nextStateForTagged, setTaggedContextValue } from './imbueTaggedStateProvider'

export class AsyncTaggedReducerProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueTaggedStateProvider(this, props.id, props.reducers)
  }

  async wd(processor, index, ...args) {
    return setTaggedContextValue(this, processor, await nextStateForTagged(processor, this.props.reducers, index, processor.state, ...args))
  }
}
