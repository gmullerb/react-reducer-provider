// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueTaggedStateProvider, nextStateForTagged, setTaggedContextValue } from './imbueTaggedStateProvider'

export class AsyncTaggedMapperProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueTaggedStateProvider(this, props.id, props.mappers)
  }

  async wd(tag, index, action, ...args) {
    const processor = this._ps.get(tag) // This is never null
    return setTaggedContextValue(this, processor, await nextStateForTagged(processor, this.props.mappers, index, action, ...args))
  }
}
