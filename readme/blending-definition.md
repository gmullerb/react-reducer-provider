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

[`AsyncTaggedReducerProvider`](../src/AsyncTaggedReducerProvider.js), [`SyncTaggedReducerProvider`](../src/SyncTaggedReducerProvider.js), [`AsyncTaggedMapperProvider`](../src/AsyncTaggedMapperProvider.js) & [`SyncMapperProvider`](../src/SyncTaggedMapperProvider.js) are React "Special" Elements defined by 2 properties:

*properties*:

1 . `id ?: string | number | symbol`: constitutes the identifier of the `SyncTaggedReducerProvider`, `AsyncTaggedReducerProvider`, `SyncTaggedMapperProvider` or `AsyncTaggedMapperProvider`, which is useful when using more than 1 provider.

* [**Use `id` the "right" way**](keep-track-id.md).

[`AsyncTaggedReducerProvider`](../src/AsyncTaggedReducerProvider.js) & [`SyncTaggedReducerProvider`](../src/SyncTaggedReducerProvider.js) have the following property:

2 . `reducers`: an array of tuples, each tuple puts together an actions/reducer/state combination: `[tag, reducer, initialState]`.

* `tag`: an `string | number | symbol` that identifies an actions/reducer/state combination.
* `reducer` a asynchronous/synchronous function that will receive the current state and an action to produce a new state [1].

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

* `initialState`: inception state for the component.

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
    ['Tag1', asyncReducer1, initialState1],
    ['TagN', asyncReducerN, initialStateN]
  ]}
>
  {children}
</AsyncTaggedReducerProvider>
```

[`AsyncTaggedMapperProvider`](../src/AsyncTaggedMapperProvider.js) & [`SyncTaggedMapperProvider`](../src/SyncTaggedMapperProvider.js) have the following property:

2 . `mappers`: an array of tuples, each tuple puts together an actions/mapper/state combination: `[tag, mapper, initialState]`.

* `tag`: an `string | number | symbol` that identifies an actions/reducer/state combination.
* `mapper`: a asynchronous/synchronous function that will receive an action to produce a new state [1].

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
    ['TagN', syncMapperN, initialStateN]
  ]}
>
  {children}
</SyncTaggedMapperProvider>
```

> [1] Internally are implemented only using [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate) and [`useRef` hook](https://reactjs.org/docs/hooks-reference.html#useref).

### Tagged Dispatcher

[`Dispatcher`](../src/react-reducer-provider.d.ts) returns the new State or a Promise of the new State:

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

## Reducer/Mapper Consumption

### [Function Components - Hooks](blending-consumption-hooks.md)

### [Class Components - HOC](blending-consumption-hoc.md)

__________________

## More Documentation

* [`AsyncReducerProvider`,`SyncReducerProvider`,`AsyncMapperProvider`&`SyncMapperProvider`](reference.md#definition).
* [`useReducer`,`useReducerState`,`useReducerDispatcher`,`useMapper`,`useMapperState`&`useMapperDispatcher`](reference.md#consumption)
* [`injectReducer` | `injectReducerState` | `injectReducerDispatcher` | `injectMapper` | `injectMapperState` | `injectMapperDispatcher`](reference-consumption-hoc.md).
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
* [Examples from tests](../tests/js).
* [Typings' examples from tests](../tests/typings).
* [Extending/Developing](developing.md).

## Main documentation

[Back](../README.md)
