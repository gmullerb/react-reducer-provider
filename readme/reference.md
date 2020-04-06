# `SyncReducerProvider` | `AsyncReducerProvider` | `useReducer` | `useReducerState` | `useReducerDispatcher`

[`SyncReducerProvider` & `AsyncReducerProvider`](../src/main/js/NamedReducer.js) are React Components which defines a [React Context](https://reactjs.org/docs/context.html) that allows to Manage State using [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Reducer: function that changes the State based on an Action and the previous State.
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](flux.svg "Flux architecture")

Each `SyncReducerProvider` or `AsyncReducerProvider` is equivalent to a Flux stream:

![`SyncReducerProvider` & `AsyncReducerProvider`](react-reducer-provider.svg "SyncReducerProvider & AsyncReducerProvider")

[`SyncReducerProvider` & `AsyncReducerProvider`](../src/main/js/NamedReducer.js) are React "Special" Elements defined by 3 properties:

*properties*:

* `reducer`: a asynchronous/synchronous function that will receive the current state and an action to produce a new state.
* `initialState`: inception state for the component.
* `name` (optional): constitutes the name that identifies the `SyncReducerProvider` or `AsyncReducerProvider`, which is useful when using more than 1 provider.
  * **developer must keep track of names to avoid overriding**.

```jsx
<SyncReducerProvider
  name='someNamedReducer'
  reducer={syncReduce}
  initialState={initialState}
>
  {children}
</SyncReducerProvider>
```

  or

```jsx
<AsyncReducerProvider
  name='someNamedReducer'
  reducer={asyncReduce}
  initialState={initialState}
>
  {children}
</AsyncReducerProvider>
```

