# React Reducer Provider with Actions Creators and Flow typings

1 . Add **react-reducer-provider** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-provider": "2.1.0",
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

3 . Create the Reducer Provider:

**`SomeReducerProvider.jsx`**:

```jsx
import { initialState, reduce } from '../path/to/SomeReducer'
import React from 'react'
import { SyncReducerProvider } from 'react-reducer-provider'

import type {
  Element,
  Node
} from 'react'

function SomeReducerProvider({ children }: {children: Element<any>}): Node {
  return (
    <SyncReducerProvider
      name='someNamedReducer'
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

export {
  someNamedReducer as default,
  SomeReducerProvider
}
```

4 . Define the Actions Creators through a custom React Hook, which will represent the bridge between the Reducer Provider and the Components:

`SomeActions.js`:

```js
import { useReducer } from 'react-reducer-provider'

interface SomeActions {
  goUp: () => void;
  goDown: () => void;
}

interface UseActions {
  state: number;
  actions: SomeActions;
}

export default function useActions(): SomeActions {
  const [ state, dispatch ] = useReducer<number, string>('someNamedReducer')
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

> It may require the use of `useMemo` and `useCallback` to "improve" performance, check [`MockingReducerProvider.test.jsx`](../src/test/js/MockingReducerProvider.test.jsx).

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
import someNamedReducer from '../path/to/SomeReducerProvider'
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
import { SomeReducerProvider } from '../path/to/SomeReducerProvider'
import React from 'react'

import type { Node } from 'react'

export default function SomeContainer(): Node {
  return (
    <SomeReducerProvider>
      <SomeContainer />
    </SomeReducerProvider>
  )
}
```

## Main documentation

[Back](../README.md)
