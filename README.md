# React Reducer Context

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.txt) ![GitHub package.json version](https://img.shields.io/github/package-json/v/gmullerb/react-reducer-context.svg?logo=npm) ![coverage](https://gitlab.com/gmullerb/react-reducer-context/badges/master/coverage.svg) [![react-reducer-context](https://img.shields.io/badge/npm-react--reducer--context-blue?logo=npm)](https://www.npmjs.com/package/react-reducer-context)

**React Component to manage State through reducers using contexts and hooks.**

This project is licensed under the terms of the [MIT license](LICENSE.txt).
__________________

## Quick Start

1 . Add dependency:

`package.json`:

```json
  ..
  "dependencies": {
    "react-reducer-context": "1.0.0",
    ..
```

2 . Create and Use a `ReducerContext` component to manage state:

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

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import { SomeReducerContext } from '../path/to/SomeReducerContext'
import React from 'react'

export default function SomeContainer() {
  return (
    <SomeReducerContext>
      <SomeComponent1/>
      <SomeComponent2/>
      <SomeComponentN/>
    </SomeReducerContext>
  )
}
```

`SomeComponent1.jsx` [1]:

```jsx
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

export default function SomeComponent1() {
  const [, dispatch] = useContext(someReducerContext)
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up!
    </button>
  )
}
```

`SomeComponent2.jsx` [1]:

```jsx
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

