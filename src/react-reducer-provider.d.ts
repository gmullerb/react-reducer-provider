// Copyright (c) 2020 Gonzalo Müller Bravo.
import {
  ReactElement,
  ReactNode
} from 'react'

// Provider Component
/////////////////////

type Id = string | number | symbol

declare interface ProviderProps<STATE> {
  id?: Id;
  initialState: STATE | (() => STATE);
  children: ReactNode;
}

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> extends ProviderProps<STATE> {
  reducer: REDUCER;
}

declare interface SyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION, ...args: ReadonlyArray<any>): STATE
}

declare interface SyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, SyncReducer<STATE, ACTION>> {}

declare function SyncReducerProvider<STATE, ACTION>(
  props: Readonly<SyncReducerProps<STATE, ACTION>>
): ReactElement<SyncReducerProps<STATE, ACTION>>

declare interface AsyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION, ...args: ReadonlyArray<any>): Promise<STATE>
}

declare interface AsyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, AsyncReducer<STATE, ACTION>> {}

declare function AsyncReducerProvider<STATE, ACTION>(
  props: Readonly<AsyncReducerProps<STATE, ACTION>>
): ReactElement<AsyncReducerProps<STATE, ACTION>>

// Mapper Component Definition
//////////////////////////////

declare interface MapperProps<STATE, MAPPER> extends ProviderProps<STATE> {
  mapper: MAPPER
}

declare interface SyncMapper<STATE, ACTION> {
  (action: ACTION, ...args: ReadonlyArray<any>): STATE
}

declare interface SyncMapperProps<STATE, ACTION> extends MapperProps<STATE, SyncMapper<STATE, ACTION>> {}

declare function SyncMapperProvider<STATE, ACTION>(
  props: Readonly<SyncMapperProps<STATE, ACTION>>
): ReactElement<SyncMapperProps<STATE, ACTION>>

declare interface AsyncMapper<STATE, ACTION> {
  (action: ACTION, ...args: ReadonlyArray<any>): Promise<STATE>
}

declare interface AsyncMapperProps<STATE, ACTION> extends MapperProps<STATE, AsyncMapper<STATE, ACTION>> {}

declare function AsyncMapperProvider<STATE, ACTION>(
  props: Readonly<AsyncMapperProps<STATE, ACTION>>
): ReactElement<AsyncMapperProps<STATE, ACTION>>

// Providers Consumption
////////////////////////

type Sync<T = any> = T
type Async<T = any> = Promise<T>

declare interface Dispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>> {
  (value: ACTION, ...args: ReadonlyArray<any>): DISPATCH
}

declare interface ProviderValue<
    STATE,
    ACTION,
    DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>
  > extends Array<any> {
  readonly 0: STATE;
  readonly 1: Dispatcher<ACTION, DISPATCH>;
}

declare function useReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  id?: Id
): ProviderValue<STATE, ACTION, DISPATCH>

declare function useReducerState<STATE>(id?: Id): STATE

declare function useReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>>(
  id?: Id
): Dispatcher<ACTION, DISPATCH>

declare function injectAny<INJECTED_PROP extends object, PROPS extends object = object>(
  ComponentClass: React.ComponentClass<PROPS>, injectedPropName: keyof INJECTED_PROP, id?: Id
): React.ComponentClass<PROPS>

// Tagged Provider Component
////////////////////////////

declare interface TaggedProviderProps {
  id?: Id;
  children: ReactNode;
}

declare interface TaggedProcessor<PROCESSOR> {
  /**
   * Tag
   */
  0: Id;
  /**
   * Reducer/Mapper
   */
  1: PROCESSOR;
  /**
   * Initial state
   */
  2: any;
}

// Tagged Reducer Component Definition
//////////////////////////////////////

declare interface TaggedReducerProps<REDUCER> extends TaggedProviderProps {
  reducers: REDUCER[];
}

declare interface SyncTaggedReducer extends TaggedProcessor<SyncReducer<any, any>> {}

declare interface SyncTaggedReducerProps extends TaggedReducerProps<SyncTaggedReducer> {}

declare function SyncTaggedReducerProvider(props: Readonly<SyncTaggedReducerProps>): ReactElement<SyncTaggedReducerProps>

declare interface AsyncTaggedReducer extends TaggedProcessor<AsyncReducer<any, any>> {}

declare interface AsyncTaggedReducerProps extends TaggedReducerProps<AsyncTaggedReducer> {}

declare function AsyncTaggedReducerProvider(props: Readonly<AsyncTaggedReducerProps>): ReactElement<AsyncTaggedReducerProps>

// Tagged Mapper Component Definition
//////////////////////////////////////

declare interface TaggedMapperProps<MAPPER> extends TaggedProviderProps {
  mappers: MAPPER[];
}

declare interface SyncTaggedMapper extends TaggedProcessor<SyncMapper<any, any>> {}

declare interface SyncTaggedMapperProps extends TaggedMapperProps<SyncTaggedMapper> {}

declare function SyncTaggedMapperProvider(props: Readonly<SyncTaggedMapperProps>): ReactElement<SyncTaggedMapperProps>

