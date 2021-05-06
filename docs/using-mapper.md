# Mappers

`SyncMapperProvider` & `AsyncMapperProvider` are React Components which defines a [React Context](https://reactjs.org/docs/context.html) that allows to Manage State using [Flux](http://facebook.github.io/flux), an application architecture that handles application states in a unidirectional way.

* Flux is composed basically with:
  * Stores: keeps states of the app (or components).
    * Mapper: function that changes the State based on an Action (not caring about the previous State).
  * Actions: triggers changes in Store.
  * Dispatcher: sends Actions to the Store.
    * Mainly the bridge between the Store and Components.

![Flux architecture](fluxMapper.svg "Flux architecture")

Each `SyncMapperProvider` or `AsyncMapperProvider` is equivalent to a Flux stream:

![`SyncMapperProvider` & `AsyncMapperProvider`](react-mapper-provider.svg "SyncMapperProvider & AsyncMapperProvider")

## `SyncMapperProvider`

![Mapper](syncMapperSingleArg.svg "Mapper")

`SyncMapperProvider` is a React "Special" Elements defined by 3 properties:

*properties*:

* `initialState`: inception state for the component or a function to create initial state.  
* `id ?: string | number | symbol`: constitutes the identifier of the `SyncMapperProvider`, which is useful when using more than 1 `react-reducer-provider` provider.
  * [**Use `id` the "right" way**](keep-track-id.md).
* `mapper`: a synchronous function that will receive an action to produce a new state.

Identified `SyncMapperProvider`:

```jsx
<SyncMapperProvider
  id='someMapper'
  mapper={syncMap}
  initialState={initialState}
>
  {children}
</SyncMapperProvider>
```

or Singleton `SyncMapperProvider`:

```jsx
<SyncMapperProvider
  id='someMapper'
  mapper={syncMap}
  initialState={initialState}
>
  {children}
</SyncMapperProvider>
```

`function syncMap<STATE, [ACTION]>(action: ACTION): STATE`

e.g.:

```js
async function syncMap(action) {
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

## `AsyncMapperProvider`

![Mapper](asyncMapperSingleArg.svg "Mapper")

`AsyncMapperProvider` is a React "Special" Elements defined by 3 properties:

*properties*:

* `initialState`: inception state for the component or a function to create initial state.  
* `id ?: string | number | symbol`: constitutes the identifier of the `AsyncMapperProvider`, which is useful when using more than 1 `react-reducer-provider` provider.
  * [**Use `id` the "right" way**](keep-track-id.md).
* `mapper`: an **asynchronous** function that will receive an action to produce a `Promise` of the new state[1].

Identified `AsyncMapperProvider`

```jsx
<AsyncMapperProvider
  id='someMapper'
  mapper={asyncMap}
  initialState={initialState}
>
  {children}
</AsyncMapperProvider>
```

or Singleton `AsyncMapperProvider`

```jsx
<AsyncMapperProvider
  mapper={asyncMap}
  initialState={initialState}
>
  {children}
</AsyncMapperProvider>
```

`async function asyncMap<STATE, [ACTION]>(action: ACTION): Promise<STATE>`

e.g.:

```js
async function asyncMap(action) {
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

> [1] No check is made for asynchronous reducer/mapper, i.e. use `AsyncMapperProvider` for asynchronous mapper to avoid *setting state to a `Promise`* (unless that is intentional).

### Properties change

Any change to the **initial Properties** for **mounted** State Providers will be ignored for rendering, in order to improve performance, but not for processing, i.e. props changes will not cause re-rendering, although the new mappers will be used for calculating new states.

* `id` change is totally ignored.
* new `mapper` will be used.
  * If `mapper` are set to `null` or `undefined`, then it will disabled the processor and return the last state achieved for every following dispatching until a new `mapper` is set again.
* new `initialState` will be ignored.

> If unmounted, olds state will be lost when mounted again and a new fresh state will be used.

### A Function as State

To initialize the state as a function, `initialState` must be set with a function:

```jsx
    <SyncMapperProvider
      id='someNamedMapper'
      mapper={syncMap}
      initialState={() => (x, y) => x + y}
    >
      {children}
    </SyncMapperProvider>
```

> A example can be checked on line at [gmullerb-react-mapper-provider with a function as a state codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-qhtqw?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-qhtqw?file=/src/SomeMapperProvider.jsx)  

## Mapper Consumption

### `Dispatcher`

[`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) is the proxy between the Remote component and the Mapper, and returns the new State or a Promise of the new State:

![Dispatcher](dispatcherNoArgs.svg "Dispatcher")

Synchronous dispatcher:

```js
const newState = dispatch(action)
```

Asynchronous dispatcher:

```js
dispatch(action).then(newState => console.info(newState))
```

If the Mapper returned value is not required:

```js
dispatch(action)
```

Remember:

when accessing a synchronous Mapper Provider, the `dispatcher` will be also a synchronous function.

> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeMapperProvider.jsx)  
> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeMapperProvider.jsx)  
> Examples of use can be looked at [test files](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/js).  

when accessing an **asynchronous** Mapper Provider, the `dispatcher` will be also a **asynchronous** function:

`async function dispatch<ACTION>(action: ACTION): Promise<void>`

e.g.:

```jsx
  dispatch('ACTION2').then(someProcess())
```

> When the `dispatch` is resolved is an indication that the state was change, but not of any required re-rendering being done.  
> An `AsyncMapperProvider` example can be checked on line at [gmullerb-react-mapper-provider-async codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-forked-d2foz?file=/src/SomeMapperProvider.jsx):  
[![Edit gmullerb-react-mapper-provider-async](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-async-forked-d2foz?file=/src/SomeMapperProvider.jsx)  
> Examples of use can be looked at [test files](https://github.com/gmullerb/react-reducer-provider/blob/HEAD/tests/js).  

#### Exceptions

If mapper may throw an exception, then the code calling the dispatcher should handle this situations:

synchronous mapper

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

asynchronous mapper

```js
  dispatch('Tag1', 'ACTION1')
    .then(..)
    .catch(error => ..)
  }
```

> * Remember you design the mapper, so you must be aware if exceptions are possible.
> * **In case of exceptions is better to handle them inside mapper**.

#### Extra parameters

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

Then:

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

`mapper` can even receive no arguments, and be used as simple trigger:
![Mapper as Trigger](mapperAsTrigger.svg "Mapper as Trigger")

### Getting the Dispatcher

Dispatcher will be reachable through:

* Function Components - Hooks: **`useMapper`**, **`useMapperDispatcher`** and **`useMapperState`**.
* Class Components - HOC: **`injectMapper`**, **`injectMapperDispatcher`** and **`injectMapperState`**.

![Consumption](use-mapper.svg "Consumption")

#### `useMapper`

**`useMapper`** gives access to both, State and [`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) when using React Function Components.

`useMapper(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

a tuple containing:

* `[0]`: the `state`.
* `[1]`: the `dispatcher`.
* `[2]`: the provider id.
* `state`: the `state`.
* `dispatch`: the `dispatcher`.
* `provider`: the provider id.

when using a Singleton Provider:

```jsx
import { useMapper } from "react-reducer-provider";
import React from "react";

export default function SomeComponent1() {
  const [state, dispatch] = useMapper();
  return (
    <button onClick={() => dispatch("ACTION1")}>
      Set to 1 (from {state})!
    </button>
  );
}
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { useMapper } from "react-reducer-provider";
import React from "react";

export default function SomeComponent1() {
  const [state, dispatch] = useMapper("someNamedMapper");
  return (
    <button onClick={() => dispatch("ACTION1")}>
      Set to 1 (from {state})!
    </button>
  );
}
```

> Trying to reassign `state`, `dispatch`, `provider`, `[0]`, `[1]` or `[2]` will result in a`TypeError: Cannot assign to read only property '..' of object '[object Array]'` Exception.  
> Trying to add new fields will result in a `TypeError: can't define property "..": Array is not extensible` Exception.  
> For purpose of avoiding re-renders and/or improving performance **always use the elements of the tuple** as reference, never the tuple perse, keep in mind that the tuple that is returned may change but elements will only change when state changes. Also, can use `useEffect/useMemo/useCallback`. This is not an "issue" when using the elements of the tuple as reference or when using `use*Dispatcher` or `use*State`.  
> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponent1.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponent1.jsx)  

