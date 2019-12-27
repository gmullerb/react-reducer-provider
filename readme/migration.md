# Migration from `react-reducer-context` to `react-named-reducer`

1 . Change package dependency:

`package.json`:

* from:  
`"react-reducer-context": "1.0.2"`  

* to:  
`"react-named-reducer": "1.0.0"`  

2 . Change imports:

* from:  
`import .. from 'react-reducer-context'`

* to:  
`import .. from 'react-named-reducer'`


3 . Change the "old" `ReducerContext` to `NamedReducer`:

3 . a. import:

* from:  
`import ReducerContext from 'react-reducer-context'`

* to:  
`import { NamedReducer } from 'react-named-reducer'`

3 . b. Component:

* from:  
`ReducerContext`

* to:  
`NamedReducer`

3 . c. Properties:

* from:  
`context={someReducerContext}`

* to:  
`name='someReducerContext'`

3 . d. No need for context creation:

* Remove `createContext` import.
* Remove statement with `createContext(null)`
* Remove the export of the context.

e.g.:

from:

```jsx
import React, { createContext } from "react";
import ReducerContext from "react-reducer-context";

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

const someReducerContext = createContext(null);

function SomeReducerContext({ children }) {
  return (
    <ReducerContext
      context={someReducerContext}
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </ReducerContext>
  );
}

export { someReducerContext as default, SomeReducerContext };

```

to:

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
      name="someReducerContext"
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </NamedReducer>
  );
}

export { SomeNamedReducer };
```

4 . Change uses of "old" `ReducerContext` to `NamedReducer` hooks:

4 . a. No need for context:

* Remove the import of the context.

4 . b. When using `useReducerContext`:

* from:  
`import { useReducerContext } from "react-reducer-context"`  
and  
`useReducerContext(someReducerContext)`

* to:  
`import { useNamedReducer } from "react-named-reducer"`  
and  
`useNamedReducer('someReducerContext')`

4 . c. When using `useNamedReducer` hook:

* from:  
`useReducerState(someReducerContext)`

* to:  
`useReducerState('someReducerContext')`

4 . d. When using `useNamedReducer` hook:

* from:  
`useReducerDispatcher(someReducerContext)`

* to:  
`useReducerDispatcher('someReducerContext')`

e.g.:

from:

```jsx
import someReducerContext from "./SomeReducerContext";
import { useReducerContext } from 'react-reducer-context';
import React from "react";

export default function SomeComponent1() {
  const { state, dispatch } = useReducerContext(someReducerContext)
  return <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>;
}
```

to:

```jsx
import { useNamedReducer } from "react-named-reducer";
import React from "react";

export default function SomeComponent1() {
  const { state, dispatch } = useNamedReducer("someReducerContext");
  return (
    <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>
  );
}
```

## Main documentation

[Back](../README.md)
