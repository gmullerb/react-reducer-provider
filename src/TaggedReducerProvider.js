// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createProvider } from './Providers'
import { createTaggedProviderTuple } from './TaggedProvider'

export const createTaggedReducerProvider = function (props, createDispatcher) {
  return createProvider(props.children, createTaggedProviderTuple(props.reducers, createDispatcher), props.id)
}
