# Accessing the Context

1 . Using "old" traditional [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext):

```jsx
  const [state, dispatch] = useContext(useNamedReducerContext('someNamedReducer'))
```

e.g.:

```jsx
import { useNamedReducerContext } from 'react-named-reducer'
import React, { useContext } from 'react'

export default function SomeComponent() {
  const [state, dispatch] = useContext(useNamedReducerContext('someNamedReducer'))
  return (
    <button onClick={() => dispatch({
        type: 'SOME_ACTION',
        data: someValue
      })}
    >
      Do something! ({state.someValue})
    </button>
  )
}
```

2 . Using [`Context.Consumer`](https://reactjs.org/docs/context.html#contextconsumer):

```jsx
  <SomeNamedReducer.Consumer>
    {
      ([state, dispatch]) => (
        ..
      )
    }
  </SomeNamedReducer.Consumer>
```

e.g.:

```jsx
import { useNamedReducerContext } from 'react-named-reducer'
import React from 'react'

export default function SomeComponent() {
  const SomeNamedReducer = useNamedReducerContext('someNamedReducer')
  return (
    <SomeNamedReducer.Consumer>
    {
      ([state, dispatch]) => (
        <button onClick={() => dispatch({
            type: 'SOME_ACTION',
            data: someValue
          })}
        >
          Do something! ({state.someValue})
        </button>
      )
    }
    </SomeNamedReducer.Consumer>
  )
}
```

3 . There is another way using [`contextType`](https://reactjs.org/docs/context.html#classcontexttype), but is not functional approach, so it is not exposed.  

> Examples can be also seen at: [`NamedReducer.test.jsx`](src/test/js/NamedReducer.test.jsx).

## Typings

The following type is available when accessing the context:

* `NamedReducerValue<STATE, ACTION>`: defines the type of the value contained in the `React.Context` of `NamedReducer`.

```tsx
  const SomeNamedReducer: Context<NamedReducerValue<state, action>> = useNamedReducerContext('someNamedReducer')
```

## Main documentation

[Back](../README.md)
