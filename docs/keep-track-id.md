# Use `id` the "right" way

Internally, `SyncReducerProvider`, `AsyncReducerProvider`, `SyncMapperProvider`, `AsyncMapperProvider`, `SyncTaggedReducerProvider`, `AsyncTaggedReducerProvider`, `SyncTaggedMapperProvider`, `AsyncTaggedMapperProvider`, `ActuatorProvider` and , `TaggedActuatorProvider` share the pool of names, numbers and symbols, i.e. when developing, use a different `id` for each provider that exists in the application.

* Developer must keep track of string and numbers to avoid overriding.
* `id` is used internally by a `Map`, so using numbers or symbols should be "faster" than strings.
  * Numbers are Excellent when using `const enum`.
* **Using symbols guarantees that there will be never be collisions**.
  * Perfect for custom libraries.
