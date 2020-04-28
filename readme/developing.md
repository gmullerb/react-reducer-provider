# Extending/Developing

## Prerequisites

* Node/Npm, Node/Yarn or [Java](http://www.oracle.com/technetwork/java/javase/downloads).
* [Git](https://git-scm.com/downloads) (only if you are going to clone the project).

## Getting it

Clone or download the project[1], in the desired folder execute:

```sh
git clone https://github.com/gmullerb/react-reducer-provider
```

or

```sh
git clone https://gitlab.com/gmullerb/react-reducer-provider
```

> [1] [Cloning a repository](https://help.github.com/articles/cloning-a-repository/)

## Set up

### Npm

Run:

```sh
npm install
```

### Gradle

Run:

```sh
./gradlew
```

## Folders structure

```
  /config
    /main
    /test
  /src
  /tests
    /js
    /typings
```

- `config/main`: Configuration files for Main tools.
- `config/test`: Configuration files for Tests.
- `src`: Main source files.
- `tests/js`: Test source files[1].
- `tests/typings`: Test of typings for Flow and Typescript.

> [1] Tests are done with [Karma](http://karma-runner.github.io) and [Jasmine](https://jasmine.github.io).

## Building it

### Npm

Npm scripts, [`package.json`](../package.json):

* `assessFlowStyleMain`: checks eslint style of `js.flow` files.
* `assessTsStyleMain`: checks eslint style of `d.ts` files.
* `assessTypingsFlow`: checks Flow typings of source files.
* `assessTypingsTs`: checks Typescript typings of source files.
* `assessStyleConfig`: checks eslint style of config files [1].
* `assessStyleMain`: checks eslint style of main source files [1].
* `assessStyleTest`: checks eslint style of test source files [1].
* `test`: runs Jasmine/Karma tests for Reducer Provider components (`tests/js`).
* `testTypingFlow`: tests Reducer Provider components Flow typings (`tests/typings/flow`).
* `testTypingTs`: tests Reducer Provider components Typescript typings (`tests/typings/ts`).

Run `npm run check` to execute all tasks.

* To get all the tasks for the project run: `npm run`

> Recommendation: First time run `npm run check` to start from an "ok" code.  
> [1] it will use eslint configuration defined in [base-style-config](https://github.com/gmullerb/base-style-config), most specifically [eslint-plugin-base-style-config](https://www.npmjs.com/package/eslint-plugin-base-style-config).

### Gradle

Gradle tasks, [`build.gradle`](../build.gradle):

* To assess files run:
  * `assessCommon`: checks common style of **all** files.
  * `assessGradle`: checks code style of `build.gradle` file.
  * `assessStyleMain`: checks eslint style of main source files.
    * will run `onlyGradle:assessStyleMain` npm script.
  * `assessFlowStyleMain`: checks eslint style of `js.flow` files.
    * will run `assessFlowStyleMain` npm script.
  * `assessTsStyleMain`: checks eslint style of `d.ts` files.
    * will run `assessTsStyleMain` npm script.
  * `assessTypingsFlow`: checks Flow typings of source files.
    * will run `assessTypingsFlow` npm script.
  * `assessTypingsTs`: checks Typescript typings of source files.
    * will run `assessTypingsTs` npm script.
  * `assessStyleTest`: checks eslint style of test source files.
    * will run `onlyGradle:assessStyleTest` npm script.
  * `assessStyleConfig`: checks eslint style of config files.
    * will run `onlyGradle:assessStyleConfig` npm script.

* To test code and check coverage: `gradlew test`, this will run:
  * `unitTest`: runs Jasmine/Karma tests for Reducer Provider components (`tests/js`).
    * will run `test` npm script.
  * `testTypingFlow`: tests Reducer Provider components Flow typings (`tests/typings/flow`).
    * will run `testTypingsFlow` npm script.
  * `testTypingTs`: tests Reducer Provider components Typescript typings (`tests/typings/ts`).
    * will run `testTypingTs` npm script.

Run `./gradlew` to execute default tasks:

* `assessCommon`, `assessGradle`, `npmInstall`, `assessStyleConfig`, `build`
  * `build`: will also execute assess tasks and test tasks.

* To get all the tasks for the project run: `gradlew tasks --all`

> Recommendation: First time run `gradlew` to start from an "ok" code.

### Remember

When developing a Npm module with hooks and using that module locally then is important that `node_modules` folder is rename (or something) to avoid `Invalid Hook Call Warning`:

```bash
 Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
 1. You might have mismatching versions of React and the renderer (such as React DOM)
 2. You might be breaking the Rules of Hooks
 3. You might have more than one copy of React in the same app
 See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

Basically due to more than one copy of React in the same app.

## Main documentation

[Back](../README.md)