#### `useMapperDispatcher`

**`useMapperDispatcher`** gives access only to the [`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) when using React Function Components.

`useMapperDispatcher(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

* the `dispatcher` of the respective Mapper Provider.

when using a Singleton Provider:

```jsx
import { useMapperDispatcher } from "react-reducer-provider";
import React from "react";

export default function SomeComponent2() {
  const dispatch = useMapperDispatcher();
  return <button onClick={() => dispatch("ACTION2")}>Set to -1!</button>;
}
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { useMapperDispatcher } from "react-reducer-provider";
import React from "react";

export default function SomeComponent2() {
  const dispatch = useMapperDispatcher("someNamedMapper");
  return <button onClick={() => dispatch("ACTION2")}>Set to -1!</button>;
}
```

> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponent2.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponent2.jsx)  
> When using `useMapper`, `useMapperDispatcher` and/or `useReducerState`/`useMapperState`,  Be Aware that they use [`React.useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) and quote: 'A component calling useContext will always re-render when the context value changes', in this case when `state` changes, therefore when using `useReducerDispatcher`/`useMapperDispatcher` although it not depends "directly" on `state` the component will be re-render when `state` changes. Final words, use `SyncMapperProvider` and/or `AsyncMapperProvider`,`SyncReducerProvider` and/or `AsyncReducerProvider` everywhere is required and use `useReducer`/`useMapper`, `useReducerDispatcher`/`useMapperDispatcher` and/or `useReducerState`/`useMapperState` wisely (small scopes, as close to where is required with small amount of children). If children re-render is too expensive then `React.useMemo`:

```jsx
const FunComponent1 = () => {
  const dispatch = useMapperDispatcher('someMapper')
  return React.useMemo(() => (
    <RelatedChildComponent
      onClick={dispatch}
    />
  ), [dispatch])
}
```

#### `useMapperState`

**`useMapperState`** gives access only to the State when using React Function Components.

`useMapperState(id)`

*parameters*:

* `id?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

* the `state` of the respective Mapper Provider.

when using a Singleton Provider:

```jsx
import { useMapperState } from "react-reducer-provider";
import React from "react";

export default function SomeComponentN() {
  const currentState = useMapperState();
  return <div>Current:{currentState}</div>;
}
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { useMapperState } from "react-reducer-provider";
import React from "react";

export default function SomeComponentN() {
  const currentState = useMapperState("someNamedMapper");
  return <div>Current:{currentState}</div>;
}
```

> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeComponentN.jsx):  
> [![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-forked-kwqfo?file=/src/SomeComponentN.jsx)  

#### `injectMapper`

**`injectMapper`** gives access to both, State and [`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) when using React Class Components.

`injectMapper(ComponentClass, injectedPropName, id)`

*parameters*:

* `ComponentClass: class`: React Component class to be enhanced with `react-reducer-provider` properties.
* `injectedPropName: string`: Name of the property to be injected to the Class component that correspond to the mapper.
  * Returns a tuple containing the `state` as first element, and the `dispatcher` as second element.
  * Can be any name just be sure to avoid collision with existing names.
* `id?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

**Enhanced Component Class** with the indicated property, which holds a tuple containing:

* `[0]`: the `state`.
* `[1]`: the `dispatcher`.
* `[2]`: the provider id.
* `state`: the `state`.
* `dispatch`: the `dispatcher`.
* `provider`: the provider id.

when using a Singleton Provider:

```jsx
import { injectMapper } from 'react-reducer-provider'
import React from 'react'

class SomeComponent1 extends React.Component {
  render() {
    const [ state, dispatch ] = this.props.mapper
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state}
      </button>
    )
  }
}
export default injectMapper(SomeComponent1, 'mapper')
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { injectMapper } from 'react-reducer-provider'
import React from 'react'

class SomeComponent1 extends React.Component {
  render() {
    const [ state, dispatch ] = this.props.mapper
    return (
      <button onClick={() => dispatch('ACTION1')}>
        Child{state}
      </button>
    )
  }
}
export default injectMapper(SomeComponent1, 'mapper', 'someNamedMapper')
```

> Trying to reassign `state`, `dispatch`, `provider`, `[0]`, `[1]` or `[2]` will result in a`TypeError: Cannot assign to read only property '..' of object '[object Array]'` Exception.  
> Trying to add new fields will result in a `TypeError: can't define property "..": Array is not extensible` Exception.  
> For purpose of avoiding re-renders and/or improving performance **always use the elements of the tuple** as reference, never the tuple perse, keep in mind that the tuple that is returned may change but elements will only change when state changes. This is not an "issue" when using the elements of the tuple as reference or when using `use*Dispatcher` or `use*State`.

#### `injectMapperDispatcher`

**`injectMapperDispatcher`** gives access only to the [`Dispatcher`](https://github.com/gmullerb/react-reducer-provider/blob/master/src/react-reducer-provider.d.ts) when using React Class Components.

`injectMapperDispatcher(ComponentClass, injectedPropName, id)`

*parameters*:

* `ComponentClass: class`: React Component class to be enhanced with `react-reducer-provider` properties.
* `injectedPropName: string`: Name of the property to be injected to the Class component that correspond to the dispatcher.
  * Can be any name just be sure to avoid collision with existing names.
* `id ?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

* Enhanced Component Class with the indicated property, which holds the dispatcher.

when using a Singleton Provider:

```jsx
import { injectMapperDispatcher } from 'react-reducer-provider'
import React from 'react'

class ClassComponentA1 extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.dispatch('ACTION1')}>
        Click
      </button>
    )
  }
}
const ClassComponent1 = injectMapperDispatcher(ClassComponentA1, 'dispatch')
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { injectMapperDispatcher } from 'react-reducer-provider'
import React from 'react'

