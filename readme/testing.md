# Testing

## Unit Test - Mocking Reducer Providers hooks

* Useful when testing custom hooks.
* Useful when using [enzyme `shallow`](https://enzymejs.github.io/enzyme/docs/api/shallow.html).
  * No need for `SyncReducerProvider` nor `AsyncReducerProvider`.

*Mocking `useReducer`*:

* With traditional & sensational Jasmine:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  const mockState = {}
  const mockDispatcher = jasmine.createSpy()
  spyOn(ReducerProviderModule, 'useReducer')
    .and
    .returnValue([
      mockState,
      mockDispatcher
    ])
```

or

if values is going to change from test case to test case:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  let mockState
  let mockDispatcher
  spyOn(ReducerProviderModule, 'useReducer')
    .and
    .callFake(() => [
      mockState,
      mockDispatcher
    ])
```

* With Jest:

```js
  const mockState = {}
  const mockDispatcher = jest.fn()
  jest.mock('react-reducer-provider', () => ({
    useReducer: () => ([
      mockState,
      mockDispatcher
    ])
  }))
```

*Mocking `useReducerState`*:

* With traditional & sensational Jasmine:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  const mockState = {}
  spyOn(NamedReducerModule, 'useReducerState')
    .and
    .returnValue(mockState)
```

or

if state is going to change from test case to test case:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  let mockState
  spyOn(ReducerProviderModule, 'useReducerState')
    .and
    .callFake(() => mockState)
```

* With Jest:

```js
  const mockState = {}
  jest.mock('react-reducer-provider', () => ({
    useReducerState: () => mockState
  }))
```

*Mocking `useReducerDispatcher`*:

* With traditional & sensational Jasmine:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  const mockDispatcher = jasmine.createSpy()
  spyOn(ReducerProviderModule, 'useReducerDispatcher')
    .and
    .returnValue(mockDispatcher)
```

or

if dispatcher is going to change from test case to test case:

```js
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  let mockDispatcher
  spyOn(ReducerProviderModule, 'useReducerDispatcher')
    .and
    .callFake(() => mockDispatcher)
```

* With Jest:

```js
  const mockDispatcher = jest.fn()
  jest.mock('react-reducer-provider', () => ({
    useReducerDispatcher: () => mockDispatcher
  }))
```

Examples can be seen at: [`MockingReducerProvider.test.jsx`](../tests/js/MockingReducerProvider.test.jsx).

## Integration Test - Testing how a component that requires to be enclosed in a Reducer Provider behave

1 . Use [enzyme `mount`](https://enzymejs.github.io/enzyme/docs/api/mount.html).  
2 . Enclosed component with a `SyncReducerProvider` or `AsyncReducerProvider`:

* add the required properties:
  * `name`: name of the context used by the component to be test.
  * `initialState`: the state required by the test.
  * `reducer`: the reducer required by the test.

```jsx
  it('test description', () => {
    const component = mount(<SyncReducerProvider
      name='theContextName'
      initialState={{
        field1: value1,
        fieldN: valueN,
      }}
      reducer={(prevState, action) => {
        switch (action) {
          case 'ACTION1':
            return {
              field1: valueA,
              fieldN: valueB,
            }
          default:
            return prevState
        }
      }}
    >
      <ComponentToBeTest />
    </SyncReducerProvider>
    )
```

Examples can be seen at: [`SingletonReducerProvider.test.jsx`](../tests/js/SingletonReducerProvider.test.jsx), [`SyncReducerProvider.test.jsx`](../tests/js/SyncReducerProvider.test.jsx) and [`AsyncReducerProviderWithAsync.test.jsx`](../tests/js/AsyncReducerProviderWithAsync.test.jsx).

## Main documentation

[Back](../README.md)
