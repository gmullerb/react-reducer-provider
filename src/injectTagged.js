// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { captureProvider } from './Providers'

export function injectTagged(WrappedComponent, propName, tag, id) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this._consumer = captureProvider(id).Consumer
    }
    render() {
      return React.createElement(this._consumer, null,
        context => React.createElement(WrappedComponent, { ...this.props, [propName]: [ context[0].get(tag), context[1].get(tag) ]})
      )
    }
  }
}
