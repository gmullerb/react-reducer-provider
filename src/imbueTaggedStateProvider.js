// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import { imbueProvider } from './StateProvider'
import { computeProcessorValue } from './computeProcessorValue'

function computeTaggedProcessorValue(providerId, tag, state, dispatcher) {
  return Object.preventExtensions(Object.defineProperties(computeProcessorValue(providerId, state, dispatcher), {
    tag: { value: tag, enumerable: true },
    3: { value: tag }
  }))
}

function computeTaggedContextValue(get) {
  return { value: Object.freeze({ get }) }
}

export function imbueTaggedStateProvider(component, id, definitions) {
  if (!(definitions instanceof Array)) {
    throw `props must be define before mounting ${component.constructor.name} ${!id ? 'singleton component' : `component with id ${id}`}`
  }
  imbueProvider(component, id)
  component._ps = new Map(definitions.map((processor, index) => [ processor[0], computeTaggedProcessorValue(
    id,
    processor[0],
    typeof processor[2] !== 'function' ? processor[2] : processor[2](),
    (action, ...args) => component.wd(processor[0], index, action, ...args)) ]
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
  return !processors || !processors[index] || typeof processors[index][1] !== 'function' ? processor.state : processors[index][1](...processorsArgs)
}