class ClassComponentA1 extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.dispatch('ACTION1')}>
        Click
      </button>
    )
  }
}
const ClassComponent1 = injectMapperDispatcher(ClassComponentA1, 'dispatch', 557)
```

#### `injectMapperState`

**`injectMapperState`** gives access only to the State when using React Class Components.

`injectMapperState(ComponentClass, injectedPropName, id)`

*parameters*:

* `ComponentClass: class`: React Component class to be enhanced with `react-reducer-provider` properties.
* `injectedPropName: string`: Name of the property to be injected to the Class component that correspond to the state.
  * Can be any name just be sure to avoid collision with existing names.
* `id ?: string | number | symbol`: constitutes the identifier (name, number or symbol) of the `SyncMapperProvider` or `AsyncMapperProvider` being accessed.

*returns*:

* Enhanced Component Class with the indicated property, which holds the state.

when using a Singleton Provider:

```jsx
import { injectMapperState } from 'react-reducer-provider'
import React from 'react'

class ClassComponentA2 extends React.Component {
  render() {
    return (
      <div>
        Child{this.props.state}
      </div>
    )
  }
}
const ClassComponent2 = injectMapperState(ClassComponentA2, 'state')
```

or when using an Identified `SyncMapperProvider` or `AsyncMapperProvider`:

```jsx
import { injectMapperState } from 'react-reducer-provider'
import React from 'react'

class ClassComponentA2 extends React.Component {
  render() {
    return (
      <div>
        Child{this.props.state}
      </div>
    )
  }
}
const ClassComponent2 = injectMapperState(ClassComponentA2, 'state', 557)
```

> Online example can be checked on line at [gmullerb-react-mapper-provider codesandbox](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponentN.jsx):  
[![Edit gmullerb-react-mapper-provider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-mapper-provider-yvwx7?file=/src/SomeComponentN.jsx)  

__________________

## Main documentation

[Back to homepage](../README.md)
