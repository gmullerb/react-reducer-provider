# Typings

**`react-reducer-provider` defines typings for Flow and Typescript**:

* Any can be used without an "special" [1] configuration.
  * Typings definitions are located together with source files:
    * Flow: [`NamedReducer.js.flow`](../src/NamedReducer.js.flow).
    * Typescript: [`NamedReducer.d.ts`](../src/NamedReducer.d.ts).

Both provide the following types:

* For Reducer Component Definition:
  * `SyncReducerProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `SyncReducerProps<STATE, ACTION>`
  * `SyncReducer<STATE, ACTION>`: defines the structure of the synchronous reducer function.
  * `AsyncReducerProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `AsyncReducerProps<STATE, ACTION>`
  * `AsyncReducer<STATE, ACTION>`: defines the structure of the asynchronous reducer function.
* For Reducer Consumption:
  * `Dispatcher<ACTION, DISPATCH>`: defines the function that receives the action that triggers the change of the state.
  * `ReducerProviderValue<STATE, ACTION, DISPATCH>`: defines the structure of the value return by `useReducer`.
  * `useReducer<STATE, ACTION, DISPATCH>: ReducerProviderValue<STATE, ACTION, DISPATCH>`: typings for `useReducer`.
  * `useReducerState<STATE>(name?: string): STATE`: typings for `useReducerState`.
  * `useReducerDispatcher<ACTION, DISPATCH>(name?: string): Dispatcher<ACTION, DISPATCH>`: typings for `useReducerState`.

`STATE`: State type, defined by the developer.  
`ACTION`: Action type, defined by the developer.  

What is `DISPATCH`?  
Defines how the action is dispatch, thereby, the type of the reducer.

`DISPATCH` is required only for Reducer Consumption, and can take 1 of 2 values:

* `Async`.
* `Sync`, which is the default, and there is no need to be specified.

> [1] Only the usual Flow or Typescript configuration (e.g. no need for @types package).

## Synchronous Reducer

1 . Define the State:

```tsx
  interface TestState {
    lastAction: number;
  }

  const initialState: TestState = {
    lastAction: 0
  }
```

2 . Define the Reducer:

```tsx
  function reduce(prevState: TestState, action: string): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return prevState
    }
  }
```

3 . Define the Reducer Provider:

```tsx
  <SyncReducerProvider
    name='testNamedReducer'
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </SyncReducerProvider>
```

4 . Define the Reducer Consumption:

*Types in function approach* (Recommended):

* More Readable.
* Less coding.
* Less imports.

`useReducer`:

```tsx
  const [ state, dispatch ] = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`:

```tsx
  const theDispatcher = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
```

*Types in values approach*:

`useReducer`:

```tsx
  const [ state, dispatch ]: ReducerProviderValue<TestState, string> = useReducer('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`:

```tsx
  const theDispatcher: Dispatcher<string> = useReducerDispatcher('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
```

## Asynchronous Reducer

1 . Define the State:

```tsx
  interface TestState {
    lastAction: number;
  }

  const initialState: TestState = {
    lastAction: 0
  }
```

2 . Define the Reducer:

* `async function syncReducer<STATE, ACTION>(prevState: STATE, action: ACTION): Promise<STATE>`

```tsx
  async function reduce(prevState: TestState, action: string): Promise<TestState> {
    switch (action) {
      case 'ACTION1':
        return someAsyncProcess()
          .then(() =>({
            lastAction: 1
          }))
          .catch(() =>({
            lastAction: 0
          }))
      default:
        return prevState
    }
  }
```

3 . Define the Reducer Provider:

```tsx
  <AsyncReducerProvider
    name='testNamedReducer'
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </AsyncReducerProvider>
```

4 . the Define Reducer Consumption:

* Must define `DISPATCH` as `Async` or `Promise<void>`:
  * `useReducer<STATE, ACTION, Async>('name')`, i.e Reduce `STATE` using `ACTION` `Async`hronously.
  * `useReducerDispatcher<ACTION, Async>('name')`, i.e dispatch `ACTION` `Async`hronously.

*Types in function approach* (Recommended):

* More Readable.
* Less coding.
* Less imports.

`useReducer`:

```tsx
  const [ state, dispatch ] = useReducer<TestState, string, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`:

```tsx
  const theDispatcher = useReducerDispatcher<string, Async>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
```

*Types in values approach*:

`useReducer`:

```tsx
  const [ state, dispatch ]: ReducerProviderValue<TestState, string, Async> = useReducer('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`:

```tsx
  const theDispatcher: Dispatcher<string, Async> = useReducerDispatcher('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1')
      .then(someFunc)
    }>
      Children
    </button>
  )
```

## Helper types

Additionally a Helper type is available: `Action<TYPE, DATA>`, useful for defining more complex types of actions:

*fields*:

* `type: TYPE`: identifies the action.
* `data?: DATA`: data required by the action.

e.g.:

```tsx
export const enum AppActionType {
  AUTH,
  LOGOUT,
  ADD_ITEM
}

export type AppActionData = User | string | undefined

export interface AppAction extends Action<AppActionType, AppActionData> {}

function reduce(prevState: AppState, action: AppAction): AppState {
  switch (action.type) {
  case AppActionType.AUTH:
    return auth(prevState, action.data as User)
  case AppActionType.LOGOUT:
    return logout(prevState)
  case AppActionType.ADD_ITEM:
    return addItem(prevState, action.data as string)
```

## Additional Examples

* A more "complete" example with Typescript can be seen at: [`typingTest.tsx`](../tests/typings/ts/typingTest.tsx).
* A more "complete" example with Flow can be seen at: [`typingTest.jsx`](../tests/typings/flow/typingTest.jsx).

> An example with Typescript typings can be checked on line at [gmullerb-react-reducer-provider-ts codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-ts-v3t7h?module=%2Fsrc%2FSomeReducerProvider.tsx):  
[![Edit gmullerb-react-reducer-provider-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-ts-v3t7h?module=%2Fsrc%2FSomeReducerProvider.tsx)  
> An example with Flow typings can be checked on line at [gmullerb-react-reducer-provider-flow codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-flow-w5bmd?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-flow](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-flow-w5bmd?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An asynchronous example with Typescript typings can be checked on line at [gmullerb-react-reducer-provider-async-ts codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-ts-ml8lp?module=%2Fsrc%2FSomeReducerProvider.tsx):  
[![Edit gmullerb-react-reducer-provider-async-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-ts-ml8lp?module=%2Fsrc%2FSomeReducerProvider.tsx)  
> An example of use can be looked at [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Main documentation

[Back](../README.md)
