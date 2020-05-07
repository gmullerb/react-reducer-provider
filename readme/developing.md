# Extending/Developing

## Prerequisites

* Node/Npm, Node/Yarn or failing [Java](http://www.oracle.com/technetwork/java/javase/downloads) & [Gradle](https://gradle.org/).
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

> Recommendation: Immediately after installation, run `npm run check` to be sure that initial code is "ok".  
> [1] it will use eslint configuration defined in [base-style-config](https://github.com/gmullerb/base-style-config), most specifically [eslint-plugin-base-style-config](https://www.npmjs.com/package/eslint-plugin-base-style-config).

### Gradle

Run:

```sh
./gradlew
```

This command will install `node` (`npm install`) and run `npm run check`.

### Npm

Npm scripts, [`package.json`](../package.json):

* `lint.common`: checks common style of "all" files.
* `lint.config`: checks eslint style of config files.
* `lint.main`: checks eslint style of main source files.
* `lint.flow`: checks eslint style of `js.flow` files.
* `lint.ts`: checks eslint style of `d.ts` files.
* `lint.test`: checks eslint style of test source files.
* `transpile.flow`: checks Flow typings of source files.
* `transpile.ts`: checks Typescript typings of source files.
* `test.flow`: tests Reducer Provider components Flow typings (`tests/typings/flow`).
* `test.ts`: tests Reducer Provider components Typescript typings (`tests/typings/ts`).
* `test`: runs Jasmine/Karma tests for Reducer Provider components (`tests/js`).

Additionally:

* `npm run check`: will execute all tasks (`lint.common`, ..., `test.ts`, etc.).
* `npm run`: will list all available script/task for the project.

#### From Gradle

Run any scripts using `./gradlew npm_run_.name.`, where `.name.` is the name of the npm script, e.g.:

`lint.common` => `./gradlew npm_run_lint.common`

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
