// Copyright (c) 2020 Gonzalo Müller Bravo.
import type { ReactNode, Component, ComponentClass } from 'react'

// Provider Component
/////////////////////

type Id = string | number | symbol | null

declare interface ProviderProps {
  id?: Id
  children: ReactNode
}

declare interface StateProviderProps<STATE> extends ProviderProps {
  initialState?: STATE | (() => STATE)
}

// Reducer Component Definition
///////////////////////////////

declare interface ReducerProps<STATE, REDUCER> extends StateProviderProps<STATE> {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  reducer: REDUCER | null | undefined
}

declare interface SyncReducer<STATE, ARGS extends Array<any> = any[]> {
  (prevState: STATE, ...args: ARGS): STATE
}

declare interface SyncReducerProps<STATE, ARGS extends Array<any> = any[]> extends ReducerProps<STATE, SyncReducer<STATE, ARGS>> {}

declare class SyncReducerProvider<STATE, ARGS extends Array<any> = any[]> extends Component<SyncReducerProps<STATE, ARGS>> {}

declare interface AsyncReducer<STATE, ARGS extends Array<any> = any[]> {
  (prevState: STATE, ...args: ARGS): Promise<STATE>
}

declare interface AsyncReducerProps<STATE, ARGS extends Array<any> = any[]> extends ReducerProps<STATE, AsyncReducer<STATE, ARGS>> {}

declare class AsyncReducerProvider<STATE, ARGS extends Array<any> = any[]> extends Component<AsyncReducerProps<STATE, ARGS>> {}

// Mapper Component Definition
//////////////////////////////

declare interface MapperProps<STATE, MAPPER> extends StateProviderProps<STATE> {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  mapper: MAPPER | null | undefined
}

declare interface SyncMapper<STATE, ARGS extends Array<any> = any[]> {
  (...args: ARGS): STATE
}

declare interface SyncMapperProps<STATE, ARGS extends Array<any> = any[]> extends MapperProps<STATE, SyncMapper<STATE, ARGS>> {}

declare class SyncMapperProvider<STATE, ARGS extends Array<any> = any[]> extends Component<SyncMapperProps<STATE, ARGS>> {}

declare interface AsyncMapper<STATE, ARGS extends Array<any> = any[]> {
  (...args: ARGS): Promise<STATE>
}

declare interface AsyncMapperProps<STATE, ARGS extends Array<any> = any[]> extends MapperProps<STATE, AsyncMapper<STATE, ARGS>> {}

declare class AsyncMapperProvider<STATE, ARGS extends Array<any> = any[]> extends Component<AsyncMapperProps<STATE, ARGS>> {}

// Actuator Component Definition
////////////////////////////////

declare interface ActuatorProps<ACTUATOR extends Function = Function> extends ProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  actuator: ACTUATOR | null | undefined
}

declare class ActuatorProvider<ACTUATOR extends Function = Function> extends Component<ActuatorProps<ACTUATOR>> {}

// Providers Consumption
////////////////////////

type Sync<RESULT = any> = RESULT
type Async<RESULT = any> = Promise<RESULT>
type DispatcherResult<RESULT = any> = Async<void | RESULT> | Sync<void | RESULT>

declare interface Dispatcher<DISPATCH extends DispatcherResult = Sync<void>, ARGS extends Array<any> = any[]> {
  (...args: ARGS): DISPATCH
}

declare interface ProviderValueObject {
  /**
   * provider id
   */
  readonly provider: Id
}

declare interface StateProviderValueObject<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends ProviderValueObject {
  readonly state: STATE
  readonly dispatch: Dispatcher<DISPATCH, ARGS>
}
declare interface StateProviderValueTuple<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends Array<any> {
  /**
   * state
   */
  readonly 0: STATE
  /**
   * dispatcher
   */
  readonly 1: Dispatcher<DISPATCH, ARGS>
  /**
   * provider id
   */
  readonly 2: Id
}

declare interface StateProviderValue<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends StateProviderValueObject<STATE, DISPATCH, ARGS>, StateProviderValueTuple<STATE, DISPATCH, ARGS>{}

declare function useReducer<STATE, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<STATE>, ARGS extends Array<any> = any[]>(
  id?: Id
): StateProviderValue<STATE, DISPATCH, ARGS>

declare function useReducerState<STATE>(id?: Id): STATE

