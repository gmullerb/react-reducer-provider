// Copyright (c) 2020 Gonzalo Müller Bravo.
import { createProvider } from './Providers'
import { createTaggedProviderTuple } from './TaggedProvider'

export const createTaggedMapperProvider = function (props, createDispatcher) {
  return createProvider(props.children, createTaggedProviderTuple(props.mappers, createDispatcher), props.id)
}
