# React Named Reducer with Injection and Flow typings

1 . Add **react-named-reducer** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-named-reducer": "1.0.0",
    ..
```

2 . Create the `NamedReducer`:

**`SomeNamedReducer.jsx`**:

```jsx
import React from 'react'
import { NamedReducer } from 'react-named-reducer'

import type {
  Element,
  Node
} from 'react'

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

function SomeNamedReducer({ children }: {children: Element<any>}): Node {
  return (
    <NamedReducer
      name='someNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </NamedReducer>
  )
}

export {
  SomeNamedReducer
}
```

3 . Define some Components:

`SomeComponent1.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'
import type { Dispatcher } from 'react-named-reducer'

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
import type { Dispatcher } from 'react-named-reducer'

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

4 . Create the bridge between the `NamedReducer` and the Components:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import React from 'react'
import { useNamedReducer } from 'react-named-reducer'

import type { Node } from 'react'
import type { NamedReducerInterface } from 'react-named-reducer'

export default function SomeContainer(): Node {
  const { state, dispatch }: NamedReducerInterface<number, string> = useNamedReducer(someNamedReducer)
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
import { SomeNamedReducer } from '../path/to/SomeNamedReducer'
import React from 'react'

import type { Node } from 'react'

export default function SomeContainer(): Node {
  return (
    <SomeNamedReducer>
      <SomeContainer />
    </SomeNamedReducer>
  )
}
```

[Back to Main documentation](../README.md)
