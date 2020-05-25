# Typings

**`react-reducer-provider` defines typings for Flow and Typescript**:

* Any can be used without an "special" [1] configuration.
  * Typings definitions are located together with source files:
    * Flow: [`react-reducer-provider.js.flow`](../src/react-reducer-provider.js.flow).
    * Typescript: [`react-reducer-provider.d.ts`](../src/react-reducer-provider.d.ts).

Both provide the following types:

* For Reducer Component Definition:
  * `SyncReducerProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `SyncReducerProps<STATE, ACTION>`
  * `SyncReducer<STATE, ACTION>`: defines the structure of the synchronous reducer function.
  * `AsyncReducerProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `AsyncReducerProps<STATE, ACTION>`
  * `AsyncReducer<STATE, ACTION>`: defines the structure of the asynchronous reducer function.
* For Mapper Component Definition:
  * `SyncMapperProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `SyncMapperProps<STATE, ACTION>`
  * `SyncMapper<STATE, ACTION>`: defines the structure of the synchronous mapper function.
  * `AsyncMapperProvider<STATE, ACTION>`: specifies the Function React Component structure.
    * and the respective props types: `AsyncMapperProps<STATE, ACTION>`
  * `AsyncMapper<STATE, ACTION>`: defines the structure of the asynchronous mapper function.
* For Consumption:
  * `Dispatcher<ACTION, DISPATCH>`: defines the function that receives the action that triggers the change of the state.
  * `ProviderValue<STATE, ACTION, DISPATCH>`: defines the structure of the value return by `useReducer`/`useMapper`.
  * `useReducer<STATE, ACTION, DISPATCH>: ProviderValue<STATE, ACTION, DISPATCH>`.
  * `useReducerState<STATE>(id?: string): STATE`.
  * `useReducerDispatcher<ACTION, DISPATCH>(id?: string): Dispatcher<ACTION, DISPATCH>`.
  * `useMapper<STATE, ACTION, DISPATCH>: ProviderValue<STATE, ACTION, DISPATCH>`.
  * `useMapperState<STATE>(id?: string): STATE`.
  * `useMapperDispatcher<ACTION, DISPATCH>(id?: string): Dispatcher<ACTION, DISPATCH>`.

`STATE`: State type, defined by the developer.  
`ACTION`: Action type, defined by the developer.  

What is `DISPATCH`?  
Defines how the action is dispatch, thereby, the type of the reducer.

`DISPATCH` is required only for Reducer Consumption, and can take 1 of 2 values:

* `Async<T>`.
* `Sync<T>`, which is the default (`Sync<void>`), and there is no need to be specified.

> [1] Only the usual Flow or Typescript configuration (e.g. no need for @types package).

## Synchronous Reducer/Mapper

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

or with additional parameters:

```tsx
  function reduce(prevState: TestState, action: string, param1: number, param2: boolean, paramN: {}): TestState {
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
    id='testNamedReducer'
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </SyncReducerProvider>
```

2 . Define the Mapper:

```tsx
  function map(action: string): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return initialState
    }
  }
```

or with additional parameters:

```tsx
  function map(action: string, param1: number, param2: boolean, paramN: {}): TestState {
    switch (action) {
      case 'ACTION1':
        return {
          lastAction: 1
        }
      default:
        return initialState
    }
  }
```

3 . Define the Mapper Provider:

```tsx
  <SyncMapperProvider
    id='testNamedMapper'
    mapper={map}
    initialState={initialState}
  >
    {children}
  </SyncMapperProvider>
```

4 . Define the Consumption:

**Ignoring returned value**:

*Types in function approach* (Recommended):

* More Readable.
* Less coding.
* Less imports.

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ] = useReducer<TestState, string>('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher = useReducerDispatcher<string>('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
```

