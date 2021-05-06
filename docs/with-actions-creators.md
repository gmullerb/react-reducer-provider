# React Reducer Provider with Actions Creators

1 . Add **react-reducer-provider** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-provider": "5.0.0",
    ..
```

2 . Define the States, the Actions and the Reducer:

`SomeReducer.js`:

```js
const initialState = 0

function reduce(prevState, action) {
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

function SomeReducerProvider({ children }) {
  return (
    <SyncReducerProvider
      id='someNamedReducer'
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
import React from 'react'

export default function useActions() {
  const [ state, dispatch ] = useReducer('someNamedReducer')
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
```

> It may require the use of `useMemo` and `useCallback` to "improve" performance, check [`MockingReducerProvider.test.jsx`](https://github.com/gmullerb/react-reducer-provider/blob/master/tests/js/MockingReducerProvider.test.jsx).

5 . Define some Components:

`SomeComponent1.jsx`:

```jsx
import React from 'react'

export default function SomeComponent1({onClick}) {
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

export default function SomeComponent2({onClick}) {
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

export default function SomeComponentN({currentState}) {
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
import useActions from "./path/to/SomeActions"
import React from 'react'

export default function SomeContainer() {
  const {state, actions} = useActions();
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

export default function SomeContainer() {
  return (
    <SomeReducerProvider>
      <SomeContainer />
    </SomeReducerProvider>
  )
}
```

> This example can be checked on line at [gmullerb-react-reducer-provider-with-actions-creators codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-with-actions-creators-forked-fc0zo?file=/src/SomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-with-actions-creators](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-with-actions-creators-forked-fc0zo?file=/src/SomeReducerProvider.jsx)  
> [with Flow typings](with-actions-creators-and-flow-typings.md).  
> [with Typescript typings](with-actions-creators-and-ts-typings.md).  

## Main documentation

[Back to homepage](../README.md)