declare function useReducerDispatcher<DISPATCH extends Async | Sync = Sync<void>, ARGS extends Array<any> = any[]>(
  id?: Id
): Dispatcher<DISPATCH, ARGS>

declare interface ComponentProps extends Record<any, any> {}

// Actuator Consumption
///////////////////////

declare type ActuatorProviderValue<ACTUATOR extends Function = Function> = ACTUATOR & ProviderValueObject

declare function useActuator<ACTUATOR extends Function = Function> (
  id?: Id
): ActuatorProviderValue<ACTUATOR>

// HOC Consumption
//////////////////

declare function injectAny<PROPS extends ComponentProps, INJECTED_PROP extends keyof PROPS>(
  ComponentClass: ComponentClass<PROPS>, injectedPropName: INJECTED_PROP, id?: Id
): ComponentClass<Omit<PROPS, INJECTED_PROP>>

// Tagged Provider Component
////////////////////////////

declare interface TaggedProcessor<PROCESSOR extends Function = Function> {
  /**
   * Tag
   */
  0: Id
  /**
   * Reducer/Mapper/Actuator
   */
  1: PROCESSOR
}

declare interface StateTaggedProcessor<PROCESSOR extends Function = Function> extends TaggedProcessor<PROCESSOR> {
  /**
   * Initial state
   */
  2?: any
}

// Tagged Reducer Component Definition
//////////////////////////////////////

declare interface TaggedReducerProps<REDUCERS extends any[]> extends ProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  reducers: REDUCERS | null | undefined
}

declare interface SyncTaggedReducer extends StateTaggedProcessor<SyncReducer<any, any>> {}

declare interface SyncTaggedReducerProps<REDUCERS extends SyncTaggedReducer[] = SyncTaggedReducer[]> extends TaggedReducerProps<REDUCERS> {}

declare class SyncTaggedReducerProvider<REDUCERS extends SyncTaggedReducer[] = SyncTaggedReducer[]> extends Component<SyncTaggedReducerProps<REDUCERS>> {}

declare interface AsyncTaggedReducer extends StateTaggedProcessor<AsyncReducer<any, any>> {}

declare interface AsyncTaggedReducerProps<REDUCERS extends AsyncTaggedReducer[] = AsyncTaggedReducer[]> extends TaggedReducerProps<REDUCERS> {}

declare class AsyncTaggedReducerProvider<REDUCERS extends AsyncTaggedReducer[] = AsyncTaggedReducer[]> extends Component<AsyncTaggedReducerProps<REDUCERS>> {}

// Tagged Mapper Component Definition
//////////////////////////////////////

declare interface TaggedMapperProps<MAPPERS extends any[]> extends ProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  mappers: MAPPERS | null | undefined
}

declare interface SyncTaggedMapper extends StateTaggedProcessor<SyncMapper<any, any>> {}

declare interface SyncTaggedMapperProps<MAPPERS extends SyncTaggedMapper[] = SyncTaggedMapper[]> extends TaggedMapperProps<MAPPERS> {}

declare class SyncTaggedMapperProvider<MAPPERS extends SyncTaggedMapper[] = SyncTaggedMapper[]> extends Component<SyncTaggedMapperProps<MAPPERS>> {}

declare interface AsyncTaggedMapper extends StateTaggedProcessor<AsyncMapper<any, any>> {}

declare interface AsyncTaggedMapperProps<MAPPERS extends AsyncTaggedMapper[] = AsyncTaggedMapper[]> extends TaggedMapperProps<MAPPERS> {}

declare class AsyncTaggedMapperProvider<MAPPERS extends AsyncTaggedMapper[] = AsyncTaggedMapper[]> extends Component<AsyncTaggedMapperProps<MAPPERS>> {}

// Tagged Actuator Component Definition
///////////////////////////////////////

declare interface TaggedActuatorProps<ACTUATORS extends TaggedProcessor[] = TaggedProcessor[]> extends ProviderProps {
  /**
   * Must always be assigned, although can be 'null' or 'undefined'.
   */
  actuators: ACTUATORS | null | undefined
}

declare class TaggedActuatorProvider<ACTUATORS extends TaggedProcessor[] = TaggedProcessor[]> extends Component<TaggedActuatorProps<ACTUATORS>> {}

// Tagged Consumption
/////////////////////

declare interface StateTaggedProviderValueObject<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends StateProviderValueObject<STATE, DISPATCH, ARGS> {
  readonly tag: Id
}

