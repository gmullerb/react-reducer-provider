// Copyright (c) 2020 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
import { createProvider } from './Providers'
import { createTaggedProviderTuple } from './TaggedProvider'

export const createTaggedReducerProvider = function (props, createDispatcher) {
  return createProvider(props.children, createTaggedProviderTuple(props.reducers, createDispatcher), props.id)
}
