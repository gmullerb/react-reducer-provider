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
    "react-named-reducer": "2.0.1",
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

__________________

## Goal

With the introduction of React Hooks, in some way using Flux library[1] was deprecated, react-named-reducer looks to **give a quick and easy alternative using hooks to implement Flux with reducers**, with typings for Typescript and Flow.

> [1] Not the Flux architecture.
__________________

## Documentation

* [`NamedReducer` | `useNamedReducer` | `useReducerState` | `useReducerDispatcher`](readme/reference.md).
  * [Nesting](readme/reference.md#nesting).
  * [Typings](readme/reference.md#typings).
  * [Prerequisites](readme/reference.md#prerequisites).
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
