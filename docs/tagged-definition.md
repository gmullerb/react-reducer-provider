# Combining/Blending - Tagged Reducers/Mappers

## Blending

`SyncTaggedReducerProvider` & `AsyncTaggedReducerProvider` are React Components which defines a [React Context](https://reactjs.org/docs/context.html) that allows to Manage State using [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Reducer: function that changes the State based on an Action and the previous State.
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](flux.svg "Flux architecture")

Each `SyncTaggedReducerProvider` or `AsyncTaggedReducerProvider` allows for a set of independent actions/reducer/state accessible from 1 dispatcher:

![`SyncTaggedReducerProvider` & `AsyncTaggedReducerProvider`](tagged-reducer-provider.svg "SyncTaggedReducerProvider & AsyncTaggedReducerProvider")

Similarly, `SyncTaggedMapperProvider` and `AsyncTaggedMapperProvider` have the following stream:  

![`SyncTaggedMapperProvider` & `AsyncTaggedMapperProvider`](tagged-mapper-provider.svg "SyncTaggedMapperProvider & AsyncTaggedMapperProvider")

`AsyncTaggedReducerProvider`, `SyncTaggedReducerProvider`, `AsyncTaggedMapperProvider` & `SyncMapperProvider` are React "Special" Elements defined by 2 properties:

*properties*:

1 . `id ?: string | number | symbol`: constitutes the identifier of the `SyncTaggedReducerProvider`, `AsyncTaggedReducerProvider`, `SyncTaggedMapperProvider` or `AsyncTaggedMapperProvider`, which is useful when using more than 1 `react-reducer-provider` provider.

* [**Use `id` the "right" way**](keep-track-id.md).

`AsyncTaggedReducerProvider` & `SyncTaggedReducerProvider` have the following property:

2 . `reducers`: an array of tuples, each tuple puts together an actions/reducer/state combination: `[tag, reducer, initialState]`.

* `tag`: an `string | number | symbol` that identifies an actions/reducer/state combination.
* `reducer` an asynchronous or synchronous function that will receive the current state and an action to produce a new state [1].

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

* `initialState`: inception state for the component or a function to create initial state.

Provider definition:

```jsx
<SyncTaggedReducerProvider
  id='someNamedReducer'
  reducers={[
    ['Tag1', syncReducer1, initialState1],
    ['TagN', syncReducerN, initialStateN]
  ]}
>
  {children}
</SyncTaggedReducerProvider>
```

  or

```jsx
<AsyncTaggedReducerProvider
  reducers={[
    ['Tag1', asyncReducer1, () => initialState1],
    ['TagN', asyncReducerN, initialStateN]
  ]}
>
  {children}
</AsyncTaggedReducerProvider>
```

`AsyncTaggedMapperProvider` & `SyncTaggedMapperProvider` have the following property:

2 . `mappers`: an array of tuples, each tuple puts together an actions/mapper/state combination: `[tag, mapper, initialState]`.

* `tag`: an `string | number | symbol` that identifies an actions/reducer/state combination.
* `mapper`: an asynchronous or synchronous function that will receive an action to produce a new state [1].

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

* `initialState`: inception state for the component.

Provider definition:

```jsx
<AsyncTaggedMapperProvider
  mappers={[
    ['Tag1', asyncMapper1, initialState1],
    ['TagN', asyncMapperN, initialStateN]
  ]}
>
  {children}
</AsyncTaggedMapperProvider>
```

or

```jsx
<SyncTaggedMapperProvider
  id='someNamedMapper'
  mappers={[
    ['Tag1', syncMapper1, initialState1],
    ['TagN', syncMapperN, () => initialStateN]
  ]}
>
  {children}
</SyncTaggedMapperProvider>
```

> [1] No check is made for asynchronous reducer/mapper, i.e. use `AsyncReducerProvider`/`AsyncMapperProvider` for asynchronous reducer/mapper to avoid *setting state to a `Promise`* (unless that is intentional).

