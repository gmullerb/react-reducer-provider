# Migrations

## Migration to `5.0.0`

Basically when consuming Tagged Providers, old `states` and `dispatchers` are not available anymore, only a `get` function to get any provider:

### When using hooks

Use `useTaggedAny` instead of `useTaggedAnyState` or `useTaggedAnyDispatcher`.

* `useTaggedAnyState` and `useTaggedAnyDispatcher` were removed.
* types `TaggedStates` and `TaggedDispatchers` were removed.
* `TaggedProviderGetter` type was added.
* `useTaggedAny` changed the return value to a `TaggedProviderGetter` value.
* `TaggedProviderValue` definition changed.

Change from:

```tsx
function Component1(): ReactElement {
  const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('someNamedReducer')
  return (
    <button onClick={(): void => dispatchers.get('Tag1')('ACTION1', 'somevalue1', {})}>
      Child{states.get('TagN').lastAction}
    </button>
  )
}

function Component2(): ReactElement {
  const states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = useTaggedAnyState<'Tag1' | 'TagN', TestState1 | TestStateN>('someNamedReducer')
  const dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = useTaggedAnyDispatcher<'Tag1' | 'TagN'>('someNamedReducer')
  return (
    <button onClick={(): void => dispatchers.get('Tag1')('ACTION1', 'somevalue1', {})}>
      Child{states.get('TagN').lastAction}
    </button>
  )
}
```

to:

```tsx
interface SyncTaggedProviderGetter extends TaggedProviderGetter<'Tag1' | 'TagN', TestState1 | TestStateN> {}

function Component1(): ReactElement {
  const providers: SyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('someNamedReducer')
  return (
    <button onClick={(): void => providers.get('Tag1').dispatch('ACTION1', 'somevalue1', {})}>
      Child{providers.get('TagN').state.lastAction}
    </button>
  )
}

function Component2(): ReactElement {
  const providers: SyncTaggedProviderGetter = useTaggedAny<'Tag1' | 'TagN', TestState1 | TestStateN>('someNamedReducer')
  return (
    <button onClick={(): void => providers.get('Tag1')[1]('ACTION1', 'somevalue1', {})}>
      Child{providers.get('TagN')[0].lastAction}
    </button>
  )
}
```

### When using HOC

Use `injectTaggedAny` instead of `injectTaggedAnyState` or `injectTaggedAnyDispatcher`.

* `injectTaggedAnyState` and `injectTaggedAnyDispatcher` were removed.
* types `TaggedStates` and `TaggedDispatchers` were removed.
* `TaggedProviderGetter` type was added.
* `injectTaggedAny` changed the injected value to a `TaggedProviderGetter` value.
* `TaggedProviderValue` definition changed.

Change from:

```tsx
interface ComponentProps { someProp: string }
interface ComponentState { someState: number }

interface InnerComponent1Props extends ComponentProps { tagged: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> }

class InnerComponent1 extends React.Component<InnerComponent1Props, ComponentState> {
  render() {
    const [ states, dispatchers ]: TaggedProviderValue<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.tagged
    return (
      <button onClick={(): void => dispatchers.get('Tag1')('ACTION1')}>
        Child{states.get('Tag1').lastAction}
      </button>
    )
  }
}
const Component1 = injectTaggedAny<{ tagged: any }, ComponentProps>(InnerComponent1, 'tagged', 'someNamedMapper')

interface InnerComponent2Props extends ComponentProps { states: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> }

class InnerComponent2 extends React.Component<InnerComponent2Props, ComponentState> {
  render() {
    const theStates: TaggedStates<'Tag1' | 'TagN', TestState1 | TestStateN> = this.props.states
    return (
      <button>
      Child{theStates.get('Tag1').lastAction}
      </button>
    )
  }
}
const Component2 = injectTaggedAnyState<{ states: any }, ComponentProps>(InnerComponent2, 'states', 'someNamedMapper')

interface InnerComponent3Props extends ComponentProps { dispatchers: TaggedDispatchers<'Tag1' | 'TagN'> }

class InnerComponent3 extends React.Component<InnerComponent3Props, ComponentState> {
  render() {
    const theDispatchers: TaggedDispatchers<'Tag1' | 'TagN'> = this.props.dispatchers
    return (
      <button onClick={(): void => theDispatchers.get('Tag1')('ACTION1')}>
        Children
      </button>
    )
  }
}
const Component3 = injectTaggedAnyDispatcher<{ dispatchers: any }, ComponentProps>(InnerComponent3, 'dispatchers', 'someNamedMapper')
```

to:

```tsx
interface SyncTaggedProviderGetter extends TaggedProviderGetter<'Tag1' | 'TagN', TestState1 | TestStateN> {}

interface ComponentProps { someProp: string }
interface ComponentState { someState: number }

interface InnerComponent1Props extends ComponentProps { tagged: SyncTaggedProviderGetter }

class InnerComponent1 extends React.Component<InnerComponent1Props, ComponentState> {
  render() {
    const theProviders: TestSyncTaggedProviderGetter = this.props.tagged
    return (
      <button onClick={(): void => theProviders.get('Tag1').dispatch('ACTION1')}>
        Child{theProviders.get('Tag1').state.lastAction}
      </button>
    )
  }
}
const Component1 = injectTaggedAny<{ tagged: SyncTaggedProviderGetter }, ComponentProps>(InnerComponent1, 'tagged', 'someNamedMapper')

interface InnerComponent2Props extends ComponentProps { providers: SyncTaggedProviderGetter }

class Component2 extends React.Component<InnerComponent2Props, ComponentState> {
  render() {
    const theProviders: SyncTaggedProviderGetter = this.props.providers
    return (
      <button>
      Child{theProviders.get('Tag1').state.lastAction}
      </button>
    )
  }
}
const Component2 = injectTaggedAny<{ providers: SyncTaggedProviderGetter }, ComponentProps>(InnerComponent2, 'providers', 'someNamedMapper')

interface InnerComponent3Props extends ComponentProps { providers: SyncTaggedProviderGetter }

class Component3 extends React.Component<InnerComponent3Props, ComponentState> {
  render() {
    const theProviders: SyncTaggedProviderGetter = this.props.providers
    return (
      <button onClick={(): void => theProviders.get('Tag1').dispatch('ACTION1')}>
        Children
      </button>
    )
  }
}
const Component3 = injectTaggedAny<{ providers: SyncTaggedProviderGetter }, ComponentProps>(InnerComponent3, 'providers', 'someNamedMapper')
```

