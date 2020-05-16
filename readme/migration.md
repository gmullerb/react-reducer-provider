# Migration from [`react-named-reducer`](https://www.npmjs.com/package/react-named-reducer) to [`react-reducer-provider`](https://www.npmjs.com/package/react-reducer-provider)

1 . Change package dependency:

`package.json`:

* from:  
`"react-named-reducer": "2.0.1"`  

* to:  
`"react-reducer-provider": "3.5.0"`  

2 . Change imports:

* from:  
`import .. from 'react-named-reducer'`

* to:  
`import .. from 'react-reducer-provider'`

## Main source - Reducer Component Definition

3 . Change the "old" `NamedReducer` to `SyncReducerProvider`:

3 . a. Change import:

* from:  
`import { NamedReducer } from 'react-named-reducer'`

* to:  
`import { SyncReducerProvider } from 'react-reducer-provider'`

3 . b. Change Component:

* from:  
`NamedReducer`

* to:  
`SyncReducerProvider`

e.g.:

*from*:

```jsx
import React from "react";
import { NamedReducer } from "react-named-reducer";

const initialState = 0;

function reduce(prevState, action) {
  switch (action) {
    case "ACTION1":
      return prevState + 1;
    case "ACTION2":
      return prevState - 1;
    default:
      return prevState;
  }
}

function SomeNamedReducer({ children }) {
  return (
    <NamedReducer
      name="someNamedReducer"
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </NamedReducer>
  );
}

export { SomeNamedReducer };
```

*to*:

```jsx
import React from "react";
import { SyncReducerProvider } from "react-reducer-provider";

const initialState = 0;

function reduce(prevState, action) {
  switch (action) {
    case "ACTION1":
      return prevState + 1;
    case "ACTION2":
      return prevState - 1;
    default:
      return prevState;
  }
}

function SomeNamedReducer({ children }) {
  return (
    <SyncReducerProvider
      name="someNamedReducer"
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SomeNamedReducer>
  );
}

export { SomeNamedReducer };
```

### Typings

* from:  
`NamedReducerProps`

* to:  
`SyncReducerProps`

## Main source - Reducer Consumption

4 . Change uses of "old" `useNamedReducer` to `useReducer` hook:

4 . a. Change import:

* from:  
`import { useNamedReducer } from 'react-named-reducer'`

* to:  
`import { useReducer } from 'react-reducer-provider'`

4 . b. Change hook:

* from:  
`const { state, dispatch } = useNamedReducer("someNamedReducer")`

* to:  
`const [ state, dispatch ] = useReducer("someNamedReducer")`

e.g.:

*from*:

```jsx
import { useNamedReducer } from 'react-named-reducer';
import React from "react";

export default function SomeComponent1() {
  const { state, dispatch } = useNamedReducer("someNamedReducer")
  return <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>;
}
```

*to*:

```jsx
import { useReducer } from "react-reducer-provider";
import React from "react";

export default function SomeComponent1() {
  const [ state, dispatch ] = useReducer("someNamedReducer");
  return (
    <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>
  );
}
```

> if context was used, i.e. `const [state, dispatch] = useContext(useNamedReducerContext('someNamedReducer'))`, just change it to `const [ state, dispatch ] = useReducer("someNamedReducer")`.

### Typings

* from:  
`NamedReducerInterface`

* to:  
`ProviderValue`

e.g.:

*from*:

```tsx
  const { state, dispatch }: NamedReducerInterface<State, Action> = useNamedReducer("someNamedReducer")
```

*to*:

```tsx
  const [ state, dispatch ]: ProviderValue<State, Action> = useReducer("someNamedReducer");
```

> Prefer *Types in function approach*, [typings](typings.md).

## Test Source

With traditional & sensational Jasmine:

*from*:

```jsx
  import * as ReactNamedReducer from 'react-named-reducer'
  ..
  mockState = {}
  mockDispatcher = jasmine.createSpy('dispatcher')
  spyOn(ReactNamedReducer, 'useNamedReducer')
    .and
    .returnValue({
      state: mockState,
      dispatch: mockDispatcher
    })
```

*to*:

```jsx
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  mockState = {}
  mockDispatcher = jasmine.createSpy('dispatcher')
  spyOn(ReducerProviderModule, 'useReducer')
    .and
    .returnValue([
      mockState,
      mockDispatcher
    ])
```

With Jest:

*from*:

```jsx
  mockState = {}
  mockDispatcher = jest.fn()
  jest.mock('react-named-reducer', () => ({
    useNamedReducer: () => ({
      state: mockState,
      dispatch: mockDispatcher
    })
  }))
```

*to*:

```jsx
  mockState = {}
  mockDispatcher = jest.fn()
  jest.mock('react-reducer-provider', () => ({
    useReducer: () => [
      mockState,
      mockDispatcher
    ]
  }))
```

## Main documentation

[Back](../README.md)
