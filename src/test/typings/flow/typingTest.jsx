// Copyright (c) 2019 Gonzalo Müller Bravo.
import React, { createContext } from 'react'
import ReducerContext from '../../../main/js/ReducerContext'

import type {
  Context,
  Element,
  Node
} from 'react'
import type { ReducerContextDefaultValue } from '../../../main/js/ReducerContext'

interface TestState {
  lastAction: number;
}

const initialState: TestState = {
  lastAction: 0
}

function reduce(prevState: TestState, action: string): TestState {
  switch (action) {
    case 'ACTION1':
      return {
        lastAction: 1
      }
    default:
      return prevState
  }
}

const testReducerContext: Context<ReducerContextDefaultValue<TestState, string>> = createContext(null)

function TestReducerContext({ children }: {children: Element<any>}): Node {
  return (
    <ReducerContext
      context={testReducerContext}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </ReducerContext>
  )
}
