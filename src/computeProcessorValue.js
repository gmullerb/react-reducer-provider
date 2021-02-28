// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt

export function computeProcessorValue(providerId, state, dispatcher) {
  return Object.defineProperties([], {
    state: { value: state, enumerable: true },
    0: { value: state },
    dispatch: { value: dispatcher, enumerable: true },
    1: { value: dispatcher },
    provider: { value: providerId, enumerable: true },
    2: { value: providerId }
  })
}