export default function SomeComponent2() {
  const [, dispatch] = useContext(someReducerContext)
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

`SomeComponentN.jsx` [1]:

```jsx
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

export default function SomeComponentN() {
  const [currentState,] = useContext(someReducerContext)
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

> [1] Injection can be used in order to improve design, but in favor of quick example this was surrender, look at [Injection](#with-injection) for injection example.  
> This example can be checked on line: live at [gmullerb-react-reducer-context demo](https://5dssd.csb.app/) and the code is at [gmullerb-react-reducer-context codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-5dssd?module=%2Fsrc%2FSomeReducerContext.jsx):  
[![Edit gmullerb-react-reducer-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-5dssd?module=%2Fsrc%2FSomeReducerContext.jsx)

3 . Jump based on requirements into:  

* [Reference](#reference): for customization or digging on how it works.
  * [Nesting](#nesting).
  * [Typings](#typings).
* [Configuration/Using](#configuration/using):
  * [Prerequisites](#prerequisites).
  * [Configuration](#configuration).
  * [Using](#using):
    * [With Injection](#with-injection).
      * [with Flow typings](readme/with-injection-and-flow-typings.md).
      * [with Typescript typings](readme/with-injection-and-ts-typings.md).
    * [With Actions Creators](#with-actions-creators)
      * [with Flow typings](readme/with-actions-creators-and-flow-typings.md)
      * [with Typescript typings](readme/with-actions-creators-and-ts-typings.md)
* [Extending/Developing](readme/developing.md)
* [MIT License](LICENSE.txt)

__________________

## Goal

With the introduction of React Hooks, in some way using Flux library was deprecated, react-reducer-context looks to **give a quick and easy alternative using hooks to implement Flux with reducers**.
__________________

## Reference

[`ReducerContext`](src/main/js/ReducerContext.js) is based on [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Reducer: function that changes the State based on an Action and the previous State.
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](readme/flux.svg "Flux architecture")

[`ReducerContext`](src/main/js/ReducerContext.js) is a React "Special" Element that requires 3 properties:

* `context`: constitutes the [React Context](https://reactjs.org/docs/context.html) which will be handle by this component.
  * use `React.createContext(null)` to create the context.
* `reducer`: a function that will receive the current state and an action to produce a new state.
  * internally use [`useReducer` hook](https://reactjs.org/docs/hooks-reference.html#usereducer), which return the current state and a [dispatcher](http://facebook.github.io/flux/docs/dispatcher).
* `initialState`: inception state for the component.

```jsx
  <ReducerContext
    context={someReducerContext}
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </ReducerContext>
```

Each `ReducerContext` is equivalent to an Flux stream:

![ReducerContext](readme/react-reducer-context.svg "ReducerContext")

`children` elements will be **able to access the State and Dispatcher**. There are different ways of doing this:

A . Using [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext):

```jsx
  const [state, dispatch] = useContext(someReducerContext)
```

e.g.:

```jsx
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

export default function SomeComponent() {
  const [state, dispatch] = useContext(someReducerContext)
  return (
    <button onClick={() => dispatch({
        type: 'SOME_ACTION',
        data: someValue
      })}
    >
      Do something! ({state.someValue})
    </button>
  )
}
```

B . Using [`Context.Consumer`](https://reactjs.org/docs/context.html#contextconsumer):

```jsx
  <someReducerContext.Consumer>
    {
      ([state, dispatch]) => (
        ..
      )
    }
  </someReducerContext.Consumer>
```

e.g.:

```jsx
import someReducerContext from '../path/to/SomeReducerContext'
import React, { useContext } from 'react'

export default function SomeComponent() {
  return (
    <someReducerContext.Consumer>
    {
      ([state, dispatch]) => (
        <button onClick={() => dispatch({
            type: 'SOME_ACTION',
            data: someValue
          })}
        >
          Do something! ({state.someValue})
        </button>
      )
    }
    </someReducerContext.Consumer>
  )
}
```

> There is another way using [`contextType`](https://reactjs.org/docs/context.html#classcontexttype), but is not functional approach, so it is not exposed.  

### Nesting

Based on [React Context](https://reactjs.org/docs/context.html), `ReducerContext` can be nested in layers, in order to have several nested Reducer/State.

```jsx
  <ReducerContext
    context={someReducerContext1}
    reducer={reduce1}
    initialState={initialState1}
  >
    {someChildren}
    <ReducerContext
      context={someReducerContextN}
      reducer={reduceN}
      initialState={initialStateN}
    >
      {moreChildren}
    </ReducerContext>
  </ReducerContext>
```

`moreChildren` can access the State and the Dispatcher of the ReducerContext1 plus the State and the Dispatcher of the ReducerContextN.

![Nested ReducerContext](readme/nested-reducer-context.svg "Nested ReducerContext")

### Typings

**`react-reducer-context` defines typings for Flow and Typescript**:

* Any can be used without an "special" [1] configuration.

Typings definitions are located together with source files:

* Flow: [`ReducerContext.js.flow`](src/main/js/ReducerContext.js.flow).
* Typescript: [`ReducerContext.d.ts`](src/main/js/ReducerContext.d.ts).

Both provide the following types:

* `ReducerContext<S, A>`: specifies the Function React Component structure.
* `ReducerContextProps<S, A>`: defines the properties receive the `ReducerContext`.
* `ReducerContextDefaultValue<S, A>`: specifies the type of the `React.Context` when created.
  * Essentially is a `ReducerContextValue<S, A>` which also allows a `null` value, which is required when creating the context.
  * If required, this type should be use only when creating the `ReducerContext`.
* `ReducerContextValue<S, A>`: defines the type of the value contained in the `React.Context`.
  * This type should be for using the created `ReducerContext` (that never going to be null).

`S`: State type.  
`A`: Action type.  

E.G.:

`SomeReducerContext.jsx` or `SomeReducerContext.tsx`:

```jsx
..

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

const someReducerContext: Context<ReducerContextDefaultValue<number, string>> = createContext(null)

..

```

`SomeComponent.jsx` or `SomeComponent.tsx`:

```jsx
  ..
  const [state, dispatch]: ReducerContextValue<number, string> = useContext(someReducerContext)
  ..
```

* A more "complete" example with Flow can be seen at: [`typingTest.jsx`](src/test/typings/flow/typingTest.jsx).
* A more "complete" example with Typescript can be seen at: [`typingTest.tsx`](src/test/typings/ts/typingTest.tsx).

> [1] Only the usual Flow or Typescript configuration.  
> Initial example with Flow typings can be checked on line: live at [gmullerb-react-reducer-context-flow demo](https://enm0t.csb.app/) and the code is at [gmullerb-react-reducer-context-flow codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-flow-enm0t?module=%2Fsrc%2FSomeReducerContext.jsx):  
[![Edit gmullerb-react-reducer-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-flow-enm0t?module=%2Fsrc%2FSomeReducerContext.jsx)  
> Initial example with Typescript typings can be checked on line: live at [gmullerb-react-reducer-context-ts demo](https://072vz.csb.app/) and the code is at [gmullerb-react-reducer-context-ts codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-ts-072vz?module=%2Fsrc%2FSomeReducerContext.tsx):  
[![Edit gmullerb-react-reducer-context-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-ts-072vz?module=%2Fsrc%2FSomeReducerContext.tsx)
__________________

## Configuration/Using

### Prerequisites

* [React Hooks](https://reactjs.org/docs/hooks-overview.html) => [`"react": "^16.8.0"`](https://www.npmjs.com/package/react).

### Configuration

1 . Add **react-reducer-context** (and prerequisite) to `package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-reducer-context": "1.0.0",
    ..
```

### Using

#### With Injection

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
import React, { useContext } from 'react'

export default function SomeContainer() {
  const [state, dispatch] = useContext(someReducerContext)
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

> [with Flow typings](readme/with-injection-and-flow-typings.md).  
> [with Typescript typings](readme/with-injection-and-ts-typings.md).  
> This example can be checked on line: live at [gmullerb-react-reducer-context-with-injection demo](https://0jom3.csb.app/) and the code is at [gmullerb-react-reducer-context-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-with-injection-0jom3?module=%2Fsrc%2FSomeReducerContext.jsx):  
[![Edit gmullerb-react-reducer-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-with-injection-0jom3?module=%2Fsrc%2FSomeReducerContext.jsx)

#### With Actions Creators

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

3 . Create the `ReducerContext`:

**`SomeReducerContext.jsx`**:

```jsx
import { initialState, reduce } from '../path/to/SomeReducer'
import React, { createContext } from 'react'
import ReducerContext from 'react-reducer-context'

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

4 . Define the Actions Creators through a custom React Hook, which will represent the bridge between the `ReducerContext` and the Components:

`SomeActions.js`:

```js
import someReducerContext from '../path/to/SomeReducerContext'
import { useContext } from 'react'

export default function useActions() {
  const [state, dispatch] = useContext(someReducerContext)
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

> [with Flow typings](readme/with-actions-creators-and-flow-typings.md).  
> [with Typescript typings](readme/with-actions-creators-and-ts-typings.md).  
> This example can be checked on line: live at [gmullerb-react-reducer-context-with-injection demo](https://vsqbf.csb.app/) and the code is at [gmullerb-react-reducer-context-with-injection codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-context-with-actions-creators-vsqbf?module=%2Fsrc%2FSomeReducerContext.jsx):  
[![Edit gmullerb-react-reducer-context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-context-with-actions-creators-vsqbf?module=%2Fsrc%2FSomeReducerContext.jsx)

__________________

## Extending/Developing

[Developing](readme/developing.md)

## Documentation

* [`CHANGELOG.md`](CHANGELOG.md): add information of notable changes for each version here, chronologically ordered [1].

> [1] [Keep a Changelog](http://keepachangelog.com)

## License

[MIT License](LICENSE.txt)
__________________

## Remember

* Use code style verification tools => Encourages Best Practices, Efficiency, Readability and Learnability.
* Start testing early => Encourages Reliability and Maintainability.
* Code Review everything => Encourages Functional suitability, Performance Efficiency and Teamwork.

## Additional words

Don't forget:

* **Love what you do**.
* **Learn everyday**.
* **Learn yourself**.
* **Share your knowledge**.
* **Learn from the past, dream on the future, live and enjoy the present to the max!**.

At life:

* Let's act, not complain.
* Be flexible.

At work:

* Let's give solutions, not questions.
* Aim to simplicity not intellectualism.