## Migration from [`react-named-reducer`](https://www.npmjs.com/package/react-named-reducer) to [`react-reducer-provider`](https://www.npmjs.com/package/react-reducer-provider)

1 . Change package dependency:

`package.json`:

* from:  
`"react-named-reducer": "2.0.1"`

* to:  
`"react-reducer-provider": "5.0.0"`

2 . Change imports:

* from:  
`import .. from 'react-named-reducer'`

* to:  
`import .. from 'react-reducer-provider'`

## Main source - Reducer Component Definition

3 . Change the "old" `NamedReducer` to `SyncReducerProvider`:

3 . a. Change import:

* from:  
`import { NamedReducer } from 'react-named-reducer'`

* to:  
`import { SyncReducerProvider } from 'react-reducer-provider'`

3 . b. Change Component:

* from:  
`NamedReducer`

* to:  
`SyncReducerProvider`

e.g.:

*from*:

```jsx
import React from "react";
import { NamedReducer } from "react-named-reducer";

const initialState = 0;

function reduce(prevState, action) {
  switch (action) {
    case "ACTION1":
      return prevState + 1;
    case "ACTION2":
      return prevState - 1;
    default:
      return prevState;
  }
}

function SomeNamedReducer({ children }) {
  return (
    <NamedReducer
      name="someNamedReducer"
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </NamedReducer>
  );
}

export { SomeNamedReducer };
```

*to*:

```jsx
import React from "react";
import { SyncReducerProvider } from "react-reducer-provider";

const initialState = 0;

function reduce(prevState, action) {
  switch (action) {
    case "ACTION1":
      return prevState + 1;
    case "ACTION2":
      return prevState - 1;
    default:
      return prevState;
  }
}

function SomeNamedReducer({ children }) {
  return (
    <SyncReducerProvider
      id="someNamedReducer"
      reducer={reduce}
      initialState={initialState}
    >
      {children}
    </SomeNamedReducer>
  );
}

export { SomeNamedReducer };
```

### Typings

* from:  
`NamedReducerProps`

* to:  
`SyncReducerProps`

## Main source - Reducer Consumption

4 . Change uses of "old" `useNamedReducer` to `useReducer` hook:

4 . a. Change import:

* from:  
`import { useNamedReducer } from 'react-named-reducer'`

* to:  
`import { useReducer } from 'react-reducer-provider'`

4 . b. Change hook:

* from:  
`const { state, dispatch } = useNamedReducer("someNamedReducer")`

* to:  
`const [ state, dispatch ] = useReducer("someNamedReducer")`

e.g.:

*from*:

```jsx
import { useNamedReducer } from 'react-named-reducer';
import React from "react";

export default function SomeComponent1() {
  const { state, dispatch } = useNamedReducer("someNamedReducer")
  return <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>;
}
```

*to*:

```jsx
import { useReducer } from "react-reducer-provider";
import React from "react";

export default function SomeComponent1() {
  const [ state, dispatch ] = useReducer("someNamedReducer");
  return (
    <button onClick={() => dispatch("ACTION1")}>Go up (from {state})!</button>
  );
}
```

> if context was used, i.e. `const [state, dispatch] = useContext(useNamedReducerContext('someNamedReducer'))`, just change it to `const [ state, dispatch ] = useReducer("someNamedReducer")`.

### Typings

* from:  
`NamedReducerInterface`

* to:  
`ProviderValue`

e.g.:

*from*:

```tsx
  const { state, dispatch }: NamedReducerInterface<State, Action> = useNamedReducer("someNamedReducer")
```

*to*:

```tsx
  const [ state, dispatch ]: ProviderValue<State, Action> = useReducer("someNamedReducer");
```

> Prefer *Types in function approach*, [typings](typings.md).

## Test Source

With traditional & sensational Jasmine:

*from*:

```jsx
  import * as ReactNamedReducer from 'react-named-reducer'
  ..
  mockState = {}
  mockDispatcher = jasmine.createSpy('dispatcher')
  spyOn(ReactNamedReducer, 'useNamedReducer')
    .and
    .returnValue({
      state: mockState,
      dispatch: mockDispatcher
    })
```

*to*:

```jsx
  import * as ReducerProviderModule from 'react-reducer-provider'
  ..
  mockState = {}
  mockDispatcher = jasmine.createSpy('dispatcher')
  spyOn(ReducerProviderModule, 'useReducer')
    .and
    .returnValue([
      mockState,
      mockDispatcher
    ])
```

With Jest:

*from*:

```jsx
  mockState = {}
  mockDispatcher = jest.fn()
  jest.mock('react-named-reducer', () => ({
    useNamedReducer: () => ({
      state: mockState,
      dispatch: mockDispatcher
    })
  }))
```

*to*:

```jsx
  mockState = {}
  mockDispatcher = jest.fn()
  jest.mock('react-reducer-provider', () => ({
    useReducer: () => [
      mockState,
      mockDispatcher
    ]
  }))
```

## Main documentation

[Back](../README.md)
