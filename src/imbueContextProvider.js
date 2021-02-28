// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt

import { captureProvider } from './Providers'
import { renderContext } from './StateProvider'

export function imbueContextProvider(component, id) {
  component._C = captureProvider(id).Consumer
  component.rwc = component.rwc.bind(component)
  component.render = renderContext
}
