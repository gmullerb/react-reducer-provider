// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import { imbueProvider } from './StateProvider'
import { computeProcessorValue } from './computeProcessorValue'

function computeContextValue(providerId, state, dispatcher) {
  return { value: Object.preventExtensions(computeProcessorValue(providerId, state, dispatcher)) }
}

export function imbueStateProvider(component, props) {
  imbueProvider(component, props.id)
  component.state = computeContextValue(props.id, typeof props.initialState !== 'function' ? props.initialState : props.initialState(), component.wd)
}

export function setContextValue(component, newState) {
  newState !== component.state.value.state && component.setState(computeContextValue(component.state.value.provider, newState, component.wd))
  return newState
}

export function nextState(component, processor, ...processorArgs) {
  return typeof processor !== 'function' ? component.state.value.state : processor(...processorArgs)
}
