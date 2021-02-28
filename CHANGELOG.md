# React Reducer Provider Change Log

## 5.0.0 - April 2021

* Breaking changes (Thinking more in JS way, and less in C++ or Java way): In order to remove recurrent call of `createDispatcher(stateRef, reRenderTrigger)` in `const wrappedDispatcher = React.useRef(createDispatcher(stateRef, reRenderTrigger))` for Providers components, and since `useRef` does not allow for a creation function ("yet"), the internal implementation for component is changed to class component, avoiding that recurrent call (big fan of hooks but using them wisely).
  * It's only a breaking change, if you were using `*Provider` as a function and not as JSX, e.g. `<>{SyncReducerProvider(..)}</>` (some rare use case, but valid) instead of `<SyncReducerProvider..>..</SyncReducerProvider>`.
  * Major breaking change if when consuming Tagged Providers using `useTaggedAnyState`, `useTaggedAnyDispatcher`, `injectTaggedAnyDispatcher` or `injectTaggedAnyState`.
    * `useTaggedAnyState`, `useTaggedAnyDispatcher`, `injectTaggedAnyDispatcher` and `injectTaggedAnyState` are removed (although could be kept, but the performance will be poor compare to using `useTaggedAny` or `injectTaggedAny`).
  * Also, how `useTaggedAny`/`injectTaggedAny` is used changed, now it returns a `get` to obtain the provider value.
  * When moving to classes, what I named 'method imbuing' was use to avoid prototype chaining (it will increase performance, but it may minimal increase memory consumption if more than 1 StateProvider is used (, but we use `bind` in classes "everyday", which is pretty similar)).
  * Not even 1 test was changed or remove, only new tests were added, i.e. A totally successful refactoring.
  * Using classes the internal code complexity was reduce, increasing learnability and maintainability.
* Optional initial state for reducer and mapper.
  * Adds new tests.
* Restores fields for consumption in order to be more flexible and avoid array destructuring if desired (avoiding array destructuring may increase performance if polyfill is required) and improves readability for some cases.
  * Adds new tests.
* Adds `provider` field to object/tuple accessed when consuming, with the id of the provider.
* Adds `tag` field field to object/tuple accessed when consuming tagged.
* Checks if the state is the same before computing new internal state, to avoid re-renderings.
  * Adds new tests.
* Adds `shouldComponentUpdate` to avoid any re-render when State Provider props changes, i.e. ignore props changed for render, not for processing, improving performance.
* Internal implementation for tagging is now made with 1 Map instead of 2, improving performance.
* Improves HOC performance.
* Seals the reducer/mappers tuple, i.e. cannot be directly changed when consuming or extend, in order to promote best practices when developing and avoiding side-effects bugs.
* Secures internal map for Tagged State providers, to avoid changing when consuming.
* Updates async tests to run faster and avoid failures in ci.
* Renames files:
  * `useReducer.js` to `useAny.js`.
  * `useReducerDispatcher.js` to `useAnyDispatcher.js`.
  * `useReducerState.js` to `useAnyState.js`.
  * `useTaggedReducer.js` to `useTaggedAny.js`.
  * `useTaggedReducerDispatcher.js` to `useTaggedAnyDispatcher.js`.
  * `useTaggedReducerState.js` to `useTaggedAnyState.js`.
  * `ReducerProvider.js` to `imbueTaggedStateProvider.js`
    * `MapperProvider.js` and gone.
  * `TaggedReducerProvider.js` to `imbueTaggedStateProvider.js`.
* Updates Documentation files.
  * Adds documentation for Function as state.
  * Adds documentation for Provider props changes.
  * Adds documentation for Exceptions.
  * Renames `blending-*.md` to `tagged-*.md`.
  * Renames `readme` folder to `docs`.

## 4.4.0 - October 2020

* Adds the capability to use a function to initialize state.
* Updates Documentation files.

## 4.3.0 - August 2020

* Adds `inject` to allow Class Component to use react-reducer-provider (this was possible in the original `react-reducer-context`, but was discarded to favor Function Components, Now allowed again in order to be more flexible and to be used in other projects and legacy projects).
* Fixes peerDependencies.
* Updates Documentation files.

## 4.2.0 - August 2020

* Adds Tagged State/Action/Mapper: SyncTaggedMapperProvider & AsyncTaggedMapperProvider.
* Updates Documentation files.

