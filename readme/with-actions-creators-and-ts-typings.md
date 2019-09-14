# React Reducer Context with Actions Creators and Typescript typings

1 . Add **react-reducer-context** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-context": "1.0.0",
    ..
```

2 . Define the States, the Actions and the Reducer:

`SomeReducer.ts`:

```ts
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

3 . Create the `ReducerContext`:

**`SomeReducerContext.tsx`**:

```tsx
import { initialState, reduce } from '../path/to/SomeReducer'
import React, {
  Context,
  ReactElement,
  ReactNode,
  createContext
} from 'react'
import ReducerContext, { ReducerContextDefaultValue } from 'react-reducer-context'

const someReducerContext: Context<ReducerContextDefaultValue<number, string>> = createContext(null)

function SomeReducerContext({ children }: {children: ReactNode}): ReactElement {
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

4 . Define the Actions Creators through a custom React Hook, which will represent the bridge between the `ReducerContext` and the Components:

`SomeActions.ts`:

```ts
import someReducerContext from '../path/to/SomeReducerContext'
import { useContext } from 'react'
import { ReducerContextValue } from 'react-reducer-context'

interface SomeActions {
  goUp: () => void;
  goDown: () => void;
}

interface UseActions {
  state: number;
  actions: SomeActions;
}

function useActions(): SomeActions {
  const [state, dispatch]: ReducerContextValue<number, string> = useContext(someReducerContext)
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

`SomeComponent1.tsx`:

```tsx
import React, { ReactElement } from 'react'

export default function SomeComponent1({onClick}: {onClick: () => void}): ReactElement {
  return (
    <button onClick={onClick}>
      Go up!
    </button>
  )
}
```

`SomeComponent2.tsx`:

```tsx
import React, { ReactElement } from 'react'

export default function SomeComponent2({onClick}: {onClick: () => void}): ReactElement {
  return (
    <button onClick={onClick}>
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

6 . Use Actions Creators:

`SomeContainer.tsx`:

```tsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import useActions, { UseActions } from './path/to/SomeActions'
import React, { ReactElement } from 'react'

export default function SomeContainer(): ReactElement {
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
import { SomeReducerContext } from '../path/to/SomeReducerContext'
import React, { ReactElement } from 'react'

export default function SomeContainer(): ReactElement {
  return (
    <SomeReducerContext>
      <SomeContainer />
    </SomeReducerContext>
  )
}
```

[Back to Main documentation](../README.md)
