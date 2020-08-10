# `AsyncReducerProvider` | `SyncReducerProvider` | `AsyncMapperProvider` | `SyncMapperProvider`

## Definition

`SyncReducerProvider` & `AsyncReducerProvider` are React Components which defines a [React Context](https://reactjs.org/docs/context.html) that allows to Manage State using [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Reducer: function that changes the State based on an Action and the previous State.
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](flux.svg "Flux architecture")

Each `SyncReducerProvider` or `AsyncReducerProvider` is equivalent to a Flux stream:

![`SyncReducerProvider` & `AsyncReducerProvider`](react-reducer-provider.svg "SyncReducerProvider & AsyncReducerProvider")

Similarly, `SyncMapperProvider` and `AsyncMapperProvider` have the following stream:

![`SyncMapperProvider` & `AsyncMapperProvider`](react-mapper-provider.svg "SyncMapperProvider & AsyncMapperProvider")

[`AsyncReducerProvider`](../src/AsyncReducerProvider.js), [`SyncReducerProvider`](../src/SyncReducerProvider.js), [`AsyncMapperProvider`](../src/AsyncMapperProvider.js) & [`SyncMapperProvider`](../src/SyncMapperProvider.js) are React "Special" Elements defined by 3 properties:

*properties*:

1 . `initialState`: inception state for the component.  
2 . `id ?: string | number | symbol`: constitutes the identifier of the `SyncReducerProvider`, `AsyncReducerProvider`, `SyncMapperProvider` or `AsyncMapperProvider`, which is useful when using more than 1 provider.

* [**Use `id` the "right" way**](keep-track-id.md).

[`AsyncReducerProvider`](../src/AsyncReducerProvider.js) & [`SyncReducerProvider`](../src/SyncReducerProvider.js) have the following property:

3 . `reducer`: a asynchronous/synchronous function that will receive the current state and an action to produce a new state [1].

![Reducer](reducerNoArgs.svg "Reducer")

`function syncReduce<STATE, ACTION>(prevState: STATE, action: ACTION): STATE`

```jsx
<SyncReducerProvider
  id='someNamedReducer'
  reducer={syncReduce}
  initialState={initialState}
>
  {children}
</SyncReducerProvider>
```

  or

`function asyncReduce<STATE, ACTION>(prevState: STATE, action: ACTION): Promise<STATE>`

```jsx
<AsyncReducerProvider
  id={12345}
  reducer={asyncReduce}
  initialState={initialState}
>
  {children}
</AsyncReducerProvider>
```

[`AsyncMapperProvider`](../src/AsyncMapperProvider.js) & [`SyncMapperProvider`](../src/SyncMapperProvider.js) have the following property:

3 . `mapper`: a asynchronous/synchronous function that will receive an action to produce a new state [1].

![Mapper](mapperNoArgs.svg "Mapper")

`function asyncMap<STATE, ACTION>(action: ACTION): Promise<STATE>`

```jsx
<AsyncMapperProvider
  id={12345}
  mapper={asyncMap}
  initialState={initialState}
>
  {children}
</AsyncMapperProvider>
```

or

`function syncMap<STATE, ACTION>(action: ACTION): STATE`

```jsx
<SyncMapperProvider
  id='someNamedMapper'
  mapper={syncMap}
  initialState={initialState}
>
  {children}
</SyncMapperProvider>
```

