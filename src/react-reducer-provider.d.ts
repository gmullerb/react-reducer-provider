// Copyright (c) 2020 Gonzalo Müller Bravo.
import type { ReactNode, Component, ComponentClass } from 'react'

// Provider Component
/////////////////////

type Id = string | number | symbol | null

declare interface ProviderProps<STATE> {
  id?: Id
  initialState?: STATE | (() => STATE)
  children: ReactNode
}

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> extends ProviderProps<STATE> {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  reducer: REDUCER | null | undefined
}

declare interface SyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION, ...args: ReadonlyArray<any>): STATE
}

declare interface SyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, SyncReducer<STATE, ACTION>> {}

declare class SyncReducerProvider<STATE, ACTION> extends Component<SyncReducerProps<STATE, ACTION>> {}

declare interface AsyncReducer<STATE, ACTION> {
  (prevState: STATE, action: ACTION, ...args: ReadonlyArray<any>): Promise<STATE>
}

declare interface AsyncReducerProps<STATE, ACTION> extends ReducerProps<STATE, AsyncReducer<STATE, ACTION>> {}

declare class AsyncReducerProvider<STATE, ACTION> extends Component<AsyncReducerProps<STATE, ACTION>> {}

// Mapper Component Definition
//////////////////////////////

declare interface MapperProps<STATE, MAPPER> extends ProviderProps<STATE> {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  mapper: MAPPER | null | undefined
}

declare interface SyncMapper<STATE, ACTION> {
  (action: ACTION, ...args: ReadonlyArray<any>): STATE
}

declare interface SyncMapperProps<STATE, ACTION> extends MapperProps<STATE, SyncMapper<STATE, ACTION>> {}

declare class SyncMapperProvider<STATE, ACTION> extends Component<SyncMapperProps<STATE, ACTION>> {}

declare interface AsyncMapper<STATE, ACTION> {
  (action: ACTION, ...args: ReadonlyArray<any>): Promise<STATE>
}

declare interface AsyncMapperProps<STATE, ACTION> extends MapperProps<STATE, AsyncMapper<STATE, ACTION>> {}

declare class AsyncMapperProvider<STATE, ACTION> extends Component<AsyncMapperProps<STATE, ACTION>> {}

// Providers Consumption
////////////////////////

type Sync<RESULT = any> = RESULT
type Async<RESULT = any> = Promise<RESULT>
type DispatcherResult<RESULT = any> = Async<void | RESULT> | Sync<void | RESULT>

declare interface Dispatcher<ACTION, DISPATCH extends DispatcherResult = Sync<void>> {
  (value: ACTION, ...args: ReadonlyArray<any>): DISPATCH
}

declare interface ProviderValueObject<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > {
  readonly state: STATE
  readonly dispatch: Dispatcher<ACTION, DISPATCH>
  /**
   * provider id
   */
  readonly provider: Id
}
declare interface ProviderValueTuple<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > extends Array<any> {
  /**
   * state
   */
  readonly 0: STATE
  /**
   * dispatcher
   */
  readonly 1: Dispatcher<ACTION, DISPATCH>
  /**
   * provider id
   */
  readonly 2: Id
}

declare interface ProviderValue<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > extends ProviderValueObject<STATE, ACTION, DISPATCH>, ProviderValueTuple<STATE, ACTION, DISPATCH>{}

declare function useReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  id?: Id
): ProviderValue<STATE, ACTION, DISPATCH>

declare function useReducerState<STATE>(id?: Id): STATE

declare function useReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>>(
  id?: Id
): Dispatcher<ACTION, DISPATCH>

declare interface ComponentProps extends Record<string, any> {}

declare function injectAny<INJECTED_PROP extends ComponentProps, PROPS extends ComponentProps = ComponentProps>(
  ComponentClass: ComponentClass<PROPS>, injectedPropName: keyof INJECTED_PROP, id?: Id
): ComponentClass<PROPS>

// Tagged Provider Component
////////////////////////////

declare interface TaggedProviderProps {
  id?: Id
  children: ReactNode
}

declare interface TaggedProcessor<PROCESSOR> {
  /**
   * Tag
   */
  0: Id
  /**
   * Reducer/Mapper
   */
  1: PROCESSOR
  /**
   * Initial state
   */
  2?: any
}

// Tagged Reducer Component Definition
//////////////////////////////////////

