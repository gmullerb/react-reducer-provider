// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
/* eslint-disable no-invalid-this */
import * as React from 'react'

import { createProvider } from './Providers'

function shouldComponentUpdate(nextProps, nextState) {
  return this.state !== nextState // Avoid re-rendering if props change
}

function renderProvider() {
  return React.createElement(this._P, this.state, this.props.children)
}

export function renderContext() {
  return React.createElement(this._C, null, this.rwc)
}

export function imbueProvider(component, id) {
  component._P = createProvider(id)
  component.wd = component.wd.bind(component)
  component.shouldComponentUpdate = shouldComponentUpdate
  component.render = renderProvider
}
