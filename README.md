<p align="center">
  <a href="https://react-reducer-provider.github.io/"><img src="docs/react-reducer-provider.png" alt=" "/></a>
</p>

<h1 align="center">Asynchronous/Synchronous React Centralized State</h1>
<h2 align="center">with Hooks and HOC</h2>

<p align="center">through Centralized Reducers/Mappers</p>
<p align="center">Flux/Redux made easy, simple and beyond</p>

[![react-reducer-provider](https://badgen.net/badge/homepage/react-reducer-provider/blue)](https://react-reducer-provider.github.io/)
[![react-reducer-provider](https://badgen.net/badge/npmjs/react-reducer-provider/blue)](https://www.npmjs.com/package/react-reducer-provider)
[![ ](https://badgen.net/npm/v/react-reducer-provider)](https://www.npmjs.com/package/react-reducer-provider)
[![ ](https://badgen.net/bundlephobia/minzip/react-reducer-provider)](https://bundlephobia.com/result?p=react-reducer-provider)
[![ ](https://badgen.net/bundlephobia/dependency-count/react-reducer-provider)](https://bundlephobia.com/result?p=react-reducer-provider)
[![ ](https://badgen.net/bundlephobia/tree-shaking/react-reducer-provider)](https://bundlephobia.com/result?p=react-reducer-provider)
[![ ](https://badgen.net/npm/types/react-reducer-provider)](https://react-reducer-provider.github.io/docs/typings.html)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://react-reducer-provider.github.io/LICENSE.txt)
[![ ](https://badgen.net/badge/test/passing/green)](https://gmullerb.gitlab.io/react-reducer-provider/tests/tests_report.html)
[![ ](https://gitlab.com/gmullerb/react-reducer-provider/badges/master/coverage.svg)](https://gmullerb.gitlab.io/react-reducer-provider/coverage/index.html)
[![Github repo](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com/gmullerb/react-reducer-provider)
[![Gitlab repo](https://badgen.net/badge/icon/gitlab?icon=gitlab&label)](https://gitlab.com/gmullerb/react-reducer-provider)

__________________

**`react-reducer-provider` provides a centralized state, managed asynchronously or synchronously through a reducer or mapper.**

__________________

## Quick Start

1 . Add dependency:

`package.json`:

when using hooks:

```json
  ..
  "dependencies": {
    "react": ">=16.8.0"
    "react-reducer-provider": "5.0.0",
    ..
```

when using HOC:

```json
  ..
  "dependencies": {
    "react": ">=16.0.0"
    "react-reducer-provider": "5.0.0",
    ..
```

2 . Create the **`AsyncReducerProvider`**, **`SyncReducerProvider`**, **`AsyncMapperProvider`** or **`SyncMapperProvider`** component to manage state:

a . Define the initial state.  
b . Define the reducer or mapper function.  
c . Define the Reducer or Mapper Provider.

**`SomeReducerProvider.jsx`**:

```jsx
import React from 'react'
import { SyncReducerProvider } from 'react-reducer-provider'

const initialState = 0

function reduce(prevState, action, param1) {
  switch (action) {
    case 'ACTION1':
      return prevState + param1
    case 'ACTION2':
      return prevState - param1
    default:
      return prevState
  }
}

function SomeReducerProvider({ children }) {
  return (
    <SyncReducerProvider
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SyncReducerProvider>
  )
}

export default SomeReducerProvider
```

3 . Access the Provider component using `'react-reducer-provider'` hooks:

* **`useReducer`/`useMapper`**.
* **`useReducerDispatcher`/`useMapperDispatcher`**.
* **`useReducerState`/`useMapperState`**.

`SomeComponent1.jsx` => using `useReducer`:

```jsx
import { useReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const { state, dispatch } = useReducer()
  return (
    <button onClick={() => dispatch('ACTION1', 2)}>
      Go up (from {state})!
    </button>
  )
}
```

`SomeComponent2.jsx` => using `useReducerDispatcher`:

```jsx
import { useReducerDispatcher } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent2() {
  const dispatch = useReducerDispatcher()
  return (
    <button onClick={() => {
      const newState = dispatch('ACTION2', 1)
      console.info(newState)
    }}>
      Go down!
    </button>
  )
}
```

`SomeComponentN.jsx` => using `useReducerState`:

```jsx
import { useReducerState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponentN() {
  const currentState = useReducerState()
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

4 . Wrap components which will consume the `SomeReducerProvider` component:

`SomeContainer.jsx`:

```jsx
import SomeComponent1 from './path/to/SomeComponent1'
import SomeComponent2 from './path/to/SomeComponent2'
import SomeComponentN from './path/to/SomeComponentN'
import SomeReducerProvider from '../path/to/SomeReducerProvider'
import React from 'react'

export default function SomeContainer() {
  return (
    <SomeReducerProvider>
      <SomeComponent1/>
      <SomeComponent2/>
      <SomeComponentN/>
    </SomeReducerProvider>
  )
}
```

> This `SyncReducerProvider` example can be checked on line at [gmullerb-react-reducer-provider codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-forked-pjkve?file=/src/SomeReducerProvider.jsx):
[![Edit gmullerb-react-reducer-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-forked-pjkve?file=/src/SomeReducerProvider.jsx)  
> This `SyncReducerProvider`with HOC example can be checked on line at [gmullerb-react-reducer-provider codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-forked-lj4si?file=/src/SomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-forked-lj4si?file=/src/SomeReducerProvider.jsx)  
> An `AsyncReducerProvider` example can be checked on line at [gmullerb-react-reducer-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-forked-cyl3g?file=/src/SomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-forked-cyl3g?file=/src/SomeReducerProvider.jsx)  
> An `SyncMapperProvider` example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeMapperProvider.jsx)  
> An `AsyncMapperProvider` example can be checked on line at [gmullerb-react-mapper-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-forked-d2foz?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-forked-d2foz?file=/src/SomeMapperProvider.jsx)  
> Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [test files](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/js).  

__________________

## Goal

With the introduction of React Hooks, in some way using Flux **library**[1] was deprecated, `react-reducer-provider` looks to **give a quick and easy alternative using hooks to implement Flux with reducers**.

* Provides Reducers, but also **Mappers**.
* It allows to use [**Asynchronous** Reducer/Mapper/Dispatcher](https://react-reducer-provider.github.io/docs/reference-definition.html#asyncreducerprovider).
* [Reducer/Mapper/Dispatcher can have **more parameters/arguments** than traditional reducer which have only (state, action)](https://react-reducer-provider.github.io/docs/reference-definition.html#extraparameters).
* [Dispatcher **returns the new State or a Promise of the new State**](https://react-reducer-provider.github.io/docs/reference-definition.html#dispatcher).
* [Each Reducer/Mapper Provider can have a **different names, numbers or symbols which allows for easy identification and nesting**](https://react-reducer-provider.github.io/docs/nesting.html).
* Provides and Easy way of combining reducers. through Tags. [2].
* Smaller than other packages with same functionality, and no dependencies [3].
* It is ready for Tree Shaking optimization, so you get only what you need from the `react-reducer-provider` in the final app bundle [3].
* It provides [its own **type definitions for Typescript and Flow**](https://react-reducer-provider.github.io/docs/typings.html).
* Full Tested (not only focus in coverage, but also in cases: [tests](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/js), [results](https://gmullerb.gitlab.io/react-reducer-provider/tests/tests_report.html) and [coverage](https://gmullerb.gitlab.io/react-reducer-provider/coverage/index.html)).

> [1] Not the Flux architecture.  
> [2] react-redux makes it too complicated.  
> [3] Check and Compare with other solutions at [bundlephobia.com](https://bundlephobia.com/result?p=react-reducer-provider).  
> `react-reducer-provider` is the evolution of [react-named-reducer](https://www.npmjs.com/package/react-named-reducer) (which is a derivation of [react-reducer-context](https://www.npmjs.com/package/react-reducer-context)).

__________________

**You define**:

![Reducers](docs/reducer.svg "Reducers")

**or**


![Mappers](docs/mapper.svg "Mappers")

__________________

**and then you use them through a**:

![Dispatcher](docs/dispatcher.svg "Dispatcher")

__________________

## Prerequisites

**At least [`"react": ">=16.0.0"`]** - [React Context](https://reactjs.org/docs/context.html) => when using HOC, i.e. [`injectReducer` · `injectReducerState` · `injectReducerDispatcher` · `injectMapper` · `injectMapperState` · `injectMapperDispatcher`](https://react-reducer-provider.github.io/docs/reference-consumption-hoc.html) or [`injectTaggedAny` · `injectTaggedReducer` · `injectTaggedReducerState` · `injectTaggedReducerDispatcher` · `injectTaggedMapper` · `injectTaggedMapperState` · `injectTaggedMapperDispatcher`](https://react-reducer-provider.github.io/docs/tagged-consumption-hoc.html).

**[`"react": ">=16.8.0"`]** - [React Hooks](https://reactjs.org/docs/hooks-overview.html) => when using hooks, i.e. [`useReducer` · `useReducerState` · `useReducerDispatcher` · `useMapper` · `useMapperState` · `useMapperDispatcher`](https://react-reducer-provider.github.io/docs/reference-consumption-hooks.html) or [`useTaggedAny` · `useTaggedReducer` · `useTaggedReducerState` · `useTaggedReducerDispatcher` · `useTaggedMapper` · `useTaggedMapperState` · `useTaggedMapperDispatcher`](https://react-reducer-provider.github.io/docs/tagged-consumption-hooks.html).

>`react-reducer-provider` only enforces `"react": ">=16.0.0"` in `package.json` is up to you to be set which version you need.

__________________

## Documentation

* [`AsyncReducerProvider` · `SyncReducerProvider` · `AsyncMapperProvider` · `SyncMapperProvider`](https://react-reducer-provider.github.io/docs/reference-definition.html).
* [`useReducer` · `useReducerState` · `useReducerDispatcher` · `useMapper` · `useMapperState` · `useMapperDispatcher`](https://react-reducer-provider.github.io/docs/reference-consumption-hooks.html).
* [`injectReducer` · `injectReducerState` · `injectReducerDispatcher` · `injectMapper` · `injectMapperState` · `injectMapperDispatcher`](https://react-reducer-provider.github.io/docs/reference-consumption-hoc.html).
* [Singleton](https://react-reducer-provider.github.io/docs/singleton.html).
* [Nesting Providers](https://react-reducer-provider.github.io/docs/nesting.html).
* Combining/Blending - Tagged Reducers/Mappers.
  * [`AsyncTaggedReducerProvider` · `SyncTaggedReducerProvider` · `AsyncTaggedMapperProvider` · `SyncTaggedMapperProvider`](https://react-reducer-provider.github.io/docs/tagged-definition.html).
  * [`useTaggedAny` · `useTaggedReducer` · `useTaggedReducerState` · `useTaggedReducerDispatcher` · `useTaggedMapper` · `useTaggedMapperState` · `useTaggedMapperDispatcher`](https://react-reducer-provider.github.io/docs/tagged-consumption-hooks.html).
  * [`injectTaggedAny` · `injectTaggedReducer` · `injectTaggedReducerState` · `injectTaggedReducerDispatcher` · `injectTaggedMapper` · `injectTaggedMapperState` · `injectTaggedMapperDispatcher`](https://react-reducer-provider.github.io/docs/tagged-consumption-hoc.html).
* [Typings](https://react-reducer-provider.github.io/docs/typings.html).
* Extras:
  * [With Injection](https://react-reducer-provider.github.io/docs/with-injection.html).
    * [with Flow typings](https://react-reducer-provider.github.io/docs/with-injection-and-flow-typings.html).
    * [with Typescript typings](https://react-reducer-provider.github.io/docs/with-injection-and-ts-typings.html).
  * [With Actions Creators](https://react-reducer-provider.github.io/docs/with-actions-creators.html).
    * [with Flow typings](https://react-reducer-provider.github.io/docs/with-actions-creators-and-flow-typings.html).
    * [with Typescript typings](https://react-reducer-provider.github.io/docs/with-actions-creators-and-ts-typings.html).
  * [Testing](https://react-reducer-provider.github.io/docs/testing.html).
  * Examples:
    * **[Online examples](https://react-reducer-provider.github.io/docs/online.html)**.
    * [Examples from tests](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/js).
    * [Typings' examples from tests](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/typings).
  * [Migration](https://react-reducer-provider.github.io/docs/migration.html).
  * [Extending/Developing](https://react-reducer-provider.github.io/docs/developing.html).

* [`CHANGELOG`](https://react-reducer-provider.github.io/docs/CHANGELOG.html): add information of notable changes for each version here, chronologically ordered ([Keep a Changelog](http://keepachangelog.com)).

## Contributing

* **Use it**.
* **Share it**.
* [Give it a Star](https://github.com/gmullerb/react-reducer-provider).
* [Propose changes or improvements](https://github.com/gmullerb/react-reducer-provider/issues).
* [Report bugs](https://github.com/gmullerb/react-reducer-provider/issues).

## License

[MIT License](https://react-reducer-provider.github.io/LICENSE.txt)

__________________

## Remember

* Use code style verification tools => Encourages Best Practices, Efficiency, Readability and Learnability.
* Code Review everything => Encourages Functional suitability, Performance Efficiency and Teamwork.
* If viable, Start testing early => Encourages Reliability and Maintainability.

## Additional words

Don't forget:

* **Love what you do**.
* **Learn everyday**.
* **Learn yourself**.
* **Share your knowledge**.
* **Think different!**.
* **Learn from the past, dream on the future, live and enjoy the present to the max!**.
* **Enjoy and Value the Quest** (It's where you learn and grow).

At life:

* Let's act, not complain.
* Be flexible.

At work:

* Let's give solutions, not questions.
* Aim to simplicity not intellectualism.