declare interface TaggedReducerProps<REDUCER> extends TaggedProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  reducers: REDUCER[] | null | undefined
}

declare interface SyncTaggedReducer extends TaggedProcessor<SyncReducer<any, any>> {}

declare interface SyncTaggedReducerProps extends TaggedReducerProps<SyncTaggedReducer> {}

declare class SyncTaggedReducerProvider extends Component<SyncTaggedReducerProps> {}

declare interface AsyncTaggedReducer extends TaggedProcessor<AsyncReducer<any, any>> {}

declare interface AsyncTaggedReducerProps extends TaggedReducerProps<AsyncTaggedReducer> {}

declare class AsyncTaggedReducerProvider extends Component<AsyncTaggedReducerProps> {}

// Tagged Mapper Component Definition
//////////////////////////////////////

declare interface TaggedMapperProps<MAPPER> extends TaggedProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  mappers: MAPPER[] | null | undefined
}

declare interface SyncTaggedMapper extends TaggedProcessor<SyncMapper<any, any>> {}

declare interface SyncTaggedMapperProps extends TaggedMapperProps<SyncTaggedMapper> {}

declare class SyncTaggedMapperProvider extends Component<SyncTaggedMapperProps> {}

declare interface AsyncTaggedMapper extends TaggedProcessor<AsyncMapper<any, any>> {}

declare interface AsyncTaggedMapperProps extends TaggedMapperProps<AsyncTaggedMapper> {}

declare class AsyncTaggedMapperProvider extends Component<AsyncTaggedMapperProps> {}

// Tagged Consumption
/////////////////////

declare interface TaggedProviderValueObject<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > extends ProviderValueObject<STATE, ACTION, DISPATCH> {
  readonly tag: Id
}

declare interface TaggedProviderValueTuple<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > extends ProviderValueTuple<STATE, ACTION, DISPATCH> {
  /**
   * tag
   */
  readonly 3: Id
}

declare interface TaggedProviderValue<
    STATE,
    ACTION,
    DISPATCH extends DispatcherResult<STATE> = Sync<void>
  > extends TaggedProviderValueObject<STATE, ACTION, DISPATCH>, TaggedProviderValueTuple<STATE, ACTION, DISPATCH> {}

declare interface AnyAsyncDispatcher<ACTION = any, DISPATCH extends Async = Async<void>> {
  (value: ACTION, ...args: ReadonlyArray<any>): DISPATCH
}

declare interface TaggedProviderGetter<
    ANY_ID extends Id = Id,
    ANY_STATE = any,
    ANY_ACTION = any,
    ANY_DISPATCH extends DispatcherResult<ANY_STATE> = Sync<void>
  > {
  readonly get: (tag: ANY_ID) => TaggedProviderValue<ANY_STATE, ANY_ACTION, ANY_DISPATCH>
}

declare function useTaggedAny<
    ANY_ID extends Id = Id,
    ANY_STATE = any,
    ANY_ACTION = any,
    ANY_DISPATCH extends DispatcherResult<ANY_STATE> = Sync<void>
  >(
  id?: Id
): TaggedProviderGetter<ANY_ID, ANY_STATE, ANY_ACTION, ANY_DISPATCH>

declare function useTaggedReducer<STATE, ACTION, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<void>>(
  tag: Id, id?: Id
): TaggedProviderValue<STATE, ACTION, DISPATCH>

declare function useTaggedReducerState<STATE>(tag: Id, id?: Id): STATE

declare function useTaggedReducerDispatcher<ACTION, DISPATCH extends Async | Sync = Sync<void>>(tag: Id, id?: Id): Dispatcher<ACTION, DISPATCH>

declare function injectTagged<INJECTED_PROP extends ComponentProps, PROPS extends ComponentProps = ComponentProps>(
  ComponentClass: ComponentClass<PROPS>, injectedPropName: keyof INJECTED_PROP, tag: Id, id?: Id
): ComponentClass<PROPS>

// Helpers
//////////

declare interface Action<TYPE, DATA = undefined> {
  type: TYPE
  data?: DATA
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
  DispatcherResult,
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
  TaggedProviderValue,
  TaggedProviderGetter,
  useTaggedAny,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher,
  useTaggedReducer as useTaggedMapper,
  useTaggedReducerState as useTaggedMapperState,
  useTaggedReducerDispatcher as useTaggedMapperDispatcher,
  injectAny as injectTaggedAny,
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
