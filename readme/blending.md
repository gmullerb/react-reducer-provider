# Combining/Blending Reducers | Combining/Blending Mappers

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

## Consumption

Reducer or Mapper will never be accessible directly from `children` elements, they will be **able to access the State and/or Dispatcher**.

There are different ways of doing this:

* **`useTaggedReducer`**, which give access both State and [`Dispatcher`](../src/react-reducer-provider.d.ts).
* **`useTaggedReducerDispatcher`**, which give access only the [`Dispatcher`](../src/react-reducer-provider.d.ts).
* **`useTaggedReducerState`**, which give access only the State.

or

* **`useTaggedMapper`**, which give access both State and [`Dispatcher`](../src/react-reducer-provider.d.ts).
* **`useTaggedMapperDispatcher`**, which give access only the [`Dispatcher`](../src/react-reducer-provider.d.ts).
* **`useTaggedMapperState`**, which give access only the State.

or

* useTaggedAny, which give access any tagged State and [`Dispatcher`](../src/react-reducer-provider.d.ts).
* useTaggedAnyState, which give access any tagged [`Dispatcher`](../src/react-reducer-provider.d.ts).
* useTaggedAnyDispatcher, which give access only any tagged State.

![Consumption](use-provider.svg "Consumption")

> When using any `useTagged*`,  Be Aware that they use [`React.useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) and quote: 'A component calling useContext will always re-render when the context value changes', in this case when `state` changes, therefore when using `useReducerDispatcher`/`useMapperDispatcher` although it not depends "directly" on `state` the component will be re-render when `state` changes. Final words, use `*TaggedProvider` everywhere is required and use `useTagged*` wisely (small scopes, as close to where is required with small amount of children). If children re-render is too expensive then `React.useMemo`:

```jsx
const FunComponent1 = () => {
  const dispatch = useReducerDispatcher('testNamedReducer10')
  return React.useMemo(() => (
    <RelatedChildComponent
      onClick={dispatch}
    />
  ), [dispatch])
}
```

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
> Examples can be seen at: [`SyncReducerProvider.test.jsx`](../tests/js/SyncReducerProvider.test.jsx) and [`AsyncReducerProviderWithAsync.test.jsx`](../tests/js/AsyncReducerProviderWithAsync.test.jsx).
> Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

### `useTaggedReducer`/`useTaggedMapper`

*parameters*:

* `tag: string | number | symbol`: that identifies an actions/reducer/state combination.
* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

> :exclamation: No Error checking is done behind the scene for Tag, so "keep track" of tags (to avoid getting a `undefined` error).

*returns*:

* a tuple containing the `state` as first element, and the `dispatcher` as second element.

> For purpose of avoiding re-renders and/or improving reference for `useEffect/useMemo/useCallback`, keep in mind that the tuple that is returned may change but elements will only change when state changes, i.e. always use the elements of the tuple as reference, never the tuple perse. This is not an "issue" when using the elements of the tuple as reference or when using `use*Dispatcher` or `use*State`.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const [ state, dispatch ] = useTaggedReducer('Tag1', 'someNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {state})!
    </button>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useTaggedReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const [ state, dispatch ] = useTaggedReducer('Tag1')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {state})!
    </button>
  )
}
```

### `useTaggedAny`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a tuple containing a Map of `states` as first element, and a Map of `dispatchers` as second element.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const [ states, dispatchers ] = useTaggedAny('someNamedReducer')
  const dispatch = dispatchers.get('Tag1')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {states.get('Tag1')})!
    </button>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useTaggedReducer } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent1() {
  const [ states, dispatchers ] = useTaggedAny()
  const dispatch = dispatchers.get('Tag1')
  return (
    <button onClick={() => dispatch('ACTION1')}>
      Go up (from {states.get('Tag1')})!
    </button>
  )
}
```

### `useTaggedReducerDispatcher`/`useMapperReducerDispatcher`

*parameters*:

* `tag: string | number | symbol`: that identifies an actions/reducer/state combination.
* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

> :exclamation: No Error checking is done behind the scene for Tag, so "keep track" of tags (to avoid getting a `undefined` error).

*returns*:

* the `dispatcher` of the respective Reducer/Mapper Provider.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedReducerDispatcher } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent2() {
  const dispatch = useTaggedReducerDispatcher('Tag1', 'someNamedReducer')
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useTaggedReducerDispatcher } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent2() {
  const dispatch = useTaggedReducerDispatcher('Tag1')
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

### `useTaggedAnyDispatcher`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a Map of `dispatchers`.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedAnyState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent2() {
  const dispatchers = useTaggedAnyDispatcher('someNamedReducer')
  const dispatch = dispatchers.get('Tag1')
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useTaggedAnyState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponent2() {
  const dispatchers = useTaggedAnyDispatcher()
  const dispatch = dispatchers.get('Tag1')
  return (
    <button onClick={() => dispatch('ACTION2')}>
      Go down!
    </button>
  )
}
```

### `useTaggedReducerState`/`useTaggedMapperState`

*parameters*:

* `tag: string | number | symbol`: that identifies an actions/reducer/state combination.
* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

> :exclamation: No Error checking is done behind the scene for Tag, so "keep track" of tags (to avoid getting a `undefined` error).

*returns*:

* the `state` of the respective Reducer/Mapper Provider.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useReducerState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponentN() {
  const currentState = useTaggedReducerState('Tag1', 'someNamedReducer')
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useReducerState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponentN() {
  const currentState = useTaggedReducerState('Tag1')
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

### `useTaggedAnyState`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a Map of `states`.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useReducerState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponentN() {
  const states = useTaggedAnyState('someTaggedReducerS1')
  const currentState = states.get('Tag1')
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

Accessing Singleton Tagged Reducer/Mapper:

```jsx
import { useReducerState } from 'react-reducer-provider'
import React from 'react'

export default function SomeComponentN() {
  const states = useTaggedAnyState()
  const currentState = states.get('Tag1')
  return (
    <div>
      Current:{currentState}
    </div>
  )
}
```

__________________

## More Documentation

* [`AsyncReducerProvider`,`SyncReducerProvider`,`AsyncMapperProvider`&`SyncMapperProvider`](readme/reference.md#definition).
* [`useReducer`,`useReducerState`,`useReducerDispatcher`,`useMapper`,`useMapperState`&`useMapperDispatcher`](readme/reference.md#consumption)
* [Nesting Provider](readme/nesting.md).
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
