# Combining/Blending - Tagged Reducers/Mappers

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

### `useTaggedReducer`/`useTaggedMapper`

`useTaggedReducer(tag, id)`  
`useTaggedMapper(tag, id)`

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

`useTaggedAny(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a tuple containing a Map of `states` as first element, and a Map of `dispatchers` as second element.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedAny } from 'react-reducer-provider'
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
import { useTaggedAny } from 'react-reducer-provider'
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

`useTaggedReducerDispatcher(tag, id)`  
`useMapperReducerDispatcher(tag, id)`

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

`useMapperAnyDispatcher(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a Map of `dispatchers`.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedAnyDispatcher } from 'react-reducer-provider'
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
import { useTaggedAnyDispatcher } from 'react-reducer-provider'
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

`useTaggedReducerState(tag, id)`  
`useTaggedMapperState(tag, id)`

*parameters*:

* `tag: string | number | symbol`: that identifies an actions/reducer/state combination.
* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

> :exclamation: No Error checking is done behind the scene for Tag, so "keep track" of tags (to avoid getting a `undefined` error).

*returns*:

* the `state` of the respective Reducer/Mapper Provider.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedReducerState } from 'react-reducer-provider'
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
import { useTaggedReducerState } from 'react-reducer-provider'
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

`useTaggedAnyState(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier of the `*TaggedProvider` being accessed.

*returns*:

* a Map of `states`.

Accessing Specific Tagged Reducer/Mapper:

```jsx
import { useTaggedAnyState } from 'react-reducer-provider'
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
import { useTaggedAnyState } from 'react-reducer-provider'
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

* [`AsyncTaggedReducerProvider` | `SyncTaggedReducerProvider` | `AsyncTaggedMapperProvider` | `SyncTaggedMapperProvider`](blending-definition.md).
* [`injectTaggedAny` | `injectTaggedAnyState` | `injectTaggedAnyDispatcher` | `injectTaggedReducer` | `injectTaggedReducerState` | `injectTaggedReducerDispatcher` | `injectTaggedMapper` | `injectMapperReducerState` | `injectMapperdReducerDispatcher`](blending-consumption-hoc.md).
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
