# React Reducer Provider Change Log

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
