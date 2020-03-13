# Testing

## When testing a component that requires to be enclosed in a context

* Use enzyme `mount`.
* Enclosed component with a `NamedReducer`.
  * add the required properties:
    * `name`: name of the context used by the component to be test.
    * `initialState`: the state required by the test.

```jsx
  it('test description', () => {
    const component = mount(<NamedReducer
      name='theContextName'
      initialState={{
        field1: value1,
        fieldN: valueN,
      }}
    >
      <ComponentToBeTest />
    </NamedReducer>
    )
```

e.g. [NamedReducer.test.jsx](../src/test/js/NamedReducer.test.jsx)

## When testing a custom hook tha use NamedReducer hooks

* Mock/Stub the required hooks.

Mocking `useNamedReducer`:

```js
  import * as NamedReducerModule from 'react-named-reducer'
  ..
  const mockState = {}
  const mockDispatcher = jasmine.createSpy()
  spyOn(NamedReducerModule, 'useNamedReducer')
    .and
    .callFake(() => ({
      state: mockState,
      dispatch: mockDispatcher
    }))
```

or

```js
  const mockState = {}
  const mockDispatcher = jest.fn()
  jest.mock('react-named-reducer', () => ({
    useNamedReducer: () => ({
      state: mockState,
      dispatch: mockDispatcher
    })
  }))
```

Mocking `useReducerState`:

```js
  import * as NamedReducerModule from 'react-named-reducer'
  ..
  const mockState = {}
  spyOn(NamedReducerModule, 'useReducerState')
    .and
    .callFake(() => mockState)
```

or

```js
  const mockState = {}
  jest.mock('react-named-reducer', () => ({
    useReducerState: () => mockState
  }))
```

Mocking `useReducerDispatcher`:

```js
  import * as NamedReducerModule from 'react-named-reducer'
  ..
  const mockDispatcher = jasmine.createSpy()
  spyOn(NamedReducerModule, 'useReducerDispatcher')
    .and
    .callFake(() => mockDispatcher)
```

or

```js
  const mockDispatcher = jest.fn()
  jest.mock('react-named-reducer', () => ({
    useReducerDispatcher: () => mockDispatcher
  }))
```