## 4.1.0 - August 2020

* Adds Tagged State/Action/Reducer in order to allow easy and simple blending (react-redux is too complex).
* Removes deprecated `ReducerProviderValue`.
* Updates Documentation files.

## 4.0.0 - May 2020

* Breaking change: Now the `name` can be a number or Symbol, then `id` looks more semantically correct, so `name` is changed to `id`.
* Updates Documentation files.

## 3.5.1 - May 2020

* Singleton now use a Symbol id => This will avoid any collision.

## 3.5.0 - May 2020

* New Features:
  * Extra parameters for Mappers and Reducers => Extra arguments for Dispatchers.
  * Allows `symbol` as identification for providers.
* Improves project configuration.
* Updates Documentation files.

## 3.4.0 - May 2020

* New Feature: Mapper functions => `SyncMapperProvider`, `AsyncMapperProvider`, `useMapper`, `useMapperState` and `useMapperDispatcher`.
* Deprecates: `ReducerProviderValue`, instead use `ProviderValue`, but prefer types in function, i.e. `useReducer<>` or `useMapper<>`.
* Updates Documentation files.

## 3.3.0 - May 2020

* New Feature: Now `AsyncReducerProvider` and `SyncReducerProvider` can be identified by number, not just by a string, number should be "faster".
* Updates Documentation files.

## 3.2.1 - May 2020

* Now the returned Dispatcher will be the same always, removes `useCallback`.
* Adds new test cases.
* Isolates mocking tests, they were messing with remaining tests.
* Improves project configuration.
* Updates Documentation files.

## 3.2.0 - May 2020

* New Feature: Now the Dispatcher returns the new State.
  * Existing `Async` & `Sync` for Flow will required brackets, i.e. `Async<>` & `Sync<>` (Not bumping version to 4, just for Flow)
* Fixes dependencies of `useCallback` for `wrappedDispatcher`.
* Updates Documentation files.

## 3.1.0 - May 2020

* Improves project configuration to allow Tree Shaking optimization.
* Updates Linting tools and does required changes.
* Updates Documentation files.

## 3.0.0 - April 2020

* Breaking changes:
  * Removes Deprecated: `NamedReducer`, `useNamedReducerContext`, `useNamedReducer`, `NamedReducerProps`, `NamedReducerInterface` and `NamedReducerValue`.
  * Moves from a Maven style folder structure to a "standard" Npm package style:
    * `src/test/` => `tests/`
    * `src/main/js` => `src/`
  * Renames `NamedReducer` files to `ReducerProvider` files.
* Improves project configuration.
  * Simplifies gradle tasks.
  * Enhances npm scripts.
* Updates Documentation files.

## 2.1.1 - April 2020

* Exports `Action` helper type for Typescript.

## Inception of react-reducer-provider :D - 2.1.0 - April 2020

* Inception :D => Evolution of [react-named-reducer](https://www.npmjs.com/package/react-named-reducer)
  * Allows for `async` reducers.
  * Allows Providers with no name, useful for defining a Singleton Reducer Provider.
  * Adds helper type `Action` which have been useful in several projects.
  * Removes validation of existence of reducer context in favor of performance, is up to the developer to do a good coding and to **guaranteed that names are "paired" between provider, `SyncReducerProvider` or `AsyncReducerProvider`, and consumers, `useReducer`, `useReducerState` or `useReducerDispatcher`**.
  * Deprecates `NamedReducer`, `NamedReducerProps`, `NamedReducerInterface`, `NamedReducerValue`, `useNamedReducer` &`useNamedReducerContext`.
  * Updates Documentation files.

## 2.0.2 - March 2020

* Improves typings using interfaces instead of alias wherever possible.
* Removes unused set.
* Updates Documentation files.

## 2.0.1 - February 2020

* Updates Documentation files in order to reduce package size

## 2.0.0 - February 2020

* Breaking changes (only if using some typings):
  * Removes unnecessary parameter types in `useReducerState` and `useReducerDispatcher`.
* Updates Documentation files.

## Inception of react-named-reducer :D

* Inception :D => Modifies [react-reducer-context](https://www.npmjs.com/package/react-reducer-context)
  * Now contexts are accessed by name => more easy to use and no need for `createContext` or `useContext`.
  * Removes default exports, mainly `NamedReducer`.
