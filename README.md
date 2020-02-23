<p align="center">
  <img src="https://assets.gitlab-static.net/uploads/-/system/project/avatar/16068388/named.png"/>
</p>

<h1 align="center">React Component to easily manage State through reducers using hooks</h1>

<p align="center">with typings for Typescript and Flow.</p>

<p align="center">A derivation of <a href="https://www.npmjs.com/package/react-reducer-context">react-reducer-context</a></p>

__________________

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.txt) ![GitHub package.json version](https://img.shields.io/github/package-json/v/gmullerb/react-named-reducer.svg?logo=npm) ![coverage](https://gitlab.com/gmullerb/react-named-reducer/badges/master/coverage.svg) [![react-named-reducer](https://img.shields.io/badge/npm-react--named--reducer-blue?logo=npm)](https://www.npmjs.com/package/react-named-reducer)

This project is licensed under the terms of the [MIT license](LICENSE.txt).
__________________

## Quick Start

1 . Add dependency:

`package.json`:

```json
  ..
  "dependencies": {
    "react": "^16.8.0"
    "react-named-reducer": "2.0.0",
    ..
```

2 . Create the **`NamedReducer`** component to manage state:

* Define the initial state.
* Define the reducer function.
* Define the `NamedReducer`.

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

export default SomeNamedReducer
```

3 . Wrap components which needs the `NamedReducer` component:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import SomeNamedReducer from '../path/to/SomeNamedReducer'
import React from 'react'

export default function SomeContainer() {
  return (
    <SomeNamedReducer>
      <SomeComponent1/>
      <SomeComponent2/>
      <SomeComponentN/>
    </SomeNamedReducer>
  )
}
```

4 . Access the `NamedReducer` component using `'react-named-reducer'` hooks:

* **`useNamedReducer`**.
* **`useReducerDispatcher`**.
* **`useReducerState`**.

`SomeComponent1.jsx`[1] => using `useNamedReducer`:

```jsx
import { useNamedReducer } from 'react-named-reducer'
import React from 'react'

export default function SomeComponent1() {
  const { state, dispatch } = useNamedReducer('someNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {state})!
    </button>
  )
}
```

`SomeComponent2.jsx`[1] => using `useReducerDispatcher`:

```jsx
import { useReducerDispatcher } from 'react-named-reducer'
import React from 'react'

export default function SomeComponent2() {
  const dispatch = useReducerDispatcher('someNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

`SomeComponentN.jsx`[1] => using `useReducerState`:

```jsx
import { useReducerState } from 'react-named-reducer'
import React from 'react'

export default function SomeComponentN() {
  const currentState = useReducerState('someNamedReducer')
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

> This example can be checked on line: live at [gmullerb-react-named-reducer demo](https://8ksn5.csb.app/) and the code is at [gmullerb-react-named-reducer codesandbox](https://codesandbox.io/s/gmullerb-react-named-reducer-8ksn5?module=%2Fsrc%2FSomeNamedReducer.jsx):  
[![Edit gmullerb-react-named-reducer](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-named-reducer-8ksn5?module=%2Fsrc%2FSomeNamedReducer.jsx)  
> [1] Injection can be used in order to improve design, but in favor of quick example this was surrender, look at [Injection](readme/with-injection.md) for injection example.  

5 . If required, jump based on requirements into:

* [`NamedReducer` | `useNamedReducer` | `useReducerState` | `useReducerDispatcher`](#reference).
  * [Nesting](#nesting).
  * [Typings](#typings).
  * [Prerequisites](#prerequisites).
  * Extras:
    * [With Injection](readme/with-injection.md).
      * [with Flow typings](readme/with-injection-and-flow-typings.md).
      * [with Typescript typings](readme/with-injection-and-ts-typings.md).
    * [With Actions Creators](readme/with-actions-creators.md).
      * [with Flow typings](readme/with-actions-creators-and-flow-typings.md).
      * [with Typescript typings](readme/with-actions-creators-and-ts-typings.md).
    * [Testing](readme/testing.md).
    * [Accessing the Context](readme/accessing-context.md).
    * [Migration from `react-reducer-context` to `react-named-reducer`](readme/migration.md).
* [Extending/Developing](readme/developing.md).
* [MIT License](LICENSE.txt).

__________________

## Goal

With the introduction of React Hooks, in some way using Flux library[1] was deprecated, react-named-reducer looks to **give a quick and easy alternative using hooks to implement Flux with reducers**, with typings for Typescript and Flow.

> [1] Not the Flux architecture.
__________________

## `NamedReducer` | `useNamedReducer` | `useReducerState` | `useReducerDispatcher`

[`NamedReducer`](src/main/js/NamedReducer.js) is a React Component which defines a [React Context](https://reactjs.org/docs/context.html) that allows to Manage State using [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Reducer: function that changes the State based on an Action and the previous State.
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](readme/flux.svg "Flux architecture")

[`NamedReducer`](src/main/js/NamedReducer.js) is a React "Special" Element that requires 3 properties:

* `name`: constitutes the name that identifies the `NamedReducer`.
  * **must keep track of name to avoid overriding**.
* `reducer`: a function that will receive the current state and an action to produce a new state.
  * internally use [`useReducer` hook](https://reactjs.org/docs/hooks-reference.html#usereducer), which return the current state and a [dispatcher](http://facebook.github.io/flux/docs/dispatcher).
* `initialState`: inception state for the component.

```jsx
  <NamedReducer
    name='someNamedReducer'
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </NamedReducer>
```

Each `NamedReducer` is equivalent to an Flux stream:

![NamedReducer](readme/react-named-reducer.svg "NamedReducer")

`children` elements will be **able to access the State and Dispatcher**.  
There are different ways of doing this:

* **`useNamedReducer`**.
* **`useReducerDispatcher`**.
* **`useReducerState`**.
* Other ways: [Accessing the Context](readme/accessing-context.md).

> Examples can be also seen at: [`NamedReducer.test.jsx`](src/test/js/NamedReducer.test.jsx).

### Nesting

`NamedReducer` can be nested in layers, in order to have several nested Reducer/State.

```jsx
  <NamedReducer
    name='someNamedReducer1'
    reducer={reduce1}
    initialState={initialState1}
  >
    {someChildren}
    <NamedReducer
      name='someNamedReducerN'
      reducer={reduceN}
      initialState={initialStateN}
    >
      {moreChildren}
    </NamedReducer>
  </NamedReducer>
```

`moreChildren` can access the State and the Dispatcher of the NamedReducer1 plus the State and the Dispatcher of the NamedReducerN.

![Nested NamedReducer](readme/nested-named-reducer.svg "Nested NamedReducer")

### Typings

**`react-named-reducer` defines typings for Flow and Typescript**:

* Any can be used without an "special" [1] configuration.
  * Typings definitions are located together with source files:
    * Flow: [`NamedReducer.js.flow`](src/main/js/NamedReducer.js.flow).
    * Typescript: [`NamedReducer.d.ts`](src/main/js/NamedReducer.d.ts).

Both provide the following types:

* `NamedReducer<STATE, ACTION>`: specifies the Function React Component structure.
* `NamedReducerProps<STATE, ACTION>`: defines the properties receive the `NamedReducer`.
* `NamedReducerInterface<STATE, ACTION>`: defines the type of the value return by `useNamedReducer`.
* `Dispatcher<ACTION>`: defines the function that receives the action that triggers the change of the state.

`STATE`: State type.  
`ACTION`: Action type.  

E.G.:

`SomeComponent.jsx` or `SomeComponent.tsx`:

```tsx
  const { state, dispatch } = useNamedReducer<number, string>('someNamedReducer')
```

or

```tsx
  const dispatch = useReducerDispatcher<string>('someNamedReducer')
```

or

```tsx
  const state = useReducerState<number>('someNamedReducer')
```

* A more "complete" example with Typescript can be seen at: [`typingTest.tsx`](src/test/typings/ts/typingTest.tsx).
* A more "complete" example with Flow can be seen at: [`typingTest.jsx`](src/test/typings/flow/typingTest.jsx).

> Initial example with Typescript typings can be checked on line: live at [gmullerb-react-named-reducer-ts demo](https://84vy7.csb.app/) and the code is at [gmullerb-react-named-reducer-ts codesandbox](https://codesandbox.io/s/gmullerb-react-named-reducer-ts-84vy7?module=%2Fsrc%2FSomeNamedReducer.tsx):  
[![Edit gmullerb-react-named-reducer-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-named-reducer-ts-84vy7?module=%2Fsrc%2FSomeNamedReducer.tsx)  
> Initial example with Flow typings can be checked on line: live at [gmullerb-react-named-reducer-flow demo](https://9tznr.csb.app/) and the code is at [gmullerb-react-named-reducer-flow codesandbox](https://codesandbox.io/s/gmullerb-react-named-reducer-flow-9tznr?module=%2Fsrc%2FSomeNamedReducer.jsx):  
[![Edit gmullerb-react-named-reducer](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-named-reducer-flow-9tznr?module=%2Fsrc%2FSomeNamedReducer.jsx)  
> [1] Only the usual Flow or Typescript configuration (e.g. no need for @types).

__________________

### Prerequisites

* [React Hooks](https://reactjs.org/docs/hooks-overview.html) => [`"react": "^16.8.0"`](https://www.npmjs.com/package/react).

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
