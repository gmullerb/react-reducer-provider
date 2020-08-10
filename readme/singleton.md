# Singleton Reducer/Mapper Provider

If no `id` (name, number or symbol) is provided a "unique"[1] Reducer will be created.

> [1] This is a convention, i.e. is up to the developer not to created more Reducer Provider. Worth mentioning that unidentified and identified Reducer Providers can be combined.

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

When accessing the provider, the `id` is not required:

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

> An asynchronous example can be checked on line at [gmullerb-react-reducer-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-m1fph?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-m1fph?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> > Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

__________________

## More Documentation

* [`AsyncReducerProvider` | `SyncReducerProvider` | `AsyncMapperProvider` | `SyncMapperProvider`](reference-defintion.md).
* [`useReducer` | `useReducerState` | `useReducerDispatcher` | `useMapper` | `useMapperState` | `useMapperDispatcher`](reference-consumption-hooks.md).
* [`injectReducer` | `injectReducerState` | `injectReducerDispatcher` | `injectMapper` | `injectMapperState` | `injectMapperDispatcher`](reference-consumption-hoc.md).
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