declare interface StateTaggedProviderValueTuple<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends StateProviderValueTuple<STATE, DISPATCH, ARGS> {
  /**
   * tag
   */
  readonly 3: Id
}

declare interface StateTaggedProviderValue<
    STATE,
    DISPATCH extends DispatcherResult<STATE> = Sync<STATE>,
    ARGS extends Array<any> = any[]
  > extends StateTaggedProviderValueObject<STATE, DISPATCH, ARGS>, StateTaggedProviderValueTuple<STATE, DISPATCH, ARGS> {}

declare interface TaggedProviderGetter<
  ANY_RESULT extends StateTaggedProviderValue<any, any> | ActuatorProviderValue<Function> = any,
  ANY_ID extends Id = Id
> {
  readonly get: (tag: ANY_ID) => ANY_RESULT
}

declare function useTaggedAny<
    ANY_RESULT extends StateTaggedProviderValue<any, any> | ActuatorProviderValue<Function> = any,
    ANY_ID extends Id = Id
  >(
  id?: Id
): TaggedProviderGetter<ANY_RESULT, ANY_ID>

declare interface AnyAsyncDispatcher<ACTION = any, DISPATCH extends Async = Async<void>> {
  (value: ACTION, ...args: ReadonlyArray<any>): DISPATCH
}

declare function useTaggedReducer<STATE, DISPATCH extends Async<void | STATE> | Sync<void | STATE> = Sync<STATE>, ARGS extends Array<any> = any[]>(
  tag: Id, id?: Id
): StateTaggedProviderValue<STATE, DISPATCH, ARGS>

declare function useTaggedReducerState<STATE>(tag: Id, id?: Id): STATE

declare function useTaggedReducerDispatcher<DISPATCH extends Async | Sync = Sync<void>, ARGS extends Array<any> = any[]>(
  tag: Id, id?: Id
): Dispatcher<DISPATCH, ARGS>

// Tagged Actuator Consumption
///////////////////////

declare function useTaggedActuator<ACTUATOR extends Function = Function> (
  tag: Id, id?: Id
): ActuatorProviderValue<ACTUATOR>

// Tagged HOC Consumption
/////////////////////////

declare function injectTagged<PROPS extends ComponentProps, INJECTED_PROP extends keyof PROPS>(
  ComponentClass: ComponentClass<PROPS>, injectedPropName: INJECTED_PROP, tag: Id, id?: Id
): ComponentClass<Omit<PROPS, INJECTED_PROP>>

// Helpers
//////////

declare interface Action<TYPE, DATA = undefined> {
  type: TYPE
  data?: DATA
}

export {
  ProviderProps,
  StateProviderProps,
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
  ActuatorProps,
  ActuatorProvider,
  Sync,
  Async,
  DispatcherResult,
  Dispatcher,
  StateProviderValue,
  ActuatorProviderValue,
  useReducer,
  useReducerState,
  useReducerDispatcher,
  useReducer as useMapper,
  useReducerState as useMapperState,
  useReducerDispatcher as useMapperDispatcher,
  useActuator,
  injectAny as injectReducer,
  injectAny as injectReducerState,
  injectAny as injectReducerDispatcher,
  injectAny as injectMapper,
  injectAny as injectMapperState,
  injectAny as injectMapperDispatcher,
  injectAny as injectActuator,
  // Tagged
  /////////
  TaggedProcessor,
  StateTaggedProcessor,
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
  TaggedActuatorProps,
  TaggedActuatorProvider,
  TaggedProviderGetter,
  StateTaggedProviderValue,
  StateTaggedProviderValueObject,
  StateTaggedProviderValueTuple,
  useTaggedAny,
  useTaggedReducer,
  useTaggedReducerState,
  useTaggedReducerDispatcher,
  useTaggedReducer as useTaggedMapper,
  useTaggedReducerState as useTaggedMapperState,
  useTaggedReducerDispatcher as useTaggedMapperDispatcher,
  useTaggedActuator,
  injectAny as injectTaggedAny,
  injectTagged as injectTaggedReducer,
  injectTagged as injectTaggedReducerState,
  injectTagged as injectTaggedReducerDispatcher,
  injectTagged as injectTaggedMapper,
  injectTagged as injectTaggedMapperState,
  injectTagged as injectTaggedMapperDispatcher,
  injectTagged as injectTaggedActuator,
  // Helpers
  //////////
  AnyAsyncDispatcher,
  Action
}
