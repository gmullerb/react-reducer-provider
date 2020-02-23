# React Named Reducer with Injection and Typescript typings

1 . Add **react-named-reducer** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-named-reducer": "2.0.1",
    ..
```

2 . Create the `NamedReducer`:

**`SomeNamedReducer.jsx`**:

```jsx
import React from 'react'
import { NamedReducer } from 'react-named-reducer'

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

function SomeNamedReducer({ children }) {
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

4 . Create the bridge between the `NamedReducer` and the Components:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import { useNamedReducer } from 'react-named-reducer'
import React from 'react'

export default function SomeContainer() {
  const { state, dispatch } = useNamedReducer('someNamedReducer')
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

export default function SomeContainer() {
  return (
    <SomeNamedReducer>
      <SomeContainer />
    </SomeNamedReducer>
  )
}
```

> [with Flow typings](with-injection-and-flow-typings.md).  
> [with Typescript typings](with-injection-and-ts-typings.md).  
> This example can be checked on line: live at [gmullerb-react-named-reducer-with-injection demo](https://bb4t5.csb.app/) and the code is at [gmullerb-react-named-reducer-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-named-reducer-with-injection-bb4t5?module=%2Fsrc%2FSomeNamedReducer.jsx):  
[![Edit gmullerb-react-named-reducer](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-named-reducer-with-injection-bb4t5?module=%2Fsrc%2FSomeNamedReducer.jsx)

[Back to Main documentation](../README.md)
