// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import { imbueProvider, shouldStateProviderUpdate, renderStateProvider } from './imbueProvider'
import { computeProcessorValue } from './computeProcessorValue'
import { throwDefinitionError } from './errors'

function computeTaggedProcessorValue(providerId, tag, state, dispatcher) {
  return Object.preventExtensions(Object.defineProperties(computeProcessorValue(providerId, state, dispatcher), {
    tag: { value: tag, enumerable: true },
    3: { value: tag }
  }))
}

export function computeTaggedContextValue(get) {
  return { value: Object.freeze({ get }) }
}

export function imbueTaggedStateProvider(component, id, definitions) {
  !(definitions instanceof Array) && throwDefinitionError(component, id)
  imbueProvider(component, id, shouldStateProviderUpdate, renderStateProvider)
  component._ps = new Map(definitions.map(([ tag,, initial ], index) => [ tag, computeTaggedProcessorValue(
    id, tag,
    typeof initial !== 'function' ? initial : initial(),
    (...args) => component.wd(component._ps.get(tag) /* This is never null */, index, ...args)) ]
  ))
  component.get = tag => component._ps.get(tag)
  component.state = computeTaggedContextValue(component.get)
}

export function setTaggedContextValue(component, processor, newStateForTag) {
  if (processor.state !== newStateForTag) {
    component._ps.set(processor.tag, computeTaggedProcessorValue(processor.provider, processor.tag, newStateForTag, processor.dispatch))
    component.setState(computeTaggedContextValue(component.get))
  }
  return newStateForTag
}

export function nextStateForTagged(processor, processors, index, ...processorsArgs) {
  if (processors) {
    const pro = processors[index]
    if (pro && !(typeof pro[1] !== 'function')) {
      return pro[1](...processorsArgs)
    }
  }
  return processor.state
}
