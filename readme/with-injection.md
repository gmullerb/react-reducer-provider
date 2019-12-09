# React Reducer Context with Injection and Typescript typings

1 . Add **react-reducer-context** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-context": "1.0.2",
    ..
```

2 . Create the `ReducerContext`:

**`SomeReducerContext.jsx`**:

```jsx
import React, { createContext } from 'react'
import ReducerContext from 'react-reducer-context'

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

const someReducerContext = createContext(null)

function SomeReducerContext({ children }) {
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

4 . Create the bridge between the `ReducerContext` and the Components:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import someReducerContext from '../path/to/SomeReducerContext'
import { useReducerContext } from 'react-reducer-context'
import React from 'react'

export default function SomeContainer() {
  const { state, dispatch } = useReducerContext(someReducerContext)
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

export default function SomeContainer() {
  return (
    <SomeReducerContext>
      <SomeContainer />
    </SomeReducerContext>
  )
}
```

> [with Flow typings](with-injection-and-flow-typings.md).  
> [with Typescript typings](with-injection-and-ts-typings.md).  
> This example can be checked on line: live at [gmullerb-react-reducer-context-with-injection demo](https://los45.csb.app/) and the code is at [gmullerb-react-reducer-context-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-with-injection-los45?module=%2Fsrc%2FSomeReducerContext.jsx):  
[![Edit gmullerb-react-reducer-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-with-injection-los45?module=%2Fsrc%2FSomeReducerContext.jsx)

[Back to Main documentation](../README.md)
