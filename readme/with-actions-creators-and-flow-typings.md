# React Named Reducer with Actions Creators and Flow typings

1 . Add **react-named-reducer** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-named-reducer": "1.0.0",
    ..
```

2 . Define the States, the Actions and the Reducer:

`SomeReducer.js`:

```js
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

export {
  initialState,
  reduce
}
```

3 . Create the `NamedReducer`:

**`SomeNamedReducer.jsx`**:

```jsx
import { initialState, reduce } from '../path/to/SomeReducer'
import React from 'react'
import { NamedReducer } from 'react-named-reducer'

import type {
  Element,
  Node
} from 'react'

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
  someNamedReducer as default,
  SomeNamedReducer
}
```

4 . Define the Actions Creators through a custom React Hook, which will represent the bridge between the `NamedReducer` and the Components:

`SomeActions.js`:

```js
import { useNamedReducer } from 'react-named-reducer'

import type { NamedReducerInterface } from 'react-named-reducer'

interface SomeActions {
  goUp: () => void;
  goDown: () => void;
}

interface UseActions {
  state: number;
  actions: SomeActions;
}

export default function useActions(): SomeActions {
  const { state, dispatch }: NamedReducerInterface<number, string> = useNamedReducer('someNamedReducer')
  return {
    state,
    actions: {
      goUp: () => {
        dispatch('ACTION1')
      },
      goDown: () => {
        dispatch('ACTION2')
      }
    }
  }
}

export {
  SomeActions,
  UseActions,
  useActions as default
}
```

5 . Define some Components:

`SomeComponent1.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'

export default function SomeComponent1({onClick}: {onClick: () => void}): Node {
  return (
    <button onClick={onClick}>
      Go up!
    </button>
  )
}
```

`SomeComponent2.jsx`:

```jsx
import React from 'react'

import type { Node } from 'react'

export default function SomeComponent2({onClick}: {onClick: () => void}): Node {
  return (
    <button onClick={onClick}>
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

6 . Use Actions Creators:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import someNamedReducer from '../path/to/SomeNamedReducer'
import useActions from './path/to/SomeActions'
import React from 'react'

import type { UseActions } from './path/to/SomeActions'
import type { Node } from 'react'

export default function SomeContainer(): Node {
  const {state, actions}: UseActions = useActions()
  return (
    <div>
      <SomeComponent1 onClick={actions.goUp} />
      <SomeComponent2 onClick={actions.goDown} />
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
