// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt
export function throwDefinitionError(component, id) {
  // definitions are required to allow the processors to work with index and allow them to change.
  throw `props must be define before mounting ${component.constructor.name} ${!id ? 'singleton component' : `component with id ${id}`}`
}
