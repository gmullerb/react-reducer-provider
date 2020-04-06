# React Reducer Provider Change Log

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
