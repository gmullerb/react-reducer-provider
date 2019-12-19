# React Reducer Context Change Log

## 2.0.0 - December 2019

* Adds automatic creation of the Context.
* Removes default export of `ReducerContext`.
  * Using default can harm Maintainability.
* Updates README files.

## 1.0.2 - December 2019

* Adds Access Hooks to allow easily use of `ReducerContext` and make it "friendly" for Typescript and Flow (array destructuring was creating some headaches when using `useContext`, although the mixing `ReducerContext`s may require the use of `useContext`).
  * which also increase Readability.
* Updates README files.

## 1.0.1 - November 2019

* Migrates ES6 `import`/`export` to CommonJS `require`/`module.exports` in order to improve module compatibility.
* Updates README file.
