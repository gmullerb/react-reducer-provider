// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import * as React from 'react'

import { imbueContextProvider } from './imbueContextProvider'

export function injectAnyState(WrappedComponent, propName, id) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      imbueContextProvider(this, id)
    }
    rwc(context) {
      return React.createElement(WrappedComponent, { ...this.props, [propName]: context[0] })
    }
  }
}
