# React Reducer Provider with Injection and Typescript typings

1 . Add **react-reducer-provider** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-provider": "4.4.0",
    ..
```

2 . Create the Reducer Provider:

* Define the State.
* Define the Reducer.

**`SomeReducerProvider.jsx`**:

```jsx
import React from 'react'
import { SyncReducerProvider } from 'react-reducer-provider'

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
  SomeReducerProvider
}
```

3 . Define some Components:

`SomeComponent1.jsx`:

```jsx
import React from 'react'

export default function SomeComponent1({dispatch}) {
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

export default function SomeComponent2({dispatch}) {
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

export default function SomeComponentN({currentState}) {
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

4 . Create the bridge between the Reducer Provider and the Components:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import { useReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeContainer() {
  const [ state, dispatch ] = useReducer('someNamedReducer')
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

> This example can be checked on line at [gmullerb-react-reducer-provider-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-with-injection-2co8d?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-with-injection](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-with-injection-2co8d?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> [with Flow typings](with-injection-and-flow-typings.md).  
> [with Typescript typings](with-injection-and-ts-typings.md).  

## Main documentation

[Back](../README.md)