*Types in values approach*:

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ]: ProviderValue<TestState, string> = useReducer('testNamedReducer')
  return (
    <button onClick={(): void => dispatch('ACTION1')}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher: Dispatcher<string> = useReducerDispatcher('testNamedReducer')
  return (
    <button onClick={(): void => theDispatcher('ACTION1')}>
      Children
    </button>
  )
```

**Using returned value**:

* Must define `DISPATCH` as `Sync<STATE>` or `STATE`:

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ] = useReducer<TestState, string, Sync<STATE>>('testNamedReducer')
  return (
    <button onClick={(): void => console.log(dispatch('ACTION1'))}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher = useReducerDispatcher<string, Sync<STATE>>('testNamedReducer')
  return (
    <button onClick={(): void => console.log(theDispatcher('ACTION1'))}>
      Children
    </button>
  )
```

*Types in values approach*:

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ]: ProviderValue<TestState, string, Sync<STATE>> = useReducer('testNamedReducer')
  return (
    <button onClick={(): void => console.log(dispatch('ACTION1'))}>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher: Dispatcher<string, Sync<STATE>> = useReducerDispatcher('testNamedReducer')
  return (
    <button onClick={(): void => console.log(theDispatcher('ACTION1'))}>
      Children
    </button>
  )
```

## Asynchronous Reducer/Mapper

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

* `async function asyncReducer<STATE, ACTION>(prevState: STATE, action: ACTION): Promise<STATE>`

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
    id='testNamedReducer'
    reducer={reduce}
    initialState={initialState}
  >
    {children}
  </AsyncReducerProvider>
```

2 . Define the Mapper:

* `async function asyncMapper<STATE, ACTION>(STATE, action: ACTION): Promise<STATE>`

```tsx
  async function map(action: string): Promise<TestState> {
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
        return initialState
    }
  }
```

3 . Define the Mapper Provider:

```tsx
  <AsyncMapperProvider
    id='testNamedReducer'
    mapper={map}
    initialState={initialState}
  >
    {children}
  </AsyncMapperProvider>
```

4 . the Define Reducer Consumption:

**Ignoring returned value**:

* Must define `DISPATCH` as `Async` (or `Async<>` for Flow) or `Promise<void>`:
  * `useReducer<STATE, ACTION, Async>('name')`, i.e Reduce `STATE` using `ACTION` `Async`hronously.
  * `useReducerDispatcher<ACTION, Async>('name')`, i.e dispatch `ACTION` `Async`hronously.

*Types in function approach* (Recommended):

* More Readable.
* Less coding.
* Less imports.

`useReducer`\`useMapper`:

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

`useReducerState`\`useMapperState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

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

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ]: ProviderValue<TestState, string, Async> = useReducer('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1')
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

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

**Using returned value**:

* Must define `DISPATCH` as `Async<STATE>` or `Promise<STATE>`:

*Types in function approach* (Recommended):

* More Readable.
* Less coding.
* Less imports.

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ] = useReducer<TestState, string, Async<TestState>>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1').then(newState => console.info(newState))
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState = useReducerState<TestState>('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher = useReducerDispatcher<string, Async<TestState>>('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1').then(newState => console.info(newState))
      .then(someFunc)
    }>
      Children
    </button>
  )
```

*Types in values approach*:

`useReducer`\`useMapper`:

```tsx
  const [ state, dispatch ]: ProviderValue<TestState, string, Async<TestState>> = useReducer('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={async (): Promise<void> => await dispatch('ACTION1').then(newState => console.info(newState))
      .then(someFunc)
    }>
      Child{state.lastAction}
    </button>
  )
```

`useReducerState`\`useMapperState`:

```tsx
  const theState: TestState = useReducerState('testNamedReducer')
  return (
    <button>
      Child{theState.lastAction}
    </button>
  )
```

`useReducerDispatcher`\`useMapperDispatcher`:

```tsx
  const theDispatcher: Dispatcher<string, Async<TestState>> = useReducerDispatcher('testNamedReducer')
  const someFunc = () => {}
  return (
    <button onClick={(): Promise<void> => theDispatcher('ACTION1').then(newState => console.info(newState))
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

> An example with Typescript typings can be checked on line at [gmullerb-react-reducer-provider-ts codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-ts-4zi7k?module=%2Fsrc%2FSomeReducerProvider.tsx):  
[![Edit gmullerb-react-reducer-provider-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-ts-4zi7k?module=%2Fsrc%2FSomeReducerProvider.tsx)  
> An example with Flow typings can be checked on line at [gmullerb-react-reducer-provider-flow codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-flow-l6txu?module=%2Fsrc%2FSomeReducerProvider.jsx):  
[![Edit gmullerb-react-reducer-provider-flow](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-flow-l6txu?module=%2Fsrc%2FSomeReducerProvider.jsx)  
> An asynchronous example with Typescript typings can be checked on line at [gmullerb-react-reducer-provider-async-ts codesandbox](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-ts-v4syt?module=%2Fsrc%2FSomeReducerProvider.tsx):  
[![Edit gmullerb-react-reducer-provider-async-ts](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gmullerb-react-reducer-provider-async-ts-v4syt?module=%2Fsrc%2FSomeReducerProvider.tsx)  
> Examples of use can be looked at [basecode-react-ts](https://github.com/gmullerb/basecode-react-ts) and [basecode-cordova-react-ts](https://github.com/gmullerb/basecode-cordova-react-ts).  

## Main documentation

[Back](../README.md)
