// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueTaggedStateProvider, nextStateForTagged, setTaggedContextValue } from './imbueTaggedStateProvider'

export class SyncTaggedMapperProvider extends React.Component {
  constructor(props) {
    super(props)
    imbueTaggedStateProvider(this, props.id, props.mappers)
  }

  wd(processor, index, ...args) {
    return setTaggedContextValue(this, processor, nextStateForTagged(processor, this.props.mappers, index, ...args))
  }
}