> Internally are implemented only using [`useReducer` hook](https://reactjs.org/docs/hooks-reference.html#usereducer), [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate) and [`useCallback` hook](https://reactjs.org/docs/hooks-reference.html#usecallback).

Reducer will never be accessible directly from `children` elements, they will be **able to access the State and Dispatcher**.

There are different ways of doing this:

* **`useReducer`**, which give access both State and Dispatcher.
* **`useReducerDispatcher`**, which give access only the Dispatcher.
* **`useReducerState`**, which give access only the State.

> Examples can be seen at: [`SyncReducerProvider.test.jsx`](../src/test/js/SyncReducerProvider.test.jsx) and [`AsyncReducerProviderWithAsync.test.jsx`](..src/test/js/AsyncReducerProviderWithAsync.test.jsx).

## `useReducer`

*parameters*:

* `name` (optional): constitutes the name of the `SyncReducerProvider` or `AsyncReducerProvider` being accessed.

*returns*:

* a tuple containing the `state` as first element, and the `dispatcher` as second element.

```jsx
import { useReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const [ state, dispatch ] = useReducer('someNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {state})!
    </button>
  )
}
```

## `useReducerDispatcher`

*parameters*:

* `name` (optional): constitutes the name of the `SyncReducerProvider` or `AsyncReducerProvider` being accessed.

*returns*:

* the `dispatcher` of the respective Reducer Provider.

```jsx
import { useReducerDispatcher } from 'react-reducer-provider'
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

## `useReducerState`

*parameters*:

* `name` (optional): constitutes the name of the `SyncReducerProvider` or `AsyncReducerProvider` being accessed.

*returns*:

* the `state` of the respective Reducer Provider.

```jsx
import { useReducerState } from 'react-reducer-provider'
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

## Synchronous Reducer => `SyncReducerProvider`

```jsx
<SyncReducerProvider
  name='someNamedReducer'
  reducer={syncReduce}
  initialState={initialState}
>
  {children}
</SyncReducerProvider>
```

* `reducer` will be a synchronous function that will receive the current state and an action to produce a new state.

    `function syncReducer<STATE, ACTION>(prevState: STATE, action: ACTION): STATE`

    e.g.:

```js
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
```

* when accessing the Reducer Provider, the `dispatcher` will be also a synchronous function:

    `function dispatch<ACTION>(action: ACTION): void`

    e.g.:

```jsx
  export default function SomeComponent2() {
    const dispatch = useReducerDispatcher('someNamedReducer')
    return (
      <button onClick={() => dispatch('ACTION2')}>
        Go down!
      </button>
    )
  }
```

## Asynchronous Reducer => `AsyncReducerProvider`

```jsx
<AsyncReducerProvider
  name='someNamedReducer'
  reducer={asyncReduce}
  initialState={initialState}
>
  {children}
</AsyncReducerProvider>
```

* `reducer` will be an **asynchronous** function that will receive the current state and an action to produce a `Promise` of the new state.

    `async function syncReducer<STATE, ACTION>(prevState: STATE, action: ACTION): Promise<STATE>`

    e.g.:

```js
  async function reduce(prevState, action) {
    switch (action) {
      case 'ACTION1':
        return await someAsyncProcess1(prevState)
      case 'ACTION2':
        return someAsyncProcess2(prevState)
      default:
        return prevState
    }
  }

```

* when accessing the Reducer Provider, the `dispatcher` will be also a **asynchronous** function:

    `async function dispatch<ACTION>(action: ACTION): Promise<void>`

    e.g.:

```jsx
  export default function SomeComponent2() {
    const dispatch = useReducerDispatcher('someNamedReducer')
    return (
      <button onClick={(async () => dispatch('ACTION2').then(someProcess())}>
        Go down!
      </button>
    )
  }
```

> Although `AsyncReducerProvider` can be used for synchronous reducer/dispatcher, It is not is purpose and implementation is suitable for asynchronous processes, long story short, for synchronous processes, use `SyncReducerProvider`.  
> When the `dispatch` is resolved is an indication that the state was change, but not of any required re-rendering being done.  
> An example can be checked on line at [gmullerb-react-reducer-provider codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-m0924?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-m0924?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An example of use can be looked at [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Singleton Reducer Provider

If no name is provided a "unique"[1] Reducer will be created.

> [1] This is a convention, i.e. is up to the developer not to created more Reducer Provider. Worth mentioning that no-named and named Reducer Providers can be combined.

```jsx
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

When accessing the provider, the `name` is not required:

```jsx
  export default function SomeComponent1() {
    const [ state, dispatch ] = useReducer()
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Go up (from {state})!
      </button>
    )
  }
```

or

```jsx
  export default function SomeComponent2() {
    const dispatch = useReducerDispatcher()
    return (
      <button onClick={() => dispatch('ACTION2')}>
        Go down!
      </button>
    )
  }
```

or

```jsx
  export default function SomeComponentN() {
    const currentState = useReducerState()
    return (
      <div>
        Current:{currentState}
      </div>
    )
  }
```

> An asynchronous example can be checked on line at [gmullerb-react-reducer-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-oosyt?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-oosyt?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An example of use can be looked at [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Nesting

`SyncReducerProvider` and/or `AsyncReducerProvider` can be nested in layers, in order to have several nested Reducer/State.

```jsx
<SyncReducerProvider
  name='someNamedReducer1'
  reducer={reduce1}
  initialState={initialState1}
>
  {someChildren}
  <SyncReducerProvider
    name='someNamedReducerN'
    reducer={reduceN}
    initialState={initialStateN}
  >
    {moreChildren}
  </SyncReducerProvider>
</SyncReducerProvider>
```

* `someChildren` can access the State and the Dispatcher of the `'someNamedReducer1'`.

![`Single Reducer Provider`](single-reducer-provider.svg "Single Reducer Provider")

* `moreChildren` can access the State and the Dispatcher of the `'someNamedReducer1'` plus the State and the Dispatcher of the `'someNamedReducerN'`.

![Nested Reducer Providers](nested-named-reducer.svg "Nested Reducer Providers")

e.g.:

```jsx
<SyncReducerProvider
  name='someNamedReducer1'
  reducer={reduce1}
  initialState={initialState1}
>
  <SomeComponentA />
  <SyncReducerProvider
    name='someNamedReducerN'
    reducer={reduceN}
    initialState={initialStateN}
  >
    <SomeComponentB />
  </SyncReducerProvider>
</SyncReducerProvider>
```

```jsx
export default function SomeComponentA() {
  const [ state, dispatch ] = useReducer('someNamedReducer1')
  return (
    <button onClick={() => dispatch('ACTIONA')}>
      Go up (from {state})!
    </button>
  )
}
```

```jsx
export default function SomeComponentB() {
  const [ outerState, outerDispatch ] = useReducer('someNamedReducer1')
  const [ innerState, innerDispatch ] = useReducer('someNamedReducerN')
  return (
    <div>
      <button onClick={() => outerDispatch('ACTIONA')}>
        Outer Go up (from {outerState})!
      </button>
      <button onClick={() => innerDispatch('ACTIONB')}>
        Inner Go up (from {innerState})!
      </button>
    </div>
  )
}
```

> Naming allows to identified each reducer provider.  
> Although nesting can be rejected due to violation of single source of truth, In React is good to keep changes near to related components, i.e. a `SyncReducerProvider` or `AsyncReducerProvider` near to related components is better, why? because having a 1 Single Root `SyncReducerProvider` or `AsyncReducerProvider` will trigger changes to "all" components, even not related ones.  
> An example of use can be looked at [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  
__________________

## Prerequisites

* [React Hooks](https://reactjs.org/docs/hooks-overview.html) => [`"react": "^16.8.0"`](https://www.npmjs.com/package/react).

__________________

## More Documentation

* [Typings](typings.md).
* [With Injection](with-injection.md).
  * [with Flow typings](with-injection-and-flow-typings.md).
  * [with Typescript typings](with-injection-and-ts-typings.md).
* [With Actions Creators](with-actions-creators.md).
  * [with Flow typings](with-actions-creators-and-flow-typings.md).
  * [with Typescript typings](with-actions-creators-and-ts-typings.md).
* [Testing](testing.md).
* [Migration from `react-named-reducer` to `react-reducer-provider`](migration.md).
* [Extending/Developing](developing.md).

## Main documentation

[Back](../README.md)
