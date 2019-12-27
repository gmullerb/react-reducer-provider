# React Named Reducer with Actions Creators

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

3 . Create the `NamedReducer`:

**`SomeNamedReducer.jsx`**:

```jsx
import { initialState, reduce } from '../path/to/SomeReducer'
import React from 'react'
import { NamedReducer } from 'react-named-reducer'

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
  someNamedReducer as default,
  SomeNamedReducer
}
```

4 . Define the Actions Creators through a custom React Hook, which will represent the bridge between the `NamedReducer` and the Components:

`SomeActions.js`:

```js
import { useNamedReducer } from 'react-named-reducer'

export default function useActions() {
  const { state, dispatch } = useNamedReducer('someNamedReducer')
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

> [with Flow typings](with-actions-creators-and-flow-typings.md).  
> [with Typescript typings](with-actions-creators-and-ts-typings.md).  
> This example can be checked on line: live at [gmullerb-react-named-reducer-with-injection demo](https://72881.csb.app/) and the code is at [gmullerb-react-named-reducer-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-named-reducer-with-actions-creators-72881?module=%2Fsrc%2FSomeNamedReducer.jsx):  
[![Edit gmullerb-react-named-reducer](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-named-reducer-with-actions-creators-72881?module=%2Fsrc%2FSomeNamedReducer.jsx)


[Back to Main documentation](../README.md)