declare interface AsyncTaggedMapper extends TaggedProcessor<AsyncMapper<any, any>> {}

declare interface AsyncTaggedMapperProps extends TaggedMapperProps<AsyncTaggedMapper> {}

declare function AsyncTaggedMapperProvider(props: Readonly<AsyncTaggedMapperProps>): ReactElement<AsyncTaggedMapperProps>

// Tagged Consumption
/////////////////////

declare interface TaggedStates<ANY_ID extends Id, ANY_STATE> extends Map<ANY_ID, ANY_STATE> {}

declare interface TaggedDispatchers<
    ANY_ID extends Id,
    ANY_DISPATCHER extends Dispatcher<any, any> = Dispatcher<any, any>
> extends Map<ANY_ID, ANY_DISPATCHER> {}

declare interface TaggedProviderValue<
    ANY_ID extends Id,
    ANY_STATE,
    ANY_DISPATCHER extends Dispatcher<any, any> = Dispatcher<any, any>
  > extends Array<any> {
  readonly 0: TaggedStates<ANY_ID, ANY_STATE>;
  readonly 1: TaggedDispatchers<ANY_ID, ANY_DISPATCHER>;
}

declare interface AnyAsyncDispatcher<ACTION = any, DISPATCH extends Async = Async<void>> {
  (value: ACTION, ...args: ReadonlyArray<any>): DISPATCH
}

declare function useTaggedAny<ANY_ID extends Id, ANY_STATE, ANY_DISPATCHER extends Dispatcher<any, any> = Dispatcher<any, any>>(
  id?: Id
): TaggedProviderValue<ANY_ID, ANY_STATE, ANY_DISPATCHER>

declare function useTaggedAnyState<ANY_ID extends Id, ANY_STATE>(id?: Id): TaggedStates<ANY_ID, ANY_STATE>

declare function useTaggedAnyDispatcher<
    ANY_ID extends Id,
    ANY_DISPATCHER extends Dispatcher<any, any> = Dispatcher<any, any>
>(id?: Id): TaggedDispatchers<ANY_ID, ANY_DISPATCHER>

declare function useTaggedReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  tag: Id, id?: Id
): ProviderValue<STATE, ACTION, DISPATCH>

declare function useTaggedReducerState<STATE>(tag: Id, id?: Id): STATE

declare function useTaggedReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>>(tag: Id, id?: Id): Dispatcher<ACTION, DISPATCH>

declare function injectTagged<INJECTED_PROP extends object, PROPS extends object = object>(
  ComponentClass: React.ComponentClass<PROPS>, injectedPropName: keyof INJECTED_PROP, tag: Id, id?: Id
): React.ComponentClass<PROPS>

// Helpers
//////////

declare interface Action<TYPE, DATA = undefined> {
  type: TYPE;
  data?: DATA;
}

export {
  SyncReducer,
  SyncReducerProps,
  SyncReducerProvider,
  AsyncReducer,
  AsyncReducerProps,
  AsyncReducerProvider,
  SyncMapper,
  SyncMapperProps,
  SyncMapperProvider,
  AsyncMapper,
  AsyncMapperProps,
  AsyncMapperProvider,
  Sync,
  Async,
  Dispatcher,
  ProviderValue,
  useReducer,
  useReducerState,
  useReducerDispatcher,
  useReducer as useMapper,
  useReducerState as useMapperState,
  useReducerDispatcher as useMapperDispatcher,
  injectAny as injectReducer,
  injectAny as injectReducerState,
  injectAny as injectReducerDispatcher,
  injectAny as injectMapper,
  injectAny as injectMapperState,
  injectAny as injectMapperDispatcher,
  // Tagged
  /////////
  TaggedProviderProps,
  TaggedProcessor,
  TaggedReducerProps,
  SyncTaggedReducer,
  SyncTaggedReducerProps,
  SyncTaggedReducerProvider,
  AsyncTaggedReducer,
  AsyncTaggedReducerProps,
  AsyncTaggedReducerProvider,
  TaggedMapperProps,
  SyncTaggedMapper,
  SyncTaggedMapperProps,
  SyncTaggedMapperProvider,
  AsyncTaggedMapper,
  AsyncTaggedMapperProps,
  AsyncTaggedMapperProvider,
  TaggedStates,
  TaggedDispatchers,
  TaggedProviderValue,
  useTaggedAny,
  useTaggedAnyState,
  useTaggedAnyDispatcher,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher,
  useTaggedReducer as useTaggedMapper,
  useTaggedReducerState as useTaggedMapperState,
  useTaggedReducerDispatcher as useTaggedMapperDispatcher,
  injectAny as injectTaggedAny,
  injectAny as injectTaggedAnyState,
  injectAny as injectTaggedAnyDispatcher,
  injectTagged as injectTaggedReducer,
  injectTagged as injectTaggedReducerState,
  injectTagged as injectTaggedReducerDispatcher,
  injectTagged as injectTaggedMapper,
  injectTagged as injectTaggedMapperState,
  injectTagged as injectTaggedMapperDispatcher,
  // Helpers
  //////////
  AnyAsyncDispatcher,
  Action
}
