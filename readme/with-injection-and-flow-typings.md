# React Reducer Context with Injection and Flow typings

1 . Add **react-reducer-context** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-context": "1.0.0",
    ..
```

2 . Create the `ReducerContext`:

**`SomeReducerContext.jsx`**:

```jsx
import React, { createContext } from 'react'
import ReducerContext from 'react-reducer-context'

import type {
  Context,
  Element,
  Node
} from 'react'
import type { ReducerContextDefaultValue } from 'react-reducer-context'

const initialState: number = 0

function reduce(prevState: number, action: string): number {
  switch (action) {
    case 'ACTION1':
      return prevState + 1
    case 'ACTION2':
      return prevState - 1
    default:
      return prevState
  }
}

const someReducerContext: Context<ReducerContextDefaultValue<number, string>> = createContext(null)

function SomeReducerContext({ children }: {children: Element<any>}): Node {
  return (
    <ReducerContext
      context={someReducerContext}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </ReducerContext>
  )
}

export {
  someReducerContext as default,
  SomeReducerContext
}
```

3 . Define some Components:

`SomeComponent1.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'
import type { Dispatcher } from 'react-reducer-context'

export default function SomeComponent1({dispatch}: {dispatch: Dispatcher<string>}): Node {
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up!
    </button>
  )
}
```

`SomeComponent2.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'
import type { Dispatcher } from 'react-reducer-context'

export default function SomeComponent2({dispatch}: {dispatch: Dispatcher<string>}): Node {
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

`SomeComponentN.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'

export default function SomeComponentN({currentState}: {currentState: number}): Node {
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

4 . Create the bridge between the `ReducerContext` and the Components:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

import type { Node } from 'react'
import type { ReducerContextValue } from 'react-reducer-context'

export default function SomeContainer(): Node {
  const [state, dispatch]: ReducerContextValue<number, string> = useContext(someReducerContext)
  return (
    <div>
      <SomeComponent1 dispatch={dispatch}/>
      <SomeComponent2 dispatch={dispatch}/>
      <SomeComponentN currentState={state}/>
    </div>
  )
}
```

`SomeMain.jsx`:

```jsx
import SomeContainer from './path/to/SomeContainer'
import { SomeReducerContext } from '../path/to/SomeReducerContext'
import React from 'react'

import type { Node } from 'react'

export default function SomeContainer(): Node {
  return (
    <SomeReducerContext>
      <SomeContainer />
    </SomeReducerContext>
  )
}
```

[Back to Main documentation](../README.md)
