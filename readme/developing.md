# Extending/Developing

## Prerequisites

* [Java](http://www.oracle.com/technetwork/java/javase/downloads) [1].
* [Git](https://git-scm.com/downloads) (only if you are going to clone the project).

> [1] Node/Npm or Node/Yarn can be used.

## Getting it

Clone or download the project[1], in the desired folder execute:

```sh
git clone https://github.com/gmullerb/react-reducer-context
```

> [1] [Cloning a repository](https://help.github.com/articles/cloning-a-repository/)

## Set up

* **No need**, only download and run (It's Gradle! Yes!).

> Gradle will allow to have different really isolate Node/Npm environments for different projects, but `npm` or `yarn` can be used.

## Folders structure

```
  /config
    /main
    /test
  /src
    /main
      /js
    /test
      /js
      /typings
```

- `config/main`: Configuration files for Main tools.
- `config/test`: Configuration files for Tests.
- `src/main/js`: Main source files.
- `src/test/js`: Test source files[1].
- `src/test/typings`: Test of typings for Flow and Typescript.

> [1] Tests are done with [Karma](http://karma-runner.github.io) and [Jasmine](https://jasmine.github.io).

## Building it

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
  * `unitTest`: runs Jasmine/Karma tests of `ReducerContext` component (`src/test/js`).
    * will run `test` npm script.
  * `testTypingFlow`: tests `ReducerContext` component Flow typings (`src/test/typings/flow`).
    * will run `testTypingsFlow` npm script.
  * `testTypingTs`: tests `ReducerContext` component Typescript typings (`src/test/typings/ts`).
    * will run `testTypingTs` npm script.

Run `gradlew`: will executed default tasks:

* `assessCommon`, `assessGradle`, `npmInstall`, `assessStyleConfig`, `build`
  * `build`: will also execute assess tasks and test tasks.

* To get all the tasks for the project run: `gradlew tasks --all`

> Recommendation: First time run `gradlew` to start from an "ok" code.

### Npm

Npm scripts, [`package.json`](../package.json):

* `assessFlowStyleMain`: checks eslint style of `js.flow` files.
* `assessTsStyleMain`: checks eslint style of `d.ts` files.
* `assessTypingsFlow`: checks Flow typings of source files.
* `assessTypingsTs`: checks Typescript typings of source files.
* `onlyGradle:assessStyleConfig`: checks eslint style of config files [1].
* `onlyGradle:assessStyleMain`: checks eslint style of main source files [1].
* `onlyGradle:assessStyleTest`: checks eslint style of test source files [1].
* `test`: runs Jasmine/Karma tests of `ReducerContext` component (`src/test/js`).
* `testTypingFlow`: tests `ReducerContext` component Flow typings (`src/test/typings/flow`).
* `testTypingTs`: tests `ReducerContext` component Typescript typings (`src/test/typings/ts`).

> There are some scripts that "only" can be run from gradle (prefixed with `onlyGradle:`), because gradle will download some files that are required by those tasks and set the respective npm config variables. To use it from node this must be done manually.  
> [1] it will use eslint configuration defined in [base-style-config](https://github.com/gmullerb/base-style-config).

## Main documentation

[Back](../README.md)