> [1] Internally are implemented only using [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate) and [`useRef` hook](https://reactjs.org/docs/hooks-reference.html#useref).

## Synchronous Reducer/Mapper => `SyncReducerProvider`/`SyncMapperProvider`

### `SyncReducerProvider`

```jsx
<SyncReducerProvider
  id='someNamedReducer'
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

### `SyncMapperProvider`

```jsx
<SyncMapperProvider
  id='someNamedMapper'
  mapper={syncMap}
  initialState={initialState}
>
  {children}
</SyncMapperProvider>
```

* `mapper` will be a synchronous function that will receive an action to produce a new state.

    `sync function syncMapper<STATE, ACTION>(action: ACTION):STATE`

    e.g.:

```js
  async function map(action) {
    switch (action) {
      case 'ACTION1':
        return someSyncProcess1()
      case 'ACTION2':
        return someValue
      default:
        return prevState
    }
  }

```

### `Dispatcher`

when accessing the Mapper/Reducer Provider, the `dispatcher` will be also a synchronous function:


> An `SyncReducerProvider` example can be checked on line at [gmullerb-react-reducer-provider codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-qf356?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-qf356?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An `SyncMapperProvider` example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-c7hyq?module=%2Fsrc%2FSomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-c7hyq?module=%2Fsrc%2FSomeMapperProvider.jsx)  

## Asynchronous Reducer/Mapper => `AsyncReducerProvider`/`AsyncMapperProvider`

### `AsyncReducerProvider`

```jsx
<AsyncReducerProvider
  id='someNamedReducer'
  reducer={asyncReduce}
  initialState={initialState}
>
  {children}
</AsyncReducerProvider>
```

* `reducer` will be an **asynchronous** function that will receive the current state and an action to produce a `Promise` of the new state.

    `async function asyncReducer<STATE, ACTION>(prevState: STATE, action: ACTION): Promise<STATE>`

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

### `AsyncMapperProvider`

```jsx
<AsyncMapperProvider
  id='someNamedMapper'
  mapper={asyncMap}
  initialState={initialState}
>
  {children}
</AsyncMapperProvider>
```

* `mapper` will be an **asynchronous** function that will receive an action to produce a `Promise` of the new state.

    `async function asyncMapper<STATE, ACTION>(action: ACTION): Promise<STATE>`

    e.g.:

```js
  async function map(action) {
    switch (action) {
      case 'ACTION1':
        return await someAsyncProcess1()
      case 'ACTION2':
        return someAsyncProcess2()
      default:
        return prevState
    }
  }
```

### Dispatcher

* when accessing the Reducer/Mapper Provider, the `dispatcher` will be also a **asynchronous** function:

    `async function dispatch<ACTION>(action: ACTION): Promise<void>`

    e.g.:

```jsx
  dispatch('ACTION2').then(someProcess())
```

> When the `dispatch` is resolved is an indication that the state was change, but not of any required re-rendering being done.  
> An `AsyncReducerProvider` can be checked on line at [gmullerb-react-reducer-provider codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-qf356?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-qf356?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An `AsyncMapperProvider` example can be checked on line at [gmullerb-react-mapper-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-i9iyk?module=%2Fsrc%2FSomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-i9iyk?module=%2Fsrc%2FSomeMapperProvider.jsx)  
> Although `AsyncReducerProvider` can be used for synchronous reducer/dispatcher (check [AsyncReducerProviderWithSync.test.jsx](tests/js/AsyncReducerProviderWithSync.test.jsx)), It is not is purpose and implementation is suitable for asynchronous processes, long story short, for synchronous processes, use `SyncReducerProvider`.  
> Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Dispatcher

[`Dispatcher`](../src/react-reducer-provider.d.ts) returns the new State or a Promise of the new State:

![Dispatcher](dispatcherNoArgs.svg "Dispatcher")

Synchronous dispatcher:

```js
const newState = dispatch(action)
```

Asynchronous dispatcher:

```js
dispatch(action).then(newState => console.info(newState))
```

If new State is not required, then return value can be ignored:

```js
dispatch(action)
```

> Returned value is useful when using `useReducerDispatcher`, `useMapperDispatcher`, `injectReducerDispatcher`, `injectMapperDispatcher`.
> By default, when using typings return value is ignored, i.e is `void` or `Promise<void>`.
> Examples can be seen at: [`SyncReducerProvider.test.jsx`](../tests/js/SyncReducerProvider.test.jsx) and [`AsyncReducerProviderWithAsync.test.jsx`](../tests/js/AsyncReducerProviderWithAsync.test.jsx).
> Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Extra parameters

Dispatcher can send **any number of additional arguments**:

![Dispatcher](dispatcher.svg "Dispatcher")

Synchronous:

```js
  dispatch('ACTION2', arg1, arg2, argN)
```

Asynchronous:

```js
  dispatch('ACTION2', arg1, arg2, argN).then(someProcess())
```

Then, respectively:

* Reducer can have **any number of additional parameters**, and use them as pleased:

![Reducer](reducer.svg "Reducer")

```js
  async function reduce(prevState, action, param1, param2, paramN) {
    switch (action) {
      case 'ACTION1':
        return await someAsyncProcess1(prevState, param1, param2, paramN)
      case 'ACTION2':
        return someAsyncProcess2(prevState, param1, param2, paramN)
      default:
        return prevState
    }
  }
```

* Mapper can have **any number of additional parameters**, and use them as pleased:

![Mapper](mapper.svg "Mapper")

```js
  async function map(action, param1, param2, paramN) {
    switch (action) {
      case 'ACTION1':
        return await someAsyncProcess1(param1, param2, paramN)
      case 'ACTION2':
        return someAsyncProcess2(param1, param2, paramN)
      default:
        return prevState
    }
  }
```

> An example can be checked on line at [gmullerb-react-reducer-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-gpst9?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-gpst9?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> This makes "obsolete" the [Action](typings.md#helpertypes), but at the end can be matter of preference.

## Reducer/Mapper Consumption

### [Function Components - Hooks](reference-consumption-hooks.md)

### [Class Components - HOC](reference-consumption-hoc.md)

__________________

## More Documentation

* [`useReducer` | `useReducerState` | `useReducerDispatcher` | `useMapper` | `useMapperState` | `useMapperDispatcher`](reference-consumption-hooks.md).
* [`injectReducer` | `injectReducerState` | `injectReducerDispatcher` | `injectMapper` | `injectMapperState` | `injectMapperDispatcher`](reference-consumption-hoc.md).
* [Singleton](singleton.md).
* [Nesting](nesting.md).
* Combining/Blending - Tagged Reducers/Mappers.
  * [`AsyncTaggedReducerProvider` | `SyncTaggedReducerProvider` | `AsyncTaggedMapperProvider` | `SyncTaggedMapperProvider`](blending-definition.md).
  * [`useTaggedAny` | `useTaggedAnyState` | `useTaggedAnyDispatcher` | `useTaggedReducer` | `useTaggedReducerState` | `useTaggedReducerDispatcher` | `useTaggedMapper` | `useTaggedMapperState` | `useTaggedMapperDispatcher`](blending-consumption-hooks.md).
  * [`injectTaggedAny` | `injectTaggedAnyState` | `injectTaggedAnyDispatcher` | `injectTaggedReducer` | `injectTaggedReducerState` | `injectTaggedReducerDispatcher` | `injectTaggedMapper` | `injectMapperReducerState` | `injectMapperdReducerDispatcher`](blending-consumption-hoc.md).
* [Typings](typings.md).
* [With Injection](with-injection.md).
  * [with Flow typings](with-injection-and-flow-typings.md).
  * [with Typescript typings](with-injection-and-ts-typings.md).
* [With Actions Creators](with-actions-creators.md).
  * [with Flow typings](with-actions-creators-and-flow-typings.md).
  * [with Typescript typings](with-actions-creators-and-ts-typings.md).
* [Testing](testing.md).
* [Examples from tests](../tests/js).
* [Online examples](readme/online.md).
* [Typings' examples from tests](../tests/typings).
* [Extending/Developing](developing.md).

## Main documentation

[Back](../README.md)
