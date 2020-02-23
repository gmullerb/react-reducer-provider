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

**`SomeNamedReducer.tsx`**:

```tsx
import React, {
  ReactElement,
  ReactNode } from 'react'
import { NamedReducer } from 'react-named-reducer'

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

function SomeNamedReducer({ children }: {children: ReactNode}): ReactElement {
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

`SomeComponent1.tsx`:

```tsx
import React, { ReactElement } from 'react'
import { Dispatcher } from 'react-named-reducer'

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
import { Dispatcher } from 'react-named-reducer'

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

4 . Create the bridge between the `NamedReducer` and the Components:

`SomeContainer.tsx`:

```tsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import React, { ReactElement } from 'react'
import { useNamedReducer } from 'react-named-reducer'

export default function SomeContainer(): ReactElement {
  const { state, dispatch } = useNamedReducer<number, string>('someNamedReducer')
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
import React, { ReactElement } from 'react'

export default function SomeContainer(): ReactElement {
  return (
    <SomeNamedReducer>
      <SomeContainer />
    </SomeNamedReducer>
  )
}
```

[Back to Main documentation](../README.md)
