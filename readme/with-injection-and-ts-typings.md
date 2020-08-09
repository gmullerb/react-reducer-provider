# React Reducer Provider with Injection and Typescript typings

1 . Add **react-reducer-provider** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-provider": "4.2.0",
    ..
```

2 . Create the Reducer Provider:

**`SomeReducerProvider.tsx`**:

```tsx
import React, {
  ReactElement,
  ReactNode } from 'react'
import { SyncReducerProvider } from 'react-reducer-provider'

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

function SomeReducerProvider({ children }: {children: ReactNode}): ReactElement {
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

`SomeComponent1.tsx`:

```tsx
import React, { ReactElement } from 'react'
import { Dispatcher } from 'react-reducer-provider'

export default function SomeComponent1({dispatch}: {dispatch: Dispatcher<string>}): ReactElement {
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up!
    </button>
  )
}
```

`SomeComponent2.tsx`:

```tsx
import React, { ReactElement } from 'react'
import { Dispatcher } from 'react-reducer-provider'

export default function SomeComponent2({dispatch}: {dispatch: Dispatcher<string>}): ReactElement {
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

`SomeComponentN.tsx`:

```tsx
import React, { ReactElement } from 'react'

export default function SomeComponentN({currentState}: {currentState: number}): ReactElement {
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

4 . Create the bridge between the Reducer Provider and the Components:

`SomeContainer.tsx`:

```tsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import React, { ReactElement } from 'react'
import { useReducer } from 'react-reducer-provider'

export default function SomeContainer(): ReactElement {
  const [ state, dispatch ] = useReducer<number, string>('someNamedReducer')
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
import React, { ReactElement } from 'react'

export default function SomeContainer(): ReactElement {
  return (
    <SomeReducerProvider>
      <SomeContainer />
    </SomeReducerProvider>
  )
}
```

## Main documentation

[Back](../README.md)