### Properties change

Any change to the **initial Properties** for **mounted** State Providers will be ignored for rendering, in order to improve performance, but not for processing, i.e. props changes will not cause re-rendering, although the new reducers/mappers will be used for calculating new states.

* `id` change is totally ignored.
* new `reducers`/`mappers` will be used.
  * `tag` change will be totally ignored.
  * new initial state for each tag will be ignored.
  * new `reducer`/`mapper` will be used.
    * If `reducer`/`mapper` are set to `null` or `undefined`, then it will disabled the processor and return the last state achieved for every following dispatching until a new `reducer`/`mapper` is set again.

> If unmounted, olds state will be lost when mounted again and a new fresh state will be used.

### Tagged Dispatcher

[`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) is the proxy between the Remote component and the Tagged Provider, and returns the new State or a Promise of the new State:

![Dispatcher](dispatcher.svg "Dispatcher")

Synchronous dispatcher:

```js
const newState = dispatch('Tag1', action, arg1, argN)
```

Asynchronous dispatcher:

```js
dispatch('Tag1', action, arg1, argN).then(newState => console.info(newState))
```

If new State is not required, then return value can be ignored:

```js
dispatch('Tag1', action, arg1, argN)
```

> By default, when using typings return value is ignored, i.e is `void` or `Promise<void>`.

### Exceptions

If reducer or mapper may throw an exception then the code calling the dispatcher should handle this situations:

synchronous reducer/mapper

```js
  try {
    dispatch('Tag1', 'ACTION1')
    ..
  }
  catch(error)
  {
    ..
  }
```

asynchronous reducer/mapper

```js
  dispatch('Tag1', 'ACTION1')
    .then(..)
    .catch(error => ..)
  }
```

> * Remember you design the reducer/mapper, so you must be aware if exceptions are possible.
> * In case of exceptions is better to handle them inside reducer/mapper.

## Reducer/Mapper Consumption

### [Function Components - Hooks](tagged-consumption-hooks.md)

### [Class Components - HOC](tagged-consumption-hoc.md)

__________________

## More Documentation

* [`useTaggedAny` · `useTaggedReducer` · `useTaggedReducerState` · `useTaggedReducerDispatcher` · `useTaggedMapper` · `useTaggedMapperState` · `useTaggedMapperDispatcher`](tagged-consumption-hooks.md).
* [`injectTaggedAny` · `injectTaggedReducer` · `injectTaggedReducerState` · `injectTaggedReducerDispatcher` · `injectTaggedMapper` · `injectTaggedMapperState` · `injectTaggedMapperDispatcher`](tagged-consumption-hoc.md).
* [`AsyncReducerProvider`,`SyncReducerProvider`,`AsyncMapperProvider`&`SyncMapperProvider`](reference.md#definition).
* [`useReducer`,`useReducerState`,`useReducerDispatcher`,`useMapper`,`useMapperState`&`useMapperDispatcher`](reference.md#consumption)
* [`injectReducer` · `injectReducerState` · `injectReducerDispatcher` · `injectMapper` · `injectMapperState` · `injectMapperDispatcher`](reference-consumption-hoc.md).
* [Singleton](singleton.md).
* [Nesting Providers](nesting.md).
* [Typings](typings.md).
* [With Injection](with-injection.md).
  * [with Flow typings](with-injection-and-flow-typings.md).
  * [with Typescript typings](with-injection-and-ts-typings.md).
* [With Actions Creators](with-actions-creators.md).
  * [with Flow typings](with-actions-creators-and-flow-typings.md).
  * [with Typescript typings](with-actions-creators-and-ts-typings.md).
* [Testing](testing.md).
* [Examples from tests](https://github.com/gmullerb/react-reducer-provider/blob/master/tests/js).
* [Typings' examples from tests](https://github.com/gmullerb/react-reducer-provider/blob/master/tests/typings).
* [Extending/Developing](developing.md).

## Main documentation

[Back to homepage](../README.md)
