
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Scene
 * 
 */
export type Scene = $Result.DefaultSelection<Prisma.$ScenePayload>
/**
 * Model SceneVariation
 * 
 */
export type SceneVariation = $Result.DefaultSelection<Prisma.$SceneVariationPayload>
/**
 * Model SceneVideo
 * 
 */
export type SceneVideo = $Result.DefaultSelection<Prisma.$SceneVideoPayload>
/**
 * Model FinalProject
 * 
 */
export type FinalProject = $Result.DefaultSelection<Prisma.$FinalProjectPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthRole: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPORT: 'SUPPORT'
};

export type AuthRole = (typeof AuthRole)[keyof typeof AuthRole]


export const ProjectStatus: {
  DRAFT: 'DRAFT',
  ENRICHED: 'ENRICHED',
  SCENES_GENERATED: 'SCENES_GENERATED',
  PROMPTS_GENERATED: 'PROMPTS_GENERATED',
  VIDEOS_GENERATING: 'VIDEOS_GENERATING',
  COMPLETED: 'COMPLETED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const VideoStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type VideoStatus = (typeof VideoStatus)[keyof typeof VideoStatus]


export const VideoProvider: {
  VEO3: 'VEO3',
  RUNWAY: 'RUNWAY',
  PIKA: 'PIKA',
  STABILITY: 'STABILITY'
};

export type VideoProvider = (typeof VideoProvider)[keyof typeof VideoProvider]


export const DocumentType: {
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
  THUMBNAIL: 'THUMBNAIL'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]

}

export type AuthRole = $Enums.AuthRole

export const AuthRole: typeof $Enums.AuthRole

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type VideoStatus = $Enums.VideoStatus

export const VideoStatus: typeof $Enums.VideoStatus

export type VideoProvider = $Enums.VideoProvider

export const VideoProvider: typeof $Enums.VideoProvider

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scene`: Exposes CRUD operations for the **Scene** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scenes
    * const scenes = await prisma.scene.findMany()
    * ```
    */
  get scene(): Prisma.SceneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sceneVariation`: Exposes CRUD operations for the **SceneVariation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SceneVariations
    * const sceneVariations = await prisma.sceneVariation.findMany()
    * ```
    */
  get sceneVariation(): Prisma.SceneVariationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sceneVideo`: Exposes CRUD operations for the **SceneVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SceneVideos
    * const sceneVideos = await prisma.sceneVideo.findMany()
    * ```
    */
  get sceneVideo(): Prisma.SceneVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.finalProject`: Exposes CRUD operations for the **FinalProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinalProjects
    * const finalProjects = await prisma.finalProject.findMany()
    * ```
    */
  get finalProject(): Prisma.FinalProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Project: 'Project',
    Scene: 'Scene',
    SceneVariation: 'SceneVariation',
    SceneVideo: 'SceneVideo',
    FinalProject: 'FinalProject',
    Document: 'Document'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "scene" | "sceneVariation" | "sceneVideo" | "finalProject" | "document"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Scene: {
        payload: Prisma.$ScenePayload<ExtArgs>
        fields: Prisma.SceneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findFirst: {
            args: Prisma.SceneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findMany: {
            args: Prisma.SceneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          create: {
            args: Prisma.SceneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          createMany: {
            args: Prisma.SceneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          delete: {
            args: Prisma.SceneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          update: {
            args: Prisma.SceneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          deleteMany: {
            args: Prisma.SceneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          upsert: {
            args: Prisma.SceneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          aggregate: {
            args: Prisma.SceneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScene>
          }
          groupBy: {
            args: Prisma.SceneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneCountArgs<ExtArgs>
            result: $Utils.Optional<SceneCountAggregateOutputType> | number
          }
        }
      }
      SceneVariation: {
        payload: Prisma.$SceneVariationPayload<ExtArgs>
        fields: Prisma.SceneVariationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneVariationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneVariationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          findFirst: {
            args: Prisma.SceneVariationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneVariationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          findMany: {
            args: Prisma.SceneVariationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>[]
          }
          create: {
            args: Prisma.SceneVariationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          createMany: {
            args: Prisma.SceneVariationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneVariationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>[]
          }
          delete: {
            args: Prisma.SceneVariationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          update: {
            args: Prisma.SceneVariationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          deleteMany: {
            args: Prisma.SceneVariationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneVariationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneVariationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>[]
          }
          upsert: {
            args: Prisma.SceneVariationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVariationPayload>
          }
          aggregate: {
            args: Prisma.SceneVariationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSceneVariation>
          }
          groupBy: {
            args: Prisma.SceneVariationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneVariationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneVariationCountArgs<ExtArgs>
            result: $Utils.Optional<SceneVariationCountAggregateOutputType> | number
          }
        }
      }
      SceneVideo: {
        payload: Prisma.$SceneVideoPayload<ExtArgs>
        fields: Prisma.SceneVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          findFirst: {
            args: Prisma.SceneVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          findMany: {
            args: Prisma.SceneVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>[]
          }
          create: {
            args: Prisma.SceneVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          createMany: {
            args: Prisma.SceneVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>[]
          }
          delete: {
            args: Prisma.SceneVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          update: {
            args: Prisma.SceneVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          deleteMany: {
            args: Prisma.SceneVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>[]
          }
          upsert: {
            args: Prisma.SceneVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SceneVideoPayload>
          }
          aggregate: {
            args: Prisma.SceneVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSceneVideo>
          }
          groupBy: {
            args: Prisma.SceneVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneVideoCountArgs<ExtArgs>
            result: $Utils.Optional<SceneVideoCountAggregateOutputType> | number
          }
        }
      }
      FinalProject: {
        payload: Prisma.$FinalProjectPayload<ExtArgs>
        fields: Prisma.FinalProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinalProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinalProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          findFirst: {
            args: Prisma.FinalProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinalProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          findMany: {
            args: Prisma.FinalProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>[]
          }
          create: {
            args: Prisma.FinalProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          createMany: {
            args: Prisma.FinalProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinalProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>[]
          }
          delete: {
            args: Prisma.FinalProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          update: {
            args: Prisma.FinalProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          deleteMany: {
            args: Prisma.FinalProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinalProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinalProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>[]
          }
          upsert: {
            args: Prisma.FinalProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinalProjectPayload>
          }
          aggregate: {
            args: Prisma.FinalProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinalProject>
          }
          groupBy: {
            args: Prisma.FinalProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinalProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinalProjectCountArgs<ExtArgs>
            result: $Utils.Optional<FinalProjectCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    scene?: SceneOmit
    sceneVariation?: SceneVariationOmit
    sceneVideo?: SceneVideoOmit
    finalProject?: FinalProjectOmit
    document?: DocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
    scenes: number
    scene_variations: number
    scene_videos: number
    final_projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    scenes?: boolean | UserCountOutputTypeCountScenesArgs
    scene_variations?: boolean | UserCountOutputTypeCountScene_variationsArgs
    scene_videos?: boolean | UserCountOutputTypeCountScene_videosArgs
    final_projects?: boolean | UserCountOutputTypeCountFinal_projectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScene_variationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVariationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVideoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFinal_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinalProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    scenes: number
    final_projects: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scenes?: boolean | ProjectCountOutputTypeCountScenesArgs
    final_projects?: boolean | ProjectCountOutputTypeCountFinal_projectsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountScenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountFinal_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinalProjectWhereInput
  }


  /**
   * Count Type SceneCountOutputType
   */

  export type SceneCountOutputType = {
    scene_variations: number
    scene_videos: number
  }

  export type SceneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene_variations?: boolean | SceneCountOutputTypeCountScene_variationsArgs
    scene_videos?: boolean | SceneCountOutputTypeCountScene_videosArgs
  }

  // Custom InputTypes
  /**
   * SceneCountOutputType without action
   */
  export type SceneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneCountOutputType
     */
    select?: SceneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SceneCountOutputType without action
   */
  export type SceneCountOutputTypeCountScene_variationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVariationWhereInput
  }

  /**
   * SceneCountOutputType without action
   */
  export type SceneCountOutputTypeCountScene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVideoWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    scene_videos: number
    prompt_images: number
    final_project_videos: number
    final_project_thumbnails: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene_videos?: boolean | DocumentCountOutputTypeCountScene_videosArgs
    prompt_images?: boolean | DocumentCountOutputTypeCountPrompt_imagesArgs
    final_project_videos?: boolean | DocumentCountOutputTypeCountFinal_project_videosArgs
    final_project_thumbnails?: boolean | DocumentCountOutputTypeCountFinal_project_thumbnailsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountScene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVideoWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountPrompt_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVariationWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountFinal_project_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinalProjectWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountFinal_project_thumbnailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinalProjectWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    email: string | null
    phone: string | null
    full_name: string | null
    password: string | null
    role: $Enums.AuthRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    email: string | null
    phone: string | null
    full_name: string | null
    password: string | null
    role: $Enums.AuthRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    uuid: number
    email: number
    phone: number
    full_name: number
    password: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    full_name?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    full_name?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    full_name?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    uuid: string
    email: string
    phone: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    full_name?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    scenes?: boolean | User$scenesArgs<ExtArgs>
    scene_variations?: boolean | User$scene_variationsArgs<ExtArgs>
    scene_videos?: boolean | User$scene_videosArgs<ExtArgs>
    final_projects?: boolean | User$final_projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    full_name?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    full_name?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    full_name?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "email" | "phone" | "full_name" | "password" | "role" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    scenes?: boolean | User$scenesArgs<ExtArgs>
    scene_variations?: boolean | User$scene_variationsArgs<ExtArgs>
    scene_videos?: boolean | User$scene_videosArgs<ExtArgs>
    final_projects?: boolean | User$final_projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      scenes: Prisma.$ScenePayload<ExtArgs>[]
      scene_variations: Prisma.$SceneVariationPayload<ExtArgs>[]
      scene_videos: Prisma.$SceneVideoPayload<ExtArgs>[]
      final_projects: Prisma.$FinalProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      email: string
      phone: string | null
      full_name: string
      password: string
      role: $Enums.AuthRole
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scenes<T extends User$scenesArgs<ExtArgs> = {}>(args?: Subset<T, User$scenesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scene_variations<T extends User$scene_variationsArgs<ExtArgs> = {}>(args?: Subset<T, User$scene_variationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scene_videos<T extends User$scene_videosArgs<ExtArgs> = {}>(args?: Subset<T, User$scene_videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    final_projects<T extends User$final_projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$final_projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly uuid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly full_name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'AuthRole'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.scenes
   */
  export type User$scenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    cursor?: SceneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * User.scene_variations
   */
  export type User$scene_variationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    where?: SceneVariationWhereInput
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    cursor?: SceneVariationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * User.scene_videos
   */
  export type User$scene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    where?: SceneVideoWhereInput
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    cursor?: SceneVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * User.final_projects
   */
  export type User$final_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    where?: FinalProjectWhereInput
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    cursor?: FinalProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    title: string | null
    original_concept: string | null
    enriched_concept: string | null
    status: $Enums.ProjectStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    title: string | null
    original_concept: string | null
    enriched_concept: string | null
    status: $Enums.ProjectStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    title: number
    original_concept: number
    enriched_concept: number
    genres: number
    tones: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    title?: true
    original_concept?: true
    enriched_concept?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    title?: true
    original_concept?: true
    enriched_concept?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    title?: true
    original_concept?: true
    enriched_concept?: true
    genres?: true
    tones?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    title: string
    original_concept: string
    enriched_concept: string | null
    genres: JsonValue | null
    tones: JsonValue | null
    status: $Enums.ProjectStatus
    created_at: Date
    updated_at: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    title?: boolean
    original_concept?: boolean
    enriched_concept?: boolean
    genres?: boolean
    tones?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scenes?: boolean | Project$scenesArgs<ExtArgs>
    final_projects?: boolean | Project$final_projectsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    title?: boolean
    original_concept?: boolean
    enriched_concept?: boolean
    genres?: boolean
    tones?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    title?: boolean
    original_concept?: boolean
    enriched_concept?: boolean
    genres?: boolean
    tones?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    title?: boolean
    original_concept?: boolean
    enriched_concept?: boolean
    genres?: boolean
    tones?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "title" | "original_concept" | "enriched_concept" | "genres" | "tones" | "status" | "created_at" | "updated_at", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scenes?: boolean | Project$scenesArgs<ExtArgs>
    final_projects?: boolean | Project$final_projectsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      scenes: Prisma.$ScenePayload<ExtArgs>[]
      final_projects: Prisma.$FinalProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      title: string
      original_concept: string
      enriched_concept: string | null
      genres: Prisma.JsonValue | null
      tones: Prisma.JsonValue | null
      status: $Enums.ProjectStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scenes<T extends Project$scenesArgs<ExtArgs> = {}>(args?: Subset<T, Project$scenesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    final_projects<T extends Project$final_projectsArgs<ExtArgs> = {}>(args?: Subset<T, Project$final_projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly uuid: FieldRef<"Project", 'String'>
    readonly user_uuid: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly original_concept: FieldRef<"Project", 'String'>
    readonly enriched_concept: FieldRef<"Project", 'String'>
    readonly genres: FieldRef<"Project", 'Json'>
    readonly tones: FieldRef<"Project", 'Json'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly created_at: FieldRef<"Project", 'DateTime'>
    readonly updated_at: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.scenes
   */
  export type Project$scenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    cursor?: SceneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Project.final_projects
   */
  export type Project$final_projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    where?: FinalProjectWhereInput
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    cursor?: FinalProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Scene
   */

  export type AggregateScene = {
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  export type SceneAvgAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type SceneSumAggregateOutputType = {
    id: number | null
    order: number | null
  }

  export type SceneMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    project_uuid: string | null
    title: string | null
    description: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    project_uuid: string | null
    title: string | null
    description: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    project_uuid: number
    title: number
    description: number
    order: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SceneAvgAggregateInputType = {
    id?: true
    order?: true
  }

  export type SceneSumAggregateInputType = {
    id?: true
    order?: true
  }

  export type SceneMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    description?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    description?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    description?: true
    order?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SceneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scene to aggregate.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scenes
    **/
    _count?: true | SceneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SceneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SceneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneMaxAggregateInputType
  }

  export type GetSceneAggregateType<T extends SceneAggregateArgs> = {
        [P in keyof T & keyof AggregateScene]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScene[P]>
      : GetScalarType<T[P], AggregateScene[P]>
  }




  export type SceneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithAggregationInput | SceneOrderByWithAggregationInput[]
    by: SceneScalarFieldEnum[] | SceneScalarFieldEnum
    having?: SceneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneCountAggregateInputType | true
    _avg?: SceneAvgAggregateInputType
    _sum?: SceneSumAggregateInputType
    _min?: SceneMinAggregateInputType
    _max?: SceneMaxAggregateInputType
  }

  export type SceneGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    project_uuid: string
    title: string
    description: string | null
    order: number
    created_at: Date
    updated_at: Date
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  type GetSceneGroupByPayload<T extends SceneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneGroupByOutputType[P]>
            : GetScalarType<T[P], SceneGroupByOutputType[P]>
        }
      >
    >


  export type SceneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    scene_variations?: boolean | Scene$scene_variationsArgs<ExtArgs>
    scene_videos?: boolean | Scene$scene_videosArgs<ExtArgs>
    _count?: boolean | SceneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    description?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SceneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "project_uuid" | "title" | "description" | "order" | "created_at" | "updated_at", ExtArgs["result"]["scene"]>
  export type SceneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    scene_variations?: boolean | Scene$scene_variationsArgs<ExtArgs>
    scene_videos?: boolean | Scene$scene_videosArgs<ExtArgs>
    _count?: boolean | SceneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SceneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SceneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ScenePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scene"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      scene_variations: Prisma.$SceneVariationPayload<ExtArgs>[]
      scene_videos: Prisma.$SceneVideoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      project_uuid: string
      title: string
      description: string | null
      order: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["scene"]>
    composites: {}
  }

  type SceneGetPayload<S extends boolean | null | undefined | SceneDefaultArgs> = $Result.GetResult<Prisma.$ScenePayload, S>

  type SceneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneCountAggregateInputType | true
    }

  export interface SceneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scene'], meta: { name: 'Scene' } }
    /**
     * Find zero or one Scene that matches the filter.
     * @param {SceneFindUniqueArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneFindUniqueArgs>(args: SelectSubset<T, SceneFindUniqueArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Scene that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneFindUniqueOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneFindFirstArgs>(args?: SelectSubset<T, SceneFindFirstArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scenes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scenes
     * const scenes = await prisma.scene.findMany()
     * 
     * // Get first 10 Scenes
     * const scenes = await prisma.scene.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneWithIdOnly = await prisma.scene.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneFindManyArgs>(args?: SelectSubset<T, SceneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Scene.
     * @param {SceneCreateArgs} args - Arguments to create a Scene.
     * @example
     * // Create one Scene
     * const Scene = await prisma.scene.create({
     *   data: {
     *     // ... data to create a Scene
     *   }
     * })
     * 
     */
    create<T extends SceneCreateArgs>(args: SelectSubset<T, SceneCreateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scenes.
     * @param {SceneCreateManyArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneCreateManyArgs>(args?: SelectSubset<T, SceneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scenes and returns the data saved in the database.
     * @param {SceneCreateManyAndReturnArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Scene.
     * @param {SceneDeleteArgs} args - Arguments to delete one Scene.
     * @example
     * // Delete one Scene
     * const Scene = await prisma.scene.delete({
     *   where: {
     *     // ... filter to delete one Scene
     *   }
     * })
     * 
     */
    delete<T extends SceneDeleteArgs>(args: SelectSubset<T, SceneDeleteArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Scene.
     * @param {SceneUpdateArgs} args - Arguments to update one Scene.
     * @example
     * // Update one Scene
     * const scene = await prisma.scene.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneUpdateArgs>(args: SelectSubset<T, SceneUpdateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scenes.
     * @param {SceneDeleteManyArgs} args - Arguments to filter Scenes to delete.
     * @example
     * // Delete a few Scenes
     * const { count } = await prisma.scene.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneDeleteManyArgs>(args?: SelectSubset<T, SceneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneUpdateManyArgs>(args: SelectSubset<T, SceneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes and returns the data updated in the database.
     * @param {SceneUpdateManyAndReturnArgs} args - Arguments to update many Scenes.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SceneUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Scene.
     * @param {SceneUpsertArgs} args - Arguments to update or create a Scene.
     * @example
     * // Update or create a Scene
     * const scene = await prisma.scene.upsert({
     *   create: {
     *     // ... data to create a Scene
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scene we want to update
     *   }
     * })
     */
    upsert<T extends SceneUpsertArgs>(args: SelectSubset<T, SceneUpsertArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneCountArgs} args - Arguments to filter Scenes to count.
     * @example
     * // Count the number of Scenes
     * const count = await prisma.scene.count({
     *   where: {
     *     // ... the filter for the Scenes we want to count
     *   }
     * })
    **/
    count<T extends SceneCountArgs>(
      args?: Subset<T, SceneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SceneAggregateArgs>(args: Subset<T, SceneAggregateArgs>): Prisma.PrismaPromise<GetSceneAggregateType<T>>

    /**
     * Group by Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SceneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneGroupByArgs['orderBy'] }
        : { orderBy?: SceneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SceneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scene model
   */
  readonly fields: SceneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scene.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scene_variations<T extends Scene$scene_variationsArgs<ExtArgs> = {}>(args?: Subset<T, Scene$scene_variationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scene_videos<T extends Scene$scene_videosArgs<ExtArgs> = {}>(args?: Subset<T, Scene$scene_videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scene model
   */
  interface SceneFieldRefs {
    readonly id: FieldRef<"Scene", 'Int'>
    readonly uuid: FieldRef<"Scene", 'String'>
    readonly user_uuid: FieldRef<"Scene", 'String'>
    readonly project_uuid: FieldRef<"Scene", 'String'>
    readonly title: FieldRef<"Scene", 'String'>
    readonly description: FieldRef<"Scene", 'String'>
    readonly order: FieldRef<"Scene", 'Int'>
    readonly created_at: FieldRef<"Scene", 'DateTime'>
    readonly updated_at: FieldRef<"Scene", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Scene findUnique
   */
  export type SceneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findUniqueOrThrow
   */
  export type SceneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findFirst
   */
  export type SceneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findFirstOrThrow
   */
  export type SceneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findMany
   */
  export type SceneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scenes to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene create
   */
  export type SceneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to create a Scene.
     */
    data: XOR<SceneCreateInput, SceneUncheckedCreateInput>
  }

  /**
   * Scene createMany
   */
  export type SceneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scene createManyAndReturn
   */
  export type SceneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene update
   */
  export type SceneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to update a Scene.
     */
    data: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
    /**
     * Choose, which Scene to update.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene updateMany
   */
  export type SceneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
  }

  /**
   * Scene updateManyAndReturn
   */
  export type SceneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene upsert
   */
  export type SceneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The filter to search for the Scene to update in case it exists.
     */
    where: SceneWhereUniqueInput
    /**
     * In case the Scene found by the `where` argument doesn't exist, create a new Scene with this data.
     */
    create: XOR<SceneCreateInput, SceneUncheckedCreateInput>
    /**
     * In case the Scene was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
  }

  /**
   * Scene delete
   */
  export type SceneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter which Scene to delete.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene deleteMany
   */
  export type SceneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scenes to delete
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to delete.
     */
    limit?: number
  }

  /**
   * Scene.scene_variations
   */
  export type Scene$scene_variationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    where?: SceneVariationWhereInput
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    cursor?: SceneVariationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * Scene.scene_videos
   */
  export type Scene$scene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    where?: SceneVideoWhereInput
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    cursor?: SceneVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * Scene without action
   */
  export type SceneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
  }


  /**
   * Model SceneVariation
   */

  export type AggregateSceneVariation = {
    _count: SceneVariationCountAggregateOutputType | null
    _avg: SceneVariationAvgAggregateOutputType | null
    _sum: SceneVariationSumAggregateOutputType | null
    _min: SceneVariationMinAggregateOutputType | null
    _max: SceneVariationMaxAggregateOutputType | null
  }

  export type SceneVariationAvgAggregateOutputType = {
    id: number | null
    fps: number | null
    duration_sec: number | null
    seed: number | null
    creativity: number | null
    motion_strength: number | null
    guidance_scale: number | null
  }

  export type SceneVariationSumAggregateOutputType = {
    id: number | null
    fps: number | null
    duration_sec: number | null
    seed: number | null
    creativity: number | null
    motion_strength: number | null
    guidance_scale: number | null
  }

  export type SceneVariationMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    scene_uuid: string | null
    title: string | null
    prompt_text: string | null
    negative_prompt: string | null
    prompt_image_uuid: string | null
    selected: boolean | null
    style: string | null
    tone: string | null
    genre: string | null
    camera_style: string | null
    shot_type: string | null
    camera_movement: string | null
    lens_type: string | null
    depth_of_field: string | null
    lighting: string | null
    color_grade: string | null
    time_of_day: string | null
    aspect_ratio: string | null
    resolution: string | null
    fps: number | null
    duration_sec: number | null
    ai_model: $Enums.VideoProvider | null
    seed: number | null
    creativity: number | null
    motion_strength: number | null
    guidance_scale: number | null
    audio_style: string | null
    include_sound: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneVariationMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    scene_uuid: string | null
    title: string | null
    prompt_text: string | null
    negative_prompt: string | null
    prompt_image_uuid: string | null
    selected: boolean | null
    style: string | null
    tone: string | null
    genre: string | null
    camera_style: string | null
    shot_type: string | null
    camera_movement: string | null
    lens_type: string | null
    depth_of_field: string | null
    lighting: string | null
    color_grade: string | null
    time_of_day: string | null
    aspect_ratio: string | null
    resolution: string | null
    fps: number | null
    duration_sec: number | null
    ai_model: $Enums.VideoProvider | null
    seed: number | null
    creativity: number | null
    motion_strength: number | null
    guidance_scale: number | null
    audio_style: string | null
    include_sound: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneVariationCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    scene_uuid: number
    title: number
    prompt_text: number
    negative_prompt: number
    prompt_image_uuid: number
    selected: number
    style: number
    tone: number
    genre: number
    camera_style: number
    shot_type: number
    camera_movement: number
    lens_type: number
    depth_of_field: number
    lighting: number
    color_grade: number
    time_of_day: number
    aspect_ratio: number
    resolution: number
    fps: number
    duration_sec: number
    ai_model: number
    seed: number
    creativity: number
    motion_strength: number
    guidance_scale: number
    audio_style: number
    include_sound: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SceneVariationAvgAggregateInputType = {
    id?: true
    fps?: true
    duration_sec?: true
    seed?: true
    creativity?: true
    motion_strength?: true
    guidance_scale?: true
  }

  export type SceneVariationSumAggregateInputType = {
    id?: true
    fps?: true
    duration_sec?: true
    seed?: true
    creativity?: true
    motion_strength?: true
    guidance_scale?: true
  }

  export type SceneVariationMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    title?: true
    prompt_text?: true
    negative_prompt?: true
    prompt_image_uuid?: true
    selected?: true
    style?: true
    tone?: true
    genre?: true
    camera_style?: true
    shot_type?: true
    camera_movement?: true
    lens_type?: true
    depth_of_field?: true
    lighting?: true
    color_grade?: true
    time_of_day?: true
    aspect_ratio?: true
    resolution?: true
    fps?: true
    duration_sec?: true
    ai_model?: true
    seed?: true
    creativity?: true
    motion_strength?: true
    guidance_scale?: true
    audio_style?: true
    include_sound?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneVariationMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    title?: true
    prompt_text?: true
    negative_prompt?: true
    prompt_image_uuid?: true
    selected?: true
    style?: true
    tone?: true
    genre?: true
    camera_style?: true
    shot_type?: true
    camera_movement?: true
    lens_type?: true
    depth_of_field?: true
    lighting?: true
    color_grade?: true
    time_of_day?: true
    aspect_ratio?: true
    resolution?: true
    fps?: true
    duration_sec?: true
    ai_model?: true
    seed?: true
    creativity?: true
    motion_strength?: true
    guidance_scale?: true
    audio_style?: true
    include_sound?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneVariationCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    title?: true
    prompt_text?: true
    negative_prompt?: true
    prompt_image_uuid?: true
    selected?: true
    style?: true
    tone?: true
    genre?: true
    camera_style?: true
    shot_type?: true
    camera_movement?: true
    lens_type?: true
    depth_of_field?: true
    lighting?: true
    color_grade?: true
    time_of_day?: true
    aspect_ratio?: true
    resolution?: true
    fps?: true
    duration_sec?: true
    ai_model?: true
    seed?: true
    creativity?: true
    motion_strength?: true
    guidance_scale?: true
    audio_style?: true
    include_sound?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SceneVariationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SceneVariation to aggregate.
     */
    where?: SceneVariationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVariations to fetch.
     */
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneVariationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SceneVariations
    **/
    _count?: true | SceneVariationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SceneVariationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SceneVariationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneVariationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneVariationMaxAggregateInputType
  }

  export type GetSceneVariationAggregateType<T extends SceneVariationAggregateArgs> = {
        [P in keyof T & keyof AggregateSceneVariation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSceneVariation[P]>
      : GetScalarType<T[P], AggregateSceneVariation[P]>
  }




  export type SceneVariationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVariationWhereInput
    orderBy?: SceneVariationOrderByWithAggregationInput | SceneVariationOrderByWithAggregationInput[]
    by: SceneVariationScalarFieldEnum[] | SceneVariationScalarFieldEnum
    having?: SceneVariationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneVariationCountAggregateInputType | true
    _avg?: SceneVariationAvgAggregateInputType
    _sum?: SceneVariationSumAggregateInputType
    _min?: SceneVariationMinAggregateInputType
    _max?: SceneVariationMaxAggregateInputType
  }

  export type SceneVariationGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text: string | null
    negative_prompt: string | null
    prompt_image_uuid: string | null
    selected: boolean
    style: string | null
    tone: string | null
    genre: string | null
    camera_style: string | null
    shot_type: string | null
    camera_movement: string | null
    lens_type: string | null
    depth_of_field: string | null
    lighting: string | null
    color_grade: string | null
    time_of_day: string | null
    aspect_ratio: string | null
    resolution: string | null
    fps: number | null
    duration_sec: number | null
    ai_model: $Enums.VideoProvider | null
    seed: number | null
    creativity: number | null
    motion_strength: number | null
    guidance_scale: number | null
    audio_style: string | null
    include_sound: boolean
    created_at: Date
    updated_at: Date
    _count: SceneVariationCountAggregateOutputType | null
    _avg: SceneVariationAvgAggregateOutputType | null
    _sum: SceneVariationSumAggregateOutputType | null
    _min: SceneVariationMinAggregateOutputType | null
    _max: SceneVariationMaxAggregateOutputType | null
  }

  type GetSceneVariationGroupByPayload<T extends SceneVariationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneVariationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneVariationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneVariationGroupByOutputType[P]>
            : GetScalarType<T[P], SceneVariationGroupByOutputType[P]>
        }
      >
    >


  export type SceneVariationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    title?: boolean
    prompt_text?: boolean
    negative_prompt?: boolean
    prompt_image_uuid?: boolean
    selected?: boolean
    style?: boolean
    tone?: boolean
    genre?: boolean
    camera_style?: boolean
    shot_type?: boolean
    camera_movement?: boolean
    lens_type?: boolean
    depth_of_field?: boolean
    lighting?: boolean
    color_grade?: boolean
    time_of_day?: boolean
    aspect_ratio?: boolean
    resolution?: boolean
    fps?: boolean
    duration_sec?: boolean
    ai_model?: boolean
    seed?: boolean
    creativity?: boolean
    motion_strength?: boolean
    guidance_scale?: boolean
    audio_style?: boolean
    include_sound?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
    scene_video?: boolean | SceneVariation$scene_videoArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVariation"]>

  export type SceneVariationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    title?: boolean
    prompt_text?: boolean
    negative_prompt?: boolean
    prompt_image_uuid?: boolean
    selected?: boolean
    style?: boolean
    tone?: boolean
    genre?: boolean
    camera_style?: boolean
    shot_type?: boolean
    camera_movement?: boolean
    lens_type?: boolean
    depth_of_field?: boolean
    lighting?: boolean
    color_grade?: boolean
    time_of_day?: boolean
    aspect_ratio?: boolean
    resolution?: boolean
    fps?: boolean
    duration_sec?: boolean
    ai_model?: boolean
    seed?: boolean
    creativity?: boolean
    motion_strength?: boolean
    guidance_scale?: boolean
    audio_style?: boolean
    include_sound?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVariation"]>

  export type SceneVariationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    title?: boolean
    prompt_text?: boolean
    negative_prompt?: boolean
    prompt_image_uuid?: boolean
    selected?: boolean
    style?: boolean
    tone?: boolean
    genre?: boolean
    camera_style?: boolean
    shot_type?: boolean
    camera_movement?: boolean
    lens_type?: boolean
    depth_of_field?: boolean
    lighting?: boolean
    color_grade?: boolean
    time_of_day?: boolean
    aspect_ratio?: boolean
    resolution?: boolean
    fps?: boolean
    duration_sec?: boolean
    ai_model?: boolean
    seed?: boolean
    creativity?: boolean
    motion_strength?: boolean
    guidance_scale?: boolean
    audio_style?: boolean
    include_sound?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVariation"]>

  export type SceneVariationSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    title?: boolean
    prompt_text?: boolean
    negative_prompt?: boolean
    prompt_image_uuid?: boolean
    selected?: boolean
    style?: boolean
    tone?: boolean
    genre?: boolean
    camera_style?: boolean
    shot_type?: boolean
    camera_movement?: boolean
    lens_type?: boolean
    depth_of_field?: boolean
    lighting?: boolean
    color_grade?: boolean
    time_of_day?: boolean
    aspect_ratio?: boolean
    resolution?: boolean
    fps?: boolean
    duration_sec?: boolean
    ai_model?: boolean
    seed?: boolean
    creativity?: boolean
    motion_strength?: boolean
    guidance_scale?: boolean
    audio_style?: boolean
    include_sound?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SceneVariationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "scene_uuid" | "title" | "prompt_text" | "negative_prompt" | "prompt_image_uuid" | "selected" | "style" | "tone" | "genre" | "camera_style" | "shot_type" | "camera_movement" | "lens_type" | "depth_of_field" | "lighting" | "color_grade" | "time_of_day" | "aspect_ratio" | "resolution" | "fps" | "duration_sec" | "ai_model" | "seed" | "creativity" | "motion_strength" | "guidance_scale" | "audio_style" | "include_sound" | "created_at" | "updated_at", ExtArgs["result"]["sceneVariation"]>
  export type SceneVariationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
    scene_video?: boolean | SceneVariation$scene_videoArgs<ExtArgs>
  }
  export type SceneVariationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
  }
  export type SceneVariationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    prompt_image?: boolean | SceneVariation$prompt_imageArgs<ExtArgs>
  }

  export type $SceneVariationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SceneVariation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      scene: Prisma.$ScenePayload<ExtArgs>
      prompt_image: Prisma.$DocumentPayload<ExtArgs> | null
      scene_video: Prisma.$SceneVideoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      scene_uuid: string
      title: string
      prompt_text: string | null
      negative_prompt: string | null
      prompt_image_uuid: string | null
      selected: boolean
      style: string | null
      tone: string | null
      genre: string | null
      camera_style: string | null
      shot_type: string | null
      camera_movement: string | null
      lens_type: string | null
      depth_of_field: string | null
      lighting: string | null
      color_grade: string | null
      time_of_day: string | null
      aspect_ratio: string | null
      resolution: string | null
      fps: number | null
      duration_sec: number | null
      ai_model: $Enums.VideoProvider | null
      seed: number | null
      creativity: number | null
      motion_strength: number | null
      guidance_scale: number | null
      audio_style: string | null
      include_sound: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["sceneVariation"]>
    composites: {}
  }

  type SceneVariationGetPayload<S extends boolean | null | undefined | SceneVariationDefaultArgs> = $Result.GetResult<Prisma.$SceneVariationPayload, S>

  type SceneVariationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneVariationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneVariationCountAggregateInputType | true
    }

  export interface SceneVariationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SceneVariation'], meta: { name: 'SceneVariation' } }
    /**
     * Find zero or one SceneVariation that matches the filter.
     * @param {SceneVariationFindUniqueArgs} args - Arguments to find a SceneVariation
     * @example
     * // Get one SceneVariation
     * const sceneVariation = await prisma.sceneVariation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneVariationFindUniqueArgs>(args: SelectSubset<T, SceneVariationFindUniqueArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SceneVariation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneVariationFindUniqueOrThrowArgs} args - Arguments to find a SceneVariation
     * @example
     * // Get one SceneVariation
     * const sceneVariation = await prisma.sceneVariation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneVariationFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneVariationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SceneVariation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationFindFirstArgs} args - Arguments to find a SceneVariation
     * @example
     * // Get one SceneVariation
     * const sceneVariation = await prisma.sceneVariation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneVariationFindFirstArgs>(args?: SelectSubset<T, SceneVariationFindFirstArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SceneVariation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationFindFirstOrThrowArgs} args - Arguments to find a SceneVariation
     * @example
     * // Get one SceneVariation
     * const sceneVariation = await prisma.sceneVariation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneVariationFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneVariationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SceneVariations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SceneVariations
     * const sceneVariations = await prisma.sceneVariation.findMany()
     * 
     * // Get first 10 SceneVariations
     * const sceneVariations = await prisma.sceneVariation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneVariationWithIdOnly = await prisma.sceneVariation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneVariationFindManyArgs>(args?: SelectSubset<T, SceneVariationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SceneVariation.
     * @param {SceneVariationCreateArgs} args - Arguments to create a SceneVariation.
     * @example
     * // Create one SceneVariation
     * const SceneVariation = await prisma.sceneVariation.create({
     *   data: {
     *     // ... data to create a SceneVariation
     *   }
     * })
     * 
     */
    create<T extends SceneVariationCreateArgs>(args: SelectSubset<T, SceneVariationCreateArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SceneVariations.
     * @param {SceneVariationCreateManyArgs} args - Arguments to create many SceneVariations.
     * @example
     * // Create many SceneVariations
     * const sceneVariation = await prisma.sceneVariation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneVariationCreateManyArgs>(args?: SelectSubset<T, SceneVariationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SceneVariations and returns the data saved in the database.
     * @param {SceneVariationCreateManyAndReturnArgs} args - Arguments to create many SceneVariations.
     * @example
     * // Create many SceneVariations
     * const sceneVariation = await prisma.sceneVariation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SceneVariations and only return the `id`
     * const sceneVariationWithIdOnly = await prisma.sceneVariation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneVariationCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneVariationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SceneVariation.
     * @param {SceneVariationDeleteArgs} args - Arguments to delete one SceneVariation.
     * @example
     * // Delete one SceneVariation
     * const SceneVariation = await prisma.sceneVariation.delete({
     *   where: {
     *     // ... filter to delete one SceneVariation
     *   }
     * })
     * 
     */
    delete<T extends SceneVariationDeleteArgs>(args: SelectSubset<T, SceneVariationDeleteArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SceneVariation.
     * @param {SceneVariationUpdateArgs} args - Arguments to update one SceneVariation.
     * @example
     * // Update one SceneVariation
     * const sceneVariation = await prisma.sceneVariation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneVariationUpdateArgs>(args: SelectSubset<T, SceneVariationUpdateArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SceneVariations.
     * @param {SceneVariationDeleteManyArgs} args - Arguments to filter SceneVariations to delete.
     * @example
     * // Delete a few SceneVariations
     * const { count } = await prisma.sceneVariation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneVariationDeleteManyArgs>(args?: SelectSubset<T, SceneVariationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SceneVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SceneVariations
     * const sceneVariation = await prisma.sceneVariation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneVariationUpdateManyArgs>(args: SelectSubset<T, SceneVariationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SceneVariations and returns the data updated in the database.
     * @param {SceneVariationUpdateManyAndReturnArgs} args - Arguments to update many SceneVariations.
     * @example
     * // Update many SceneVariations
     * const sceneVariation = await prisma.sceneVariation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SceneVariations and only return the `id`
     * const sceneVariationWithIdOnly = await prisma.sceneVariation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SceneVariationUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneVariationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SceneVariation.
     * @param {SceneVariationUpsertArgs} args - Arguments to update or create a SceneVariation.
     * @example
     * // Update or create a SceneVariation
     * const sceneVariation = await prisma.sceneVariation.upsert({
     *   create: {
     *     // ... data to create a SceneVariation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SceneVariation we want to update
     *   }
     * })
     */
    upsert<T extends SceneVariationUpsertArgs>(args: SelectSubset<T, SceneVariationUpsertArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SceneVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationCountArgs} args - Arguments to filter SceneVariations to count.
     * @example
     * // Count the number of SceneVariations
     * const count = await prisma.sceneVariation.count({
     *   where: {
     *     // ... the filter for the SceneVariations we want to count
     *   }
     * })
    **/
    count<T extends SceneVariationCountArgs>(
      args?: Subset<T, SceneVariationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneVariationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SceneVariation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SceneVariationAggregateArgs>(args: Subset<T, SceneVariationAggregateArgs>): Prisma.PrismaPromise<GetSceneVariationAggregateType<T>>

    /**
     * Group by SceneVariation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVariationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SceneVariationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneVariationGroupByArgs['orderBy'] }
        : { orderBy?: SceneVariationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SceneVariationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneVariationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SceneVariation model
   */
  readonly fields: SceneVariationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SceneVariation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneVariationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scene<T extends SceneDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SceneDefaultArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    prompt_image<T extends SceneVariation$prompt_imageArgs<ExtArgs> = {}>(args?: Subset<T, SceneVariation$prompt_imageArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    scene_video<T extends SceneVariation$scene_videoArgs<ExtArgs> = {}>(args?: Subset<T, SceneVariation$scene_videoArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SceneVariation model
   */
  interface SceneVariationFieldRefs {
    readonly id: FieldRef<"SceneVariation", 'Int'>
    readonly uuid: FieldRef<"SceneVariation", 'String'>
    readonly user_uuid: FieldRef<"SceneVariation", 'String'>
    readonly scene_uuid: FieldRef<"SceneVariation", 'String'>
    readonly title: FieldRef<"SceneVariation", 'String'>
    readonly prompt_text: FieldRef<"SceneVariation", 'String'>
    readonly negative_prompt: FieldRef<"SceneVariation", 'String'>
    readonly prompt_image_uuid: FieldRef<"SceneVariation", 'String'>
    readonly selected: FieldRef<"SceneVariation", 'Boolean'>
    readonly style: FieldRef<"SceneVariation", 'String'>
    readonly tone: FieldRef<"SceneVariation", 'String'>
    readonly genre: FieldRef<"SceneVariation", 'String'>
    readonly camera_style: FieldRef<"SceneVariation", 'String'>
    readonly shot_type: FieldRef<"SceneVariation", 'String'>
    readonly camera_movement: FieldRef<"SceneVariation", 'String'>
    readonly lens_type: FieldRef<"SceneVariation", 'String'>
    readonly depth_of_field: FieldRef<"SceneVariation", 'String'>
    readonly lighting: FieldRef<"SceneVariation", 'String'>
    readonly color_grade: FieldRef<"SceneVariation", 'String'>
    readonly time_of_day: FieldRef<"SceneVariation", 'String'>
    readonly aspect_ratio: FieldRef<"SceneVariation", 'String'>
    readonly resolution: FieldRef<"SceneVariation", 'String'>
    readonly fps: FieldRef<"SceneVariation", 'Int'>
    readonly duration_sec: FieldRef<"SceneVariation", 'Int'>
    readonly ai_model: FieldRef<"SceneVariation", 'VideoProvider'>
    readonly seed: FieldRef<"SceneVariation", 'Int'>
    readonly creativity: FieldRef<"SceneVariation", 'Float'>
    readonly motion_strength: FieldRef<"SceneVariation", 'Float'>
    readonly guidance_scale: FieldRef<"SceneVariation", 'Float'>
    readonly audio_style: FieldRef<"SceneVariation", 'String'>
    readonly include_sound: FieldRef<"SceneVariation", 'Boolean'>
    readonly created_at: FieldRef<"SceneVariation", 'DateTime'>
    readonly updated_at: FieldRef<"SceneVariation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SceneVariation findUnique
   */
  export type SceneVariationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter, which SceneVariation to fetch.
     */
    where: SceneVariationWhereUniqueInput
  }

  /**
   * SceneVariation findUniqueOrThrow
   */
  export type SceneVariationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter, which SceneVariation to fetch.
     */
    where: SceneVariationWhereUniqueInput
  }

  /**
   * SceneVariation findFirst
   */
  export type SceneVariationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter, which SceneVariation to fetch.
     */
    where?: SceneVariationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVariations to fetch.
     */
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SceneVariations.
     */
    cursor?: SceneVariationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SceneVariations.
     */
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * SceneVariation findFirstOrThrow
   */
  export type SceneVariationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter, which SceneVariation to fetch.
     */
    where?: SceneVariationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVariations to fetch.
     */
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SceneVariations.
     */
    cursor?: SceneVariationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SceneVariations.
     */
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * SceneVariation findMany
   */
  export type SceneVariationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter, which SceneVariations to fetch.
     */
    where?: SceneVariationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVariations to fetch.
     */
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SceneVariations.
     */
    cursor?: SceneVariationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVariations.
     */
    skip?: number
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * SceneVariation create
   */
  export type SceneVariationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * The data needed to create a SceneVariation.
     */
    data: XOR<SceneVariationCreateInput, SceneVariationUncheckedCreateInput>
  }

  /**
   * SceneVariation createMany
   */
  export type SceneVariationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SceneVariations.
     */
    data: SceneVariationCreateManyInput | SceneVariationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SceneVariation createManyAndReturn
   */
  export type SceneVariationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * The data used to create many SceneVariations.
     */
    data: SceneVariationCreateManyInput | SceneVariationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SceneVariation update
   */
  export type SceneVariationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * The data needed to update a SceneVariation.
     */
    data: XOR<SceneVariationUpdateInput, SceneVariationUncheckedUpdateInput>
    /**
     * Choose, which SceneVariation to update.
     */
    where: SceneVariationWhereUniqueInput
  }

  /**
   * SceneVariation updateMany
   */
  export type SceneVariationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SceneVariations.
     */
    data: XOR<SceneVariationUpdateManyMutationInput, SceneVariationUncheckedUpdateManyInput>
    /**
     * Filter which SceneVariations to update
     */
    where?: SceneVariationWhereInput
    /**
     * Limit how many SceneVariations to update.
     */
    limit?: number
  }

  /**
   * SceneVariation updateManyAndReturn
   */
  export type SceneVariationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * The data used to update SceneVariations.
     */
    data: XOR<SceneVariationUpdateManyMutationInput, SceneVariationUncheckedUpdateManyInput>
    /**
     * Filter which SceneVariations to update
     */
    where?: SceneVariationWhereInput
    /**
     * Limit how many SceneVariations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SceneVariation upsert
   */
  export type SceneVariationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * The filter to search for the SceneVariation to update in case it exists.
     */
    where: SceneVariationWhereUniqueInput
    /**
     * In case the SceneVariation found by the `where` argument doesn't exist, create a new SceneVariation with this data.
     */
    create: XOR<SceneVariationCreateInput, SceneVariationUncheckedCreateInput>
    /**
     * In case the SceneVariation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneVariationUpdateInput, SceneVariationUncheckedUpdateInput>
  }

  /**
   * SceneVariation delete
   */
  export type SceneVariationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    /**
     * Filter which SceneVariation to delete.
     */
    where: SceneVariationWhereUniqueInput
  }

  /**
   * SceneVariation deleteMany
   */
  export type SceneVariationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SceneVariations to delete
     */
    where?: SceneVariationWhereInput
    /**
     * Limit how many SceneVariations to delete.
     */
    limit?: number
  }

  /**
   * SceneVariation.prompt_image
   */
  export type SceneVariation$prompt_imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * SceneVariation.scene_video
   */
  export type SceneVariation$scene_videoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    where?: SceneVideoWhereInput
  }

  /**
   * SceneVariation without action
   */
  export type SceneVariationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
  }


  /**
   * Model SceneVideo
   */

  export type AggregateSceneVideo = {
    _count: SceneVideoCountAggregateOutputType | null
    _avg: SceneVideoAvgAggregateOutputType | null
    _sum: SceneVideoSumAggregateOutputType | null
    _min: SceneVideoMinAggregateOutputType | null
    _max: SceneVideoMaxAggregateOutputType | null
  }

  export type SceneVideoAvgAggregateOutputType = {
    id: number | null
  }

  export type SceneVideoSumAggregateOutputType = {
    id: number | null
  }

  export type SceneVideoMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    scene_uuid: string | null
    scene_variation_uuid: string | null
    provider_job_id: string | null
    video_uuid: string | null
    status: $Enums.VideoStatus | null
    error_message: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneVideoMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    scene_uuid: string | null
    scene_variation_uuid: string | null
    provider_job_id: string | null
    video_uuid: string | null
    status: $Enums.VideoStatus | null
    error_message: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SceneVideoCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    scene_uuid: number
    scene_variation_uuid: number
    provider_job_id: number
    video_uuid: number
    status: number
    error_message: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SceneVideoAvgAggregateInputType = {
    id?: true
  }

  export type SceneVideoSumAggregateInputType = {
    id?: true
  }

  export type SceneVideoMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    scene_variation_uuid?: true
    provider_job_id?: true
    video_uuid?: true
    status?: true
    error_message?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneVideoMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    scene_variation_uuid?: true
    provider_job_id?: true
    video_uuid?: true
    status?: true
    error_message?: true
    created_at?: true
    updated_at?: true
  }

  export type SceneVideoCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    scene_uuid?: true
    scene_variation_uuid?: true
    provider_job_id?: true
    video_uuid?: true
    status?: true
    error_message?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SceneVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SceneVideo to aggregate.
     */
    where?: SceneVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVideos to fetch.
     */
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SceneVideos
    **/
    _count?: true | SceneVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SceneVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SceneVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneVideoMaxAggregateInputType
  }

  export type GetSceneVideoAggregateType<T extends SceneVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateSceneVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSceneVideo[P]>
      : GetScalarType<T[P], AggregateSceneVideo[P]>
  }




  export type SceneVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneVideoWhereInput
    orderBy?: SceneVideoOrderByWithAggregationInput | SceneVideoOrderByWithAggregationInput[]
    by: SceneVideoScalarFieldEnum[] | SceneVideoScalarFieldEnum
    having?: SceneVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneVideoCountAggregateInputType | true
    _avg?: SceneVideoAvgAggregateInputType
    _sum?: SceneVideoSumAggregateInputType
    _min?: SceneVideoMinAggregateInputType
    _max?: SceneVideoMaxAggregateInputType
  }

  export type SceneVideoGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id: string | null
    video_uuid: string | null
    status: $Enums.VideoStatus
    error_message: string | null
    created_at: Date
    updated_at: Date
    _count: SceneVideoCountAggregateOutputType | null
    _avg: SceneVideoAvgAggregateOutputType | null
    _sum: SceneVideoSumAggregateOutputType | null
    _min: SceneVideoMinAggregateOutputType | null
    _max: SceneVideoMaxAggregateOutputType | null
  }

  type GetSceneVideoGroupByPayload<T extends SceneVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneVideoGroupByOutputType[P]>
            : GetScalarType<T[P], SceneVideoGroupByOutputType[P]>
        }
      >
    >


  export type SceneVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    scene_variation_uuid?: boolean
    provider_job_id?: boolean
    video_uuid?: boolean
    status?: boolean
    error_message?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVideo"]>

  export type SceneVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    scene_variation_uuid?: boolean
    provider_job_id?: boolean
    video_uuid?: boolean
    status?: boolean
    error_message?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVideo"]>

  export type SceneVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    scene_variation_uuid?: boolean
    provider_job_id?: boolean
    video_uuid?: boolean
    status?: boolean
    error_message?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }, ExtArgs["result"]["sceneVideo"]>

  export type SceneVideoSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    scene_uuid?: boolean
    scene_variation_uuid?: boolean
    provider_job_id?: boolean
    video_uuid?: boolean
    status?: boolean
    error_message?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SceneVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "scene_uuid" | "scene_variation_uuid" | "provider_job_id" | "video_uuid" | "status" | "error_message" | "created_at" | "updated_at", ExtArgs["result"]["sceneVideo"]>
  export type SceneVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }
  export type SceneVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }
  export type SceneVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scene?: boolean | SceneDefaultArgs<ExtArgs>
    scene_variation?: boolean | SceneVideo$scene_variationArgs<ExtArgs>
    video?: boolean | SceneVideo$videoArgs<ExtArgs>
  }

  export type $SceneVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SceneVideo"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      scene: Prisma.$ScenePayload<ExtArgs>
      scene_variation: Prisma.$SceneVariationPayload<ExtArgs> | null
      video: Prisma.$DocumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      scene_uuid: string
      scene_variation_uuid: string
      provider_job_id: string | null
      video_uuid: string | null
      status: $Enums.VideoStatus
      error_message: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["sceneVideo"]>
    composites: {}
  }

  type SceneVideoGetPayload<S extends boolean | null | undefined | SceneVideoDefaultArgs> = $Result.GetResult<Prisma.$SceneVideoPayload, S>

  type SceneVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneVideoCountAggregateInputType | true
    }

  export interface SceneVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SceneVideo'], meta: { name: 'SceneVideo' } }
    /**
     * Find zero or one SceneVideo that matches the filter.
     * @param {SceneVideoFindUniqueArgs} args - Arguments to find a SceneVideo
     * @example
     * // Get one SceneVideo
     * const sceneVideo = await prisma.sceneVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneVideoFindUniqueArgs>(args: SelectSubset<T, SceneVideoFindUniqueArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SceneVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneVideoFindUniqueOrThrowArgs} args - Arguments to find a SceneVideo
     * @example
     * // Get one SceneVideo
     * const sceneVideo = await prisma.sceneVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SceneVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoFindFirstArgs} args - Arguments to find a SceneVideo
     * @example
     * // Get one SceneVideo
     * const sceneVideo = await prisma.sceneVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneVideoFindFirstArgs>(args?: SelectSubset<T, SceneVideoFindFirstArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SceneVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoFindFirstOrThrowArgs} args - Arguments to find a SceneVideo
     * @example
     * // Get one SceneVideo
     * const sceneVideo = await prisma.sceneVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SceneVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SceneVideos
     * const sceneVideos = await prisma.sceneVideo.findMany()
     * 
     * // Get first 10 SceneVideos
     * const sceneVideos = await prisma.sceneVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneVideoWithIdOnly = await prisma.sceneVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneVideoFindManyArgs>(args?: SelectSubset<T, SceneVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SceneVideo.
     * @param {SceneVideoCreateArgs} args - Arguments to create a SceneVideo.
     * @example
     * // Create one SceneVideo
     * const SceneVideo = await prisma.sceneVideo.create({
     *   data: {
     *     // ... data to create a SceneVideo
     *   }
     * })
     * 
     */
    create<T extends SceneVideoCreateArgs>(args: SelectSubset<T, SceneVideoCreateArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SceneVideos.
     * @param {SceneVideoCreateManyArgs} args - Arguments to create many SceneVideos.
     * @example
     * // Create many SceneVideos
     * const sceneVideo = await prisma.sceneVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneVideoCreateManyArgs>(args?: SelectSubset<T, SceneVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SceneVideos and returns the data saved in the database.
     * @param {SceneVideoCreateManyAndReturnArgs} args - Arguments to create many SceneVideos.
     * @example
     * // Create many SceneVideos
     * const sceneVideo = await prisma.sceneVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SceneVideos and only return the `id`
     * const sceneVideoWithIdOnly = await prisma.sceneVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SceneVideo.
     * @param {SceneVideoDeleteArgs} args - Arguments to delete one SceneVideo.
     * @example
     * // Delete one SceneVideo
     * const SceneVideo = await prisma.sceneVideo.delete({
     *   where: {
     *     // ... filter to delete one SceneVideo
     *   }
     * })
     * 
     */
    delete<T extends SceneVideoDeleteArgs>(args: SelectSubset<T, SceneVideoDeleteArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SceneVideo.
     * @param {SceneVideoUpdateArgs} args - Arguments to update one SceneVideo.
     * @example
     * // Update one SceneVideo
     * const sceneVideo = await prisma.sceneVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneVideoUpdateArgs>(args: SelectSubset<T, SceneVideoUpdateArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SceneVideos.
     * @param {SceneVideoDeleteManyArgs} args - Arguments to filter SceneVideos to delete.
     * @example
     * // Delete a few SceneVideos
     * const { count } = await prisma.sceneVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneVideoDeleteManyArgs>(args?: SelectSubset<T, SceneVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SceneVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SceneVideos
     * const sceneVideo = await prisma.sceneVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneVideoUpdateManyArgs>(args: SelectSubset<T, SceneVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SceneVideos and returns the data updated in the database.
     * @param {SceneVideoUpdateManyAndReturnArgs} args - Arguments to update many SceneVideos.
     * @example
     * // Update many SceneVideos
     * const sceneVideo = await prisma.sceneVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SceneVideos and only return the `id`
     * const sceneVideoWithIdOnly = await prisma.sceneVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SceneVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SceneVideo.
     * @param {SceneVideoUpsertArgs} args - Arguments to update or create a SceneVideo.
     * @example
     * // Update or create a SceneVideo
     * const sceneVideo = await prisma.sceneVideo.upsert({
     *   create: {
     *     // ... data to create a SceneVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SceneVideo we want to update
     *   }
     * })
     */
    upsert<T extends SceneVideoUpsertArgs>(args: SelectSubset<T, SceneVideoUpsertArgs<ExtArgs>>): Prisma__SceneVideoClient<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SceneVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoCountArgs} args - Arguments to filter SceneVideos to count.
     * @example
     * // Count the number of SceneVideos
     * const count = await prisma.sceneVideo.count({
     *   where: {
     *     // ... the filter for the SceneVideos we want to count
     *   }
     * })
    **/
    count<T extends SceneVideoCountArgs>(
      args?: Subset<T, SceneVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SceneVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SceneVideoAggregateArgs>(args: Subset<T, SceneVideoAggregateArgs>): Prisma.PrismaPromise<GetSceneVideoAggregateType<T>>

    /**
     * Group by SceneVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneVideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SceneVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneVideoGroupByArgs['orderBy'] }
        : { orderBy?: SceneVideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SceneVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SceneVideo model
   */
  readonly fields: SceneVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SceneVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scene<T extends SceneDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SceneDefaultArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scene_variation<T extends SceneVideo$scene_variationArgs<ExtArgs> = {}>(args?: Subset<T, SceneVideo$scene_variationArgs<ExtArgs>>): Prisma__SceneVariationClient<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    video<T extends SceneVideo$videoArgs<ExtArgs> = {}>(args?: Subset<T, SceneVideo$videoArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SceneVideo model
   */
  interface SceneVideoFieldRefs {
    readonly id: FieldRef<"SceneVideo", 'Int'>
    readonly uuid: FieldRef<"SceneVideo", 'String'>
    readonly user_uuid: FieldRef<"SceneVideo", 'String'>
    readonly scene_uuid: FieldRef<"SceneVideo", 'String'>
    readonly scene_variation_uuid: FieldRef<"SceneVideo", 'String'>
    readonly provider_job_id: FieldRef<"SceneVideo", 'String'>
    readonly video_uuid: FieldRef<"SceneVideo", 'String'>
    readonly status: FieldRef<"SceneVideo", 'VideoStatus'>
    readonly error_message: FieldRef<"SceneVideo", 'String'>
    readonly created_at: FieldRef<"SceneVideo", 'DateTime'>
    readonly updated_at: FieldRef<"SceneVideo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SceneVideo findUnique
   */
  export type SceneVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter, which SceneVideo to fetch.
     */
    where: SceneVideoWhereUniqueInput
  }

  /**
   * SceneVideo findUniqueOrThrow
   */
  export type SceneVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter, which SceneVideo to fetch.
     */
    where: SceneVideoWhereUniqueInput
  }

  /**
   * SceneVideo findFirst
   */
  export type SceneVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter, which SceneVideo to fetch.
     */
    where?: SceneVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVideos to fetch.
     */
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SceneVideos.
     */
    cursor?: SceneVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SceneVideos.
     */
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * SceneVideo findFirstOrThrow
   */
  export type SceneVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter, which SceneVideo to fetch.
     */
    where?: SceneVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVideos to fetch.
     */
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SceneVideos.
     */
    cursor?: SceneVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SceneVideos.
     */
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * SceneVideo findMany
   */
  export type SceneVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter, which SceneVideos to fetch.
     */
    where?: SceneVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SceneVideos to fetch.
     */
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SceneVideos.
     */
    cursor?: SceneVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SceneVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SceneVideos.
     */
    skip?: number
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * SceneVideo create
   */
  export type SceneVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a SceneVideo.
     */
    data: XOR<SceneVideoCreateInput, SceneVideoUncheckedCreateInput>
  }

  /**
   * SceneVideo createMany
   */
  export type SceneVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SceneVideos.
     */
    data: SceneVideoCreateManyInput | SceneVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SceneVideo createManyAndReturn
   */
  export type SceneVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * The data used to create many SceneVideos.
     */
    data: SceneVideoCreateManyInput | SceneVideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SceneVideo update
   */
  export type SceneVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a SceneVideo.
     */
    data: XOR<SceneVideoUpdateInput, SceneVideoUncheckedUpdateInput>
    /**
     * Choose, which SceneVideo to update.
     */
    where: SceneVideoWhereUniqueInput
  }

  /**
   * SceneVideo updateMany
   */
  export type SceneVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SceneVideos.
     */
    data: XOR<SceneVideoUpdateManyMutationInput, SceneVideoUncheckedUpdateManyInput>
    /**
     * Filter which SceneVideos to update
     */
    where?: SceneVideoWhereInput
    /**
     * Limit how many SceneVideos to update.
     */
    limit?: number
  }

  /**
   * SceneVideo updateManyAndReturn
   */
  export type SceneVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * The data used to update SceneVideos.
     */
    data: XOR<SceneVideoUpdateManyMutationInput, SceneVideoUncheckedUpdateManyInput>
    /**
     * Filter which SceneVideos to update
     */
    where?: SceneVideoWhereInput
    /**
     * Limit how many SceneVideos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SceneVideo upsert
   */
  export type SceneVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the SceneVideo to update in case it exists.
     */
    where: SceneVideoWhereUniqueInput
    /**
     * In case the SceneVideo found by the `where` argument doesn't exist, create a new SceneVideo with this data.
     */
    create: XOR<SceneVideoCreateInput, SceneVideoUncheckedCreateInput>
    /**
     * In case the SceneVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneVideoUpdateInput, SceneVideoUncheckedUpdateInput>
  }

  /**
   * SceneVideo delete
   */
  export type SceneVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    /**
     * Filter which SceneVideo to delete.
     */
    where: SceneVideoWhereUniqueInput
  }

  /**
   * SceneVideo deleteMany
   */
  export type SceneVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SceneVideos to delete
     */
    where?: SceneVideoWhereInput
    /**
     * Limit how many SceneVideos to delete.
     */
    limit?: number
  }

  /**
   * SceneVideo.scene_variation
   */
  export type SceneVideo$scene_variationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    where?: SceneVariationWhereInput
  }

  /**
   * SceneVideo.video
   */
  export type SceneVideo$videoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * SceneVideo without action
   */
  export type SceneVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
  }


  /**
   * Model FinalProject
   */

  export type AggregateFinalProject = {
    _count: FinalProjectCountAggregateOutputType | null
    _avg: FinalProjectAvgAggregateOutputType | null
    _sum: FinalProjectSumAggregateOutputType | null
    _min: FinalProjectMinAggregateOutputType | null
    _max: FinalProjectMaxAggregateOutputType | null
  }

  export type FinalProjectAvgAggregateOutputType = {
    id: number | null
    duration_sec: number | null
  }

  export type FinalProjectSumAggregateOutputType = {
    id: number | null
    duration_sec: number | null
  }

  export type FinalProjectMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    project_uuid: string | null
    title: string | null
    duration_sec: number | null
    video_uuid: string | null
    thumbnail_uuid: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FinalProjectMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    project_uuid: string | null
    title: string | null
    duration_sec: number | null
    video_uuid: string | null
    thumbnail_uuid: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FinalProjectCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    project_uuid: number
    title: number
    duration_sec: number
    video_uuid: number
    thumbnail_uuid: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FinalProjectAvgAggregateInputType = {
    id?: true
    duration_sec?: true
  }

  export type FinalProjectSumAggregateInputType = {
    id?: true
    duration_sec?: true
  }

  export type FinalProjectMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    duration_sec?: true
    video_uuid?: true
    thumbnail_uuid?: true
    created_at?: true
    updated_at?: true
  }

  export type FinalProjectMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    duration_sec?: true
    video_uuid?: true
    thumbnail_uuid?: true
    created_at?: true
    updated_at?: true
  }

  export type FinalProjectCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    project_uuid?: true
    title?: true
    duration_sec?: true
    video_uuid?: true
    thumbnail_uuid?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FinalProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinalProject to aggregate.
     */
    where?: FinalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinalProjects to fetch.
     */
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinalProjects
    **/
    _count?: true | FinalProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinalProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinalProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinalProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinalProjectMaxAggregateInputType
  }

  export type GetFinalProjectAggregateType<T extends FinalProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateFinalProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinalProject[P]>
      : GetScalarType<T[P], AggregateFinalProject[P]>
  }




  export type FinalProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinalProjectWhereInput
    orderBy?: FinalProjectOrderByWithAggregationInput | FinalProjectOrderByWithAggregationInput[]
    by: FinalProjectScalarFieldEnum[] | FinalProjectScalarFieldEnum
    having?: FinalProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinalProjectCountAggregateInputType | true
    _avg?: FinalProjectAvgAggregateInputType
    _sum?: FinalProjectSumAggregateInputType
    _min?: FinalProjectMinAggregateInputType
    _max?: FinalProjectMaxAggregateInputType
  }

  export type FinalProjectGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    project_uuid: string
    title: string | null
    duration_sec: number | null
    video_uuid: string | null
    thumbnail_uuid: string | null
    created_at: Date
    updated_at: Date
    _count: FinalProjectCountAggregateOutputType | null
    _avg: FinalProjectAvgAggregateOutputType | null
    _sum: FinalProjectSumAggregateOutputType | null
    _min: FinalProjectMinAggregateOutputType | null
    _max: FinalProjectMaxAggregateOutputType | null
  }

  type GetFinalProjectGroupByPayload<T extends FinalProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinalProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinalProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinalProjectGroupByOutputType[P]>
            : GetScalarType<T[P], FinalProjectGroupByOutputType[P]>
        }
      >
    >


  export type FinalProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    duration_sec?: boolean
    video_uuid?: boolean
    thumbnail_uuid?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }, ExtArgs["result"]["finalProject"]>

  export type FinalProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    duration_sec?: boolean
    video_uuid?: boolean
    thumbnail_uuid?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }, ExtArgs["result"]["finalProject"]>

  export type FinalProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    duration_sec?: boolean
    video_uuid?: boolean
    thumbnail_uuid?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }, ExtArgs["result"]["finalProject"]>

  export type FinalProjectSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    project_uuid?: boolean
    title?: boolean
    duration_sec?: boolean
    video_uuid?: boolean
    thumbnail_uuid?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FinalProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "project_uuid" | "title" | "duration_sec" | "video_uuid" | "thumbnail_uuid" | "created_at" | "updated_at", ExtArgs["result"]["finalProject"]>
  export type FinalProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }
  export type FinalProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }
  export type FinalProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    video?: boolean | FinalProject$videoArgs<ExtArgs>
    thumbnail?: boolean | FinalProject$thumbnailArgs<ExtArgs>
  }

  export type $FinalProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinalProject"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      video: Prisma.$DocumentPayload<ExtArgs> | null
      thumbnail: Prisma.$DocumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      project_uuid: string
      title: string | null
      duration_sec: number | null
      video_uuid: string | null
      thumbnail_uuid: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["finalProject"]>
    composites: {}
  }

  type FinalProjectGetPayload<S extends boolean | null | undefined | FinalProjectDefaultArgs> = $Result.GetResult<Prisma.$FinalProjectPayload, S>

  type FinalProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinalProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinalProjectCountAggregateInputType | true
    }

  export interface FinalProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinalProject'], meta: { name: 'FinalProject' } }
    /**
     * Find zero or one FinalProject that matches the filter.
     * @param {FinalProjectFindUniqueArgs} args - Arguments to find a FinalProject
     * @example
     * // Get one FinalProject
     * const finalProject = await prisma.finalProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinalProjectFindUniqueArgs>(args: SelectSubset<T, FinalProjectFindUniqueArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinalProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinalProjectFindUniqueOrThrowArgs} args - Arguments to find a FinalProject
     * @example
     * // Get one FinalProject
     * const finalProject = await prisma.finalProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinalProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, FinalProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinalProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectFindFirstArgs} args - Arguments to find a FinalProject
     * @example
     * // Get one FinalProject
     * const finalProject = await prisma.finalProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinalProjectFindFirstArgs>(args?: SelectSubset<T, FinalProjectFindFirstArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinalProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectFindFirstOrThrowArgs} args - Arguments to find a FinalProject
     * @example
     * // Get one FinalProject
     * const finalProject = await prisma.finalProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinalProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, FinalProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinalProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinalProjects
     * const finalProjects = await prisma.finalProject.findMany()
     * 
     * // Get first 10 FinalProjects
     * const finalProjects = await prisma.finalProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const finalProjectWithIdOnly = await prisma.finalProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinalProjectFindManyArgs>(args?: SelectSubset<T, FinalProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinalProject.
     * @param {FinalProjectCreateArgs} args - Arguments to create a FinalProject.
     * @example
     * // Create one FinalProject
     * const FinalProject = await prisma.finalProject.create({
     *   data: {
     *     // ... data to create a FinalProject
     *   }
     * })
     * 
     */
    create<T extends FinalProjectCreateArgs>(args: SelectSubset<T, FinalProjectCreateArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinalProjects.
     * @param {FinalProjectCreateManyArgs} args - Arguments to create many FinalProjects.
     * @example
     * // Create many FinalProjects
     * const finalProject = await prisma.finalProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinalProjectCreateManyArgs>(args?: SelectSubset<T, FinalProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinalProjects and returns the data saved in the database.
     * @param {FinalProjectCreateManyAndReturnArgs} args - Arguments to create many FinalProjects.
     * @example
     * // Create many FinalProjects
     * const finalProject = await prisma.finalProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinalProjects and only return the `id`
     * const finalProjectWithIdOnly = await prisma.finalProject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinalProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, FinalProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinalProject.
     * @param {FinalProjectDeleteArgs} args - Arguments to delete one FinalProject.
     * @example
     * // Delete one FinalProject
     * const FinalProject = await prisma.finalProject.delete({
     *   where: {
     *     // ... filter to delete one FinalProject
     *   }
     * })
     * 
     */
    delete<T extends FinalProjectDeleteArgs>(args: SelectSubset<T, FinalProjectDeleteArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinalProject.
     * @param {FinalProjectUpdateArgs} args - Arguments to update one FinalProject.
     * @example
     * // Update one FinalProject
     * const finalProject = await prisma.finalProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinalProjectUpdateArgs>(args: SelectSubset<T, FinalProjectUpdateArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinalProjects.
     * @param {FinalProjectDeleteManyArgs} args - Arguments to filter FinalProjects to delete.
     * @example
     * // Delete a few FinalProjects
     * const { count } = await prisma.finalProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinalProjectDeleteManyArgs>(args?: SelectSubset<T, FinalProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinalProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinalProjects
     * const finalProject = await prisma.finalProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinalProjectUpdateManyArgs>(args: SelectSubset<T, FinalProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinalProjects and returns the data updated in the database.
     * @param {FinalProjectUpdateManyAndReturnArgs} args - Arguments to update many FinalProjects.
     * @example
     * // Update many FinalProjects
     * const finalProject = await prisma.finalProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinalProjects and only return the `id`
     * const finalProjectWithIdOnly = await prisma.finalProject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FinalProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, FinalProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinalProject.
     * @param {FinalProjectUpsertArgs} args - Arguments to update or create a FinalProject.
     * @example
     * // Update or create a FinalProject
     * const finalProject = await prisma.finalProject.upsert({
     *   create: {
     *     // ... data to create a FinalProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinalProject we want to update
     *   }
     * })
     */
    upsert<T extends FinalProjectUpsertArgs>(args: SelectSubset<T, FinalProjectUpsertArgs<ExtArgs>>): Prisma__FinalProjectClient<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinalProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectCountArgs} args - Arguments to filter FinalProjects to count.
     * @example
     * // Count the number of FinalProjects
     * const count = await prisma.finalProject.count({
     *   where: {
     *     // ... the filter for the FinalProjects we want to count
     *   }
     * })
    **/
    count<T extends FinalProjectCountArgs>(
      args?: Subset<T, FinalProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinalProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinalProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinalProjectAggregateArgs>(args: Subset<T, FinalProjectAggregateArgs>): Prisma.PrismaPromise<GetFinalProjectAggregateType<T>>

    /**
     * Group by FinalProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinalProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinalProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinalProjectGroupByArgs['orderBy'] }
        : { orderBy?: FinalProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinalProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinalProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinalProject model
   */
  readonly fields: FinalProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinalProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinalProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    video<T extends FinalProject$videoArgs<ExtArgs> = {}>(args?: Subset<T, FinalProject$videoArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    thumbnail<T extends FinalProject$thumbnailArgs<ExtArgs> = {}>(args?: Subset<T, FinalProject$thumbnailArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FinalProject model
   */
  interface FinalProjectFieldRefs {
    readonly id: FieldRef<"FinalProject", 'Int'>
    readonly uuid: FieldRef<"FinalProject", 'String'>
    readonly user_uuid: FieldRef<"FinalProject", 'String'>
    readonly project_uuid: FieldRef<"FinalProject", 'String'>
    readonly title: FieldRef<"FinalProject", 'String'>
    readonly duration_sec: FieldRef<"FinalProject", 'Int'>
    readonly video_uuid: FieldRef<"FinalProject", 'String'>
    readonly thumbnail_uuid: FieldRef<"FinalProject", 'String'>
    readonly created_at: FieldRef<"FinalProject", 'DateTime'>
    readonly updated_at: FieldRef<"FinalProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FinalProject findUnique
   */
  export type FinalProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter, which FinalProject to fetch.
     */
    where: FinalProjectWhereUniqueInput
  }

  /**
   * FinalProject findUniqueOrThrow
   */
  export type FinalProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter, which FinalProject to fetch.
     */
    where: FinalProjectWhereUniqueInput
  }

  /**
   * FinalProject findFirst
   */
  export type FinalProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter, which FinalProject to fetch.
     */
    where?: FinalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinalProjects to fetch.
     */
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinalProjects.
     */
    cursor?: FinalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinalProjects.
     */
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * FinalProject findFirstOrThrow
   */
  export type FinalProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter, which FinalProject to fetch.
     */
    where?: FinalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinalProjects to fetch.
     */
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinalProjects.
     */
    cursor?: FinalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinalProjects.
     */
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * FinalProject findMany
   */
  export type FinalProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter, which FinalProjects to fetch.
     */
    where?: FinalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinalProjects to fetch.
     */
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinalProjects.
     */
    cursor?: FinalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinalProjects.
     */
    skip?: number
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * FinalProject create
   */
  export type FinalProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a FinalProject.
     */
    data: XOR<FinalProjectCreateInput, FinalProjectUncheckedCreateInput>
  }

  /**
   * FinalProject createMany
   */
  export type FinalProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinalProjects.
     */
    data: FinalProjectCreateManyInput | FinalProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinalProject createManyAndReturn
   */
  export type FinalProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * The data used to create many FinalProjects.
     */
    data: FinalProjectCreateManyInput | FinalProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinalProject update
   */
  export type FinalProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a FinalProject.
     */
    data: XOR<FinalProjectUpdateInput, FinalProjectUncheckedUpdateInput>
    /**
     * Choose, which FinalProject to update.
     */
    where: FinalProjectWhereUniqueInput
  }

  /**
   * FinalProject updateMany
   */
  export type FinalProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinalProjects.
     */
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyInput>
    /**
     * Filter which FinalProjects to update
     */
    where?: FinalProjectWhereInput
    /**
     * Limit how many FinalProjects to update.
     */
    limit?: number
  }

  /**
   * FinalProject updateManyAndReturn
   */
  export type FinalProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * The data used to update FinalProjects.
     */
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyInput>
    /**
     * Filter which FinalProjects to update
     */
    where?: FinalProjectWhereInput
    /**
     * Limit how many FinalProjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinalProject upsert
   */
  export type FinalProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the FinalProject to update in case it exists.
     */
    where: FinalProjectWhereUniqueInput
    /**
     * In case the FinalProject found by the `where` argument doesn't exist, create a new FinalProject with this data.
     */
    create: XOR<FinalProjectCreateInput, FinalProjectUncheckedCreateInput>
    /**
     * In case the FinalProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinalProjectUpdateInput, FinalProjectUncheckedUpdateInput>
  }

  /**
   * FinalProject delete
   */
  export type FinalProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    /**
     * Filter which FinalProject to delete.
     */
    where: FinalProjectWhereUniqueInput
  }

  /**
   * FinalProject deleteMany
   */
  export type FinalProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinalProjects to delete
     */
    where?: FinalProjectWhereInput
    /**
     * Limit how many FinalProjects to delete.
     */
    limit?: number
  }

  /**
   * FinalProject.video
   */
  export type FinalProject$videoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * FinalProject.thumbnail
   */
  export type FinalProject$thumbnailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * FinalProject without action
   */
  export type FinalProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    id: number | null
    size: number | null
    order: number | null
  }

  export type DocumentSumAggregateOutputType = {
    id: number | null
    size: number | null
    order: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    filename: string | null
    mimetype: string | null
    size: number | null
    url: string | null
    path: string | null
    type: $Enums.DocumentType | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    filename: string | null
    mimetype: string | null
    size: number | null
    url: string | null
    path: string | null
    type: $Enums.DocumentType | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    uuid: number
    filename: number
    mimetype: number
    size: number
    url: number
    path: number
    type: number
    order: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    id?: true
    size?: true
    order?: true
  }

  export type DocumentSumAggregateInputType = {
    id?: true
    size?: true
    order?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    uuid?: true
    filename?: true
    mimetype?: true
    size?: true
    url?: true
    path?: true
    type?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    uuid?: true
    filename?: true
    mimetype?: true
    size?: true
    url?: true
    path?: true
    type?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    uuid?: true
    filename?: true
    mimetype?: true
    size?: true
    url?: true
    path?: true
    type?: true
    order?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: number
    uuid: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type: $Enums.DocumentType
    order: number
    created_at: Date
    updated_at: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    filename?: boolean
    mimetype?: boolean
    size?: boolean
    url?: boolean
    path?: boolean
    type?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    scene_videos?: boolean | Document$scene_videosArgs<ExtArgs>
    prompt_images?: boolean | Document$prompt_imagesArgs<ExtArgs>
    final_project_videos?: boolean | Document$final_project_videosArgs<ExtArgs>
    final_project_thumbnails?: boolean | Document$final_project_thumbnailsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    filename?: boolean
    mimetype?: boolean
    size?: boolean
    url?: boolean
    path?: boolean
    type?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    filename?: boolean
    mimetype?: boolean
    size?: boolean
    url?: boolean
    path?: boolean
    type?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    uuid?: boolean
    filename?: boolean
    mimetype?: boolean
    size?: boolean
    url?: boolean
    path?: boolean
    type?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "filename" | "mimetype" | "size" | "url" | "path" | "type" | "order" | "created_at" | "updated_at", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scene_videos?: boolean | Document$scene_videosArgs<ExtArgs>
    prompt_images?: boolean | Document$prompt_imagesArgs<ExtArgs>
    final_project_videos?: boolean | Document$final_project_videosArgs<ExtArgs>
    final_project_thumbnails?: boolean | Document$final_project_thumbnailsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      scene_videos: Prisma.$SceneVideoPayload<ExtArgs>[]
      prompt_images: Prisma.$SceneVariationPayload<ExtArgs>[]
      final_project_videos: Prisma.$FinalProjectPayload<ExtArgs>[]
      final_project_thumbnails: Prisma.$FinalProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      filename: string
      mimetype: string
      size: number
      url: string
      path: string
      type: $Enums.DocumentType
      order: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scene_videos<T extends Document$scene_videosArgs<ExtArgs> = {}>(args?: Subset<T, Document$scene_videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prompt_images<T extends Document$prompt_imagesArgs<ExtArgs> = {}>(args?: Subset<T, Document$prompt_imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SceneVariationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    final_project_videos<T extends Document$final_project_videosArgs<ExtArgs> = {}>(args?: Subset<T, Document$final_project_videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    final_project_thumbnails<T extends Document$final_project_thumbnailsArgs<ExtArgs> = {}>(args?: Subset<T, Document$final_project_thumbnailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'Int'>
    readonly uuid: FieldRef<"Document", 'String'>
    readonly filename: FieldRef<"Document", 'String'>
    readonly mimetype: FieldRef<"Document", 'String'>
    readonly size: FieldRef<"Document", 'Int'>
    readonly url: FieldRef<"Document", 'String'>
    readonly path: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'DocumentType'>
    readonly order: FieldRef<"Document", 'Int'>
    readonly created_at: FieldRef<"Document", 'DateTime'>
    readonly updated_at: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.scene_videos
   */
  export type Document$scene_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVideo
     */
    select?: SceneVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVideo
     */
    omit?: SceneVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVideoInclude<ExtArgs> | null
    where?: SceneVideoWhereInput
    orderBy?: SceneVideoOrderByWithRelationInput | SceneVideoOrderByWithRelationInput[]
    cursor?: SceneVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVideoScalarFieldEnum | SceneVideoScalarFieldEnum[]
  }

  /**
   * Document.prompt_images
   */
  export type Document$prompt_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SceneVariation
     */
    select?: SceneVariationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SceneVariation
     */
    omit?: SceneVariationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneVariationInclude<ExtArgs> | null
    where?: SceneVariationWhereInput
    orderBy?: SceneVariationOrderByWithRelationInput | SceneVariationOrderByWithRelationInput[]
    cursor?: SceneVariationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneVariationScalarFieldEnum | SceneVariationScalarFieldEnum[]
  }

  /**
   * Document.final_project_videos
   */
  export type Document$final_project_videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    where?: FinalProjectWhereInput
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    cursor?: FinalProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * Document.final_project_thumbnails
   */
  export type Document$final_project_thumbnailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinalProject
     */
    select?: FinalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinalProject
     */
    omit?: FinalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinalProjectInclude<ExtArgs> | null
    where?: FinalProjectWhereInput
    orderBy?: FinalProjectOrderByWithRelationInput | FinalProjectOrderByWithRelationInput[]
    cursor?: FinalProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinalProjectScalarFieldEnum | FinalProjectScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    email: 'email',
    phone: 'phone',
    full_name: 'full_name',
    password: 'password',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    title: 'title',
    original_concept: 'original_concept',
    enriched_concept: 'enriched_concept',
    genres: 'genres',
    tones: 'tones',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SceneScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    project_uuid: 'project_uuid',
    title: 'title',
    description: 'description',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SceneScalarFieldEnum = (typeof SceneScalarFieldEnum)[keyof typeof SceneScalarFieldEnum]


  export const SceneVariationScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    scene_uuid: 'scene_uuid',
    title: 'title',
    prompt_text: 'prompt_text',
    negative_prompt: 'negative_prompt',
    prompt_image_uuid: 'prompt_image_uuid',
    selected: 'selected',
    style: 'style',
    tone: 'tone',
    genre: 'genre',
    camera_style: 'camera_style',
    shot_type: 'shot_type',
    camera_movement: 'camera_movement',
    lens_type: 'lens_type',
    depth_of_field: 'depth_of_field',
    lighting: 'lighting',
    color_grade: 'color_grade',
    time_of_day: 'time_of_day',
    aspect_ratio: 'aspect_ratio',
    resolution: 'resolution',
    fps: 'fps',
    duration_sec: 'duration_sec',
    ai_model: 'ai_model',
    seed: 'seed',
    creativity: 'creativity',
    motion_strength: 'motion_strength',
    guidance_scale: 'guidance_scale',
    audio_style: 'audio_style',
    include_sound: 'include_sound',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SceneVariationScalarFieldEnum = (typeof SceneVariationScalarFieldEnum)[keyof typeof SceneVariationScalarFieldEnum]


  export const SceneVideoScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    scene_uuid: 'scene_uuid',
    scene_variation_uuid: 'scene_variation_uuid',
    provider_job_id: 'provider_job_id',
    video_uuid: 'video_uuid',
    status: 'status',
    error_message: 'error_message',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SceneVideoScalarFieldEnum = (typeof SceneVideoScalarFieldEnum)[keyof typeof SceneVideoScalarFieldEnum]


  export const FinalProjectScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    project_uuid: 'project_uuid',
    title: 'title',
    duration_sec: 'duration_sec',
    video_uuid: 'video_uuid',
    thumbnail_uuid: 'thumbnail_uuid',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FinalProjectScalarFieldEnum = (typeof FinalProjectScalarFieldEnum)[keyof typeof FinalProjectScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    filename: 'filename',
    mimetype: 'mimetype',
    size: 'size',
    url: 'url',
    path: 'path',
    type: 'type',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthRole'
   */
  export type EnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole'>
    


  /**
   * Reference to a field of type 'AuthRole[]'
   */
  export type ListEnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'VideoProvider'
   */
  export type EnumVideoProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoProvider'>
    


  /**
   * Reference to a field of type 'VideoProvider[]'
   */
  export type ListEnumVideoProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoProvider[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'VideoStatus'
   */
  export type EnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus'>
    


  /**
   * Reference to a field of type 'VideoStatus[]'
   */
  export type ListEnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    uuid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    full_name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    scenes?: SceneListRelationFilter
    scene_variations?: SceneVariationListRelationFilter
    scene_videos?: SceneVideoListRelationFilter
    final_projects?: FinalProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    full_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    scenes?: SceneOrderByRelationAggregateInput
    scene_variations?: SceneVariationOrderByRelationAggregateInput
    scene_videos?: SceneVideoOrderByRelationAggregateInput
    final_projects?: FinalProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    full_name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    scenes?: SceneListRelationFilter
    scene_variations?: SceneVariationListRelationFilter
    scene_videos?: SceneVideoListRelationFilter
    final_projects?: FinalProjectListRelationFilter
  }, "id" | "uuid" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    full_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    uuid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    full_name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumAuthRoleWithAggregatesFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    uuid?: StringFilter<"Project"> | string
    user_uuid?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    original_concept?: StringFilter<"Project"> | string
    enriched_concept?: StringNullableFilter<"Project"> | string | null
    genres?: JsonNullableFilter<"Project">
    tones?: JsonNullableFilter<"Project">
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scenes?: SceneListRelationFilter
    final_projects?: FinalProjectListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    title?: SortOrder
    original_concept?: SortOrder
    enriched_concept?: SortOrderInput | SortOrder
    genres?: SortOrderInput | SortOrder
    tones?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    scenes?: SceneOrderByRelationAggregateInput
    final_projects?: FinalProjectOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    user_uuid?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    original_concept?: StringFilter<"Project"> | string
    enriched_concept?: StringNullableFilter<"Project"> | string | null
    genres?: JsonNullableFilter<"Project">
    tones?: JsonNullableFilter<"Project">
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scenes?: SceneListRelationFilter
    final_projects?: FinalProjectListRelationFilter
  }, "id" | "uuid">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    title?: SortOrder
    original_concept?: SortOrder
    enriched_concept?: SortOrderInput | SortOrder
    genres?: SortOrderInput | SortOrder
    tones?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    uuid?: StringWithAggregatesFilter<"Project"> | string
    user_uuid?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    original_concept?: StringWithAggregatesFilter<"Project"> | string
    enriched_concept?: StringNullableWithAggregatesFilter<"Project"> | string | null
    genres?: JsonNullableWithAggregatesFilter<"Project">
    tones?: JsonNullableWithAggregatesFilter<"Project">
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    created_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type SceneWhereInput = {
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    id?: IntFilter<"Scene"> | number
    uuid?: StringFilter<"Scene"> | string
    user_uuid?: StringFilter<"Scene"> | string
    project_uuid?: StringFilter<"Scene"> | string
    title?: StringFilter<"Scene"> | string
    description?: StringNullableFilter<"Scene"> | string | null
    order?: IntFilter<"Scene"> | number
    created_at?: DateTimeFilter<"Scene"> | Date | string
    updated_at?: DateTimeFilter<"Scene"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    scene_variations?: SceneVariationListRelationFilter
    scene_videos?: SceneVideoListRelationFilter
  }

  export type SceneOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    scene_variations?: SceneVariationOrderByRelationAggregateInput
    scene_videos?: SceneVideoOrderByRelationAggregateInput
  }

  export type SceneWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    project_uuid_order?: SceneProject_uuidOrderCompoundUniqueInput
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    user_uuid?: StringFilter<"Scene"> | string
    project_uuid?: StringFilter<"Scene"> | string
    title?: StringFilter<"Scene"> | string
    description?: StringNullableFilter<"Scene"> | string | null
    order?: IntFilter<"Scene"> | number
    created_at?: DateTimeFilter<"Scene"> | Date | string
    updated_at?: DateTimeFilter<"Scene"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    scene_variations?: SceneVariationListRelationFilter
    scene_videos?: SceneVideoListRelationFilter
  }, "id" | "uuid" | "project_uuid_order">

  export type SceneOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SceneCountOrderByAggregateInput
    _avg?: SceneAvgOrderByAggregateInput
    _max?: SceneMaxOrderByAggregateInput
    _min?: SceneMinOrderByAggregateInput
    _sum?: SceneSumOrderByAggregateInput
  }

  export type SceneScalarWhereWithAggregatesInput = {
    AND?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    OR?: SceneScalarWhereWithAggregatesInput[]
    NOT?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Scene"> | number
    uuid?: StringWithAggregatesFilter<"Scene"> | string
    user_uuid?: StringWithAggregatesFilter<"Scene"> | string
    project_uuid?: StringWithAggregatesFilter<"Scene"> | string
    title?: StringWithAggregatesFilter<"Scene"> | string
    description?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    order?: IntWithAggregatesFilter<"Scene"> | number
    created_at?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
  }

  export type SceneVariationWhereInput = {
    AND?: SceneVariationWhereInput | SceneVariationWhereInput[]
    OR?: SceneVariationWhereInput[]
    NOT?: SceneVariationWhereInput | SceneVariationWhereInput[]
    id?: IntFilter<"SceneVariation"> | number
    uuid?: StringFilter<"SceneVariation"> | string
    user_uuid?: StringFilter<"SceneVariation"> | string
    scene_uuid?: StringFilter<"SceneVariation"> | string
    title?: StringFilter<"SceneVariation"> | string
    prompt_text?: StringNullableFilter<"SceneVariation"> | string | null
    negative_prompt?: StringNullableFilter<"SceneVariation"> | string | null
    prompt_image_uuid?: StringNullableFilter<"SceneVariation"> | string | null
    selected?: BoolFilter<"SceneVariation"> | boolean
    style?: StringNullableFilter<"SceneVariation"> | string | null
    tone?: StringNullableFilter<"SceneVariation"> | string | null
    genre?: StringNullableFilter<"SceneVariation"> | string | null
    camera_style?: StringNullableFilter<"SceneVariation"> | string | null
    shot_type?: StringNullableFilter<"SceneVariation"> | string | null
    camera_movement?: StringNullableFilter<"SceneVariation"> | string | null
    lens_type?: StringNullableFilter<"SceneVariation"> | string | null
    depth_of_field?: StringNullableFilter<"SceneVariation"> | string | null
    lighting?: StringNullableFilter<"SceneVariation"> | string | null
    color_grade?: StringNullableFilter<"SceneVariation"> | string | null
    time_of_day?: StringNullableFilter<"SceneVariation"> | string | null
    aspect_ratio?: StringNullableFilter<"SceneVariation"> | string | null
    resolution?: StringNullableFilter<"SceneVariation"> | string | null
    fps?: IntNullableFilter<"SceneVariation"> | number | null
    duration_sec?: IntNullableFilter<"SceneVariation"> | number | null
    ai_model?: EnumVideoProviderNullableFilter<"SceneVariation"> | $Enums.VideoProvider | null
    seed?: IntNullableFilter<"SceneVariation"> | number | null
    creativity?: FloatNullableFilter<"SceneVariation"> | number | null
    motion_strength?: FloatNullableFilter<"SceneVariation"> | number | null
    guidance_scale?: FloatNullableFilter<"SceneVariation"> | number | null
    audio_style?: StringNullableFilter<"SceneVariation"> | string | null
    include_sound?: BoolFilter<"SceneVariation"> | boolean
    created_at?: DateTimeFilter<"SceneVariation"> | Date | string
    updated_at?: DateTimeFilter<"SceneVariation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    prompt_image?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    scene_video?: XOR<SceneVideoNullableScalarRelationFilter, SceneVideoWhereInput> | null
  }

  export type SceneVariationOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    title?: SortOrder
    prompt_text?: SortOrderInput | SortOrder
    negative_prompt?: SortOrderInput | SortOrder
    prompt_image_uuid?: SortOrderInput | SortOrder
    selected?: SortOrder
    style?: SortOrderInput | SortOrder
    tone?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    camera_style?: SortOrderInput | SortOrder
    shot_type?: SortOrderInput | SortOrder
    camera_movement?: SortOrderInput | SortOrder
    lens_type?: SortOrderInput | SortOrder
    depth_of_field?: SortOrderInput | SortOrder
    lighting?: SortOrderInput | SortOrder
    color_grade?: SortOrderInput | SortOrder
    time_of_day?: SortOrderInput | SortOrder
    aspect_ratio?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    fps?: SortOrderInput | SortOrder
    duration_sec?: SortOrderInput | SortOrder
    ai_model?: SortOrderInput | SortOrder
    seed?: SortOrderInput | SortOrder
    creativity?: SortOrderInput | SortOrder
    motion_strength?: SortOrderInput | SortOrder
    guidance_scale?: SortOrderInput | SortOrder
    audio_style?: SortOrderInput | SortOrder
    include_sound?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    scene?: SceneOrderByWithRelationInput
    prompt_image?: DocumentOrderByWithRelationInput
    scene_video?: SceneVideoOrderByWithRelationInput
  }

  export type SceneVariationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: SceneVariationWhereInput | SceneVariationWhereInput[]
    OR?: SceneVariationWhereInput[]
    NOT?: SceneVariationWhereInput | SceneVariationWhereInput[]
    user_uuid?: StringFilter<"SceneVariation"> | string
    scene_uuid?: StringFilter<"SceneVariation"> | string
    title?: StringFilter<"SceneVariation"> | string
    prompt_text?: StringNullableFilter<"SceneVariation"> | string | null
    negative_prompt?: StringNullableFilter<"SceneVariation"> | string | null
    prompt_image_uuid?: StringNullableFilter<"SceneVariation"> | string | null
    selected?: BoolFilter<"SceneVariation"> | boolean
    style?: StringNullableFilter<"SceneVariation"> | string | null
    tone?: StringNullableFilter<"SceneVariation"> | string | null
    genre?: StringNullableFilter<"SceneVariation"> | string | null
    camera_style?: StringNullableFilter<"SceneVariation"> | string | null
    shot_type?: StringNullableFilter<"SceneVariation"> | string | null
    camera_movement?: StringNullableFilter<"SceneVariation"> | string | null
    lens_type?: StringNullableFilter<"SceneVariation"> | string | null
    depth_of_field?: StringNullableFilter<"SceneVariation"> | string | null
    lighting?: StringNullableFilter<"SceneVariation"> | string | null
    color_grade?: StringNullableFilter<"SceneVariation"> | string | null
    time_of_day?: StringNullableFilter<"SceneVariation"> | string | null
    aspect_ratio?: StringNullableFilter<"SceneVariation"> | string | null
    resolution?: StringNullableFilter<"SceneVariation"> | string | null
    fps?: IntNullableFilter<"SceneVariation"> | number | null
    duration_sec?: IntNullableFilter<"SceneVariation"> | number | null
    ai_model?: EnumVideoProviderNullableFilter<"SceneVariation"> | $Enums.VideoProvider | null
    seed?: IntNullableFilter<"SceneVariation"> | number | null
    creativity?: FloatNullableFilter<"SceneVariation"> | number | null
    motion_strength?: FloatNullableFilter<"SceneVariation"> | number | null
    guidance_scale?: FloatNullableFilter<"SceneVariation"> | number | null
    audio_style?: StringNullableFilter<"SceneVariation"> | string | null
    include_sound?: BoolFilter<"SceneVariation"> | boolean
    created_at?: DateTimeFilter<"SceneVariation"> | Date | string
    updated_at?: DateTimeFilter<"SceneVariation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    prompt_image?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    scene_video?: XOR<SceneVideoNullableScalarRelationFilter, SceneVideoWhereInput> | null
  }, "id" | "uuid">

  export type SceneVariationOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    title?: SortOrder
    prompt_text?: SortOrderInput | SortOrder
    negative_prompt?: SortOrderInput | SortOrder
    prompt_image_uuid?: SortOrderInput | SortOrder
    selected?: SortOrder
    style?: SortOrderInput | SortOrder
    tone?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    camera_style?: SortOrderInput | SortOrder
    shot_type?: SortOrderInput | SortOrder
    camera_movement?: SortOrderInput | SortOrder
    lens_type?: SortOrderInput | SortOrder
    depth_of_field?: SortOrderInput | SortOrder
    lighting?: SortOrderInput | SortOrder
    color_grade?: SortOrderInput | SortOrder
    time_of_day?: SortOrderInput | SortOrder
    aspect_ratio?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    fps?: SortOrderInput | SortOrder
    duration_sec?: SortOrderInput | SortOrder
    ai_model?: SortOrderInput | SortOrder
    seed?: SortOrderInput | SortOrder
    creativity?: SortOrderInput | SortOrder
    motion_strength?: SortOrderInput | SortOrder
    guidance_scale?: SortOrderInput | SortOrder
    audio_style?: SortOrderInput | SortOrder
    include_sound?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SceneVariationCountOrderByAggregateInput
    _avg?: SceneVariationAvgOrderByAggregateInput
    _max?: SceneVariationMaxOrderByAggregateInput
    _min?: SceneVariationMinOrderByAggregateInput
    _sum?: SceneVariationSumOrderByAggregateInput
  }

  export type SceneVariationScalarWhereWithAggregatesInput = {
    AND?: SceneVariationScalarWhereWithAggregatesInput | SceneVariationScalarWhereWithAggregatesInput[]
    OR?: SceneVariationScalarWhereWithAggregatesInput[]
    NOT?: SceneVariationScalarWhereWithAggregatesInput | SceneVariationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SceneVariation"> | number
    uuid?: StringWithAggregatesFilter<"SceneVariation"> | string
    user_uuid?: StringWithAggregatesFilter<"SceneVariation"> | string
    scene_uuid?: StringWithAggregatesFilter<"SceneVariation"> | string
    title?: StringWithAggregatesFilter<"SceneVariation"> | string
    prompt_text?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    negative_prompt?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    prompt_image_uuid?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    selected?: BoolWithAggregatesFilter<"SceneVariation"> | boolean
    style?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    tone?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    genre?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    camera_style?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    shot_type?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    camera_movement?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    lens_type?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    depth_of_field?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    lighting?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    color_grade?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    time_of_day?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    aspect_ratio?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    resolution?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    fps?: IntNullableWithAggregatesFilter<"SceneVariation"> | number | null
    duration_sec?: IntNullableWithAggregatesFilter<"SceneVariation"> | number | null
    ai_model?: EnumVideoProviderNullableWithAggregatesFilter<"SceneVariation"> | $Enums.VideoProvider | null
    seed?: IntNullableWithAggregatesFilter<"SceneVariation"> | number | null
    creativity?: FloatNullableWithAggregatesFilter<"SceneVariation"> | number | null
    motion_strength?: FloatNullableWithAggregatesFilter<"SceneVariation"> | number | null
    guidance_scale?: FloatNullableWithAggregatesFilter<"SceneVariation"> | number | null
    audio_style?: StringNullableWithAggregatesFilter<"SceneVariation"> | string | null
    include_sound?: BoolWithAggregatesFilter<"SceneVariation"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"SceneVariation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SceneVariation"> | Date | string
  }

  export type SceneVideoWhereInput = {
    AND?: SceneVideoWhereInput | SceneVideoWhereInput[]
    OR?: SceneVideoWhereInput[]
    NOT?: SceneVideoWhereInput | SceneVideoWhereInput[]
    id?: IntFilter<"SceneVideo"> | number
    uuid?: StringFilter<"SceneVideo"> | string
    user_uuid?: StringFilter<"SceneVideo"> | string
    scene_uuid?: StringFilter<"SceneVideo"> | string
    scene_variation_uuid?: StringFilter<"SceneVideo"> | string
    provider_job_id?: StringNullableFilter<"SceneVideo"> | string | null
    video_uuid?: StringNullableFilter<"SceneVideo"> | string | null
    status?: EnumVideoStatusFilter<"SceneVideo"> | $Enums.VideoStatus
    error_message?: StringNullableFilter<"SceneVideo"> | string | null
    created_at?: DateTimeFilter<"SceneVideo"> | Date | string
    updated_at?: DateTimeFilter<"SceneVideo"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    scene_variation?: XOR<SceneVariationNullableScalarRelationFilter, SceneVariationWhereInput> | null
    video?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }

  export type SceneVideoOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    scene_variation_uuid?: SortOrder
    provider_job_id?: SortOrderInput | SortOrder
    video_uuid?: SortOrderInput | SortOrder
    status?: SortOrder
    error_message?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    scene?: SceneOrderByWithRelationInput
    scene_variation?: SceneVariationOrderByWithRelationInput
    video?: DocumentOrderByWithRelationInput
  }

  export type SceneVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    scene_variation_uuid?: string
    AND?: SceneVideoWhereInput | SceneVideoWhereInput[]
    OR?: SceneVideoWhereInput[]
    NOT?: SceneVideoWhereInput | SceneVideoWhereInput[]
    user_uuid?: StringFilter<"SceneVideo"> | string
    scene_uuid?: StringFilter<"SceneVideo"> | string
    provider_job_id?: StringNullableFilter<"SceneVideo"> | string | null
    video_uuid?: StringNullableFilter<"SceneVideo"> | string | null
    status?: EnumVideoStatusFilter<"SceneVideo"> | $Enums.VideoStatus
    error_message?: StringNullableFilter<"SceneVideo"> | string | null
    created_at?: DateTimeFilter<"SceneVideo"> | Date | string
    updated_at?: DateTimeFilter<"SceneVideo"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scene?: XOR<SceneScalarRelationFilter, SceneWhereInput>
    scene_variation?: XOR<SceneVariationNullableScalarRelationFilter, SceneVariationWhereInput> | null
    video?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }, "id" | "uuid" | "scene_variation_uuid">

  export type SceneVideoOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    scene_variation_uuid?: SortOrder
    provider_job_id?: SortOrderInput | SortOrder
    video_uuid?: SortOrderInput | SortOrder
    status?: SortOrder
    error_message?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SceneVideoCountOrderByAggregateInput
    _avg?: SceneVideoAvgOrderByAggregateInput
    _max?: SceneVideoMaxOrderByAggregateInput
    _min?: SceneVideoMinOrderByAggregateInput
    _sum?: SceneVideoSumOrderByAggregateInput
  }

  export type SceneVideoScalarWhereWithAggregatesInput = {
    AND?: SceneVideoScalarWhereWithAggregatesInput | SceneVideoScalarWhereWithAggregatesInput[]
    OR?: SceneVideoScalarWhereWithAggregatesInput[]
    NOT?: SceneVideoScalarWhereWithAggregatesInput | SceneVideoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SceneVideo"> | number
    uuid?: StringWithAggregatesFilter<"SceneVideo"> | string
    user_uuid?: StringWithAggregatesFilter<"SceneVideo"> | string
    scene_uuid?: StringWithAggregatesFilter<"SceneVideo"> | string
    scene_variation_uuid?: StringWithAggregatesFilter<"SceneVideo"> | string
    provider_job_id?: StringNullableWithAggregatesFilter<"SceneVideo"> | string | null
    video_uuid?: StringNullableWithAggregatesFilter<"SceneVideo"> | string | null
    status?: EnumVideoStatusWithAggregatesFilter<"SceneVideo"> | $Enums.VideoStatus
    error_message?: StringNullableWithAggregatesFilter<"SceneVideo"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"SceneVideo"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SceneVideo"> | Date | string
  }

  export type FinalProjectWhereInput = {
    AND?: FinalProjectWhereInput | FinalProjectWhereInput[]
    OR?: FinalProjectWhereInput[]
    NOT?: FinalProjectWhereInput | FinalProjectWhereInput[]
    id?: IntFilter<"FinalProject"> | number
    uuid?: StringFilter<"FinalProject"> | string
    user_uuid?: StringFilter<"FinalProject"> | string
    project_uuid?: StringFilter<"FinalProject"> | string
    title?: StringNullableFilter<"FinalProject"> | string | null
    duration_sec?: IntNullableFilter<"FinalProject"> | number | null
    video_uuid?: StringNullableFilter<"FinalProject"> | string | null
    thumbnail_uuid?: StringNullableFilter<"FinalProject"> | string | null
    created_at?: DateTimeFilter<"FinalProject"> | Date | string
    updated_at?: DateTimeFilter<"FinalProject"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    video?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    thumbnail?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }

  export type FinalProjectOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrderInput | SortOrder
    duration_sec?: SortOrderInput | SortOrder
    video_uuid?: SortOrderInput | SortOrder
    thumbnail_uuid?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    video?: DocumentOrderByWithRelationInput
    thumbnail?: DocumentOrderByWithRelationInput
  }

  export type FinalProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: FinalProjectWhereInput | FinalProjectWhereInput[]
    OR?: FinalProjectWhereInput[]
    NOT?: FinalProjectWhereInput | FinalProjectWhereInput[]
    user_uuid?: StringFilter<"FinalProject"> | string
    project_uuid?: StringFilter<"FinalProject"> | string
    title?: StringNullableFilter<"FinalProject"> | string | null
    duration_sec?: IntNullableFilter<"FinalProject"> | number | null
    video_uuid?: StringNullableFilter<"FinalProject"> | string | null
    thumbnail_uuid?: StringNullableFilter<"FinalProject"> | string | null
    created_at?: DateTimeFilter<"FinalProject"> | Date | string
    updated_at?: DateTimeFilter<"FinalProject"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    video?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    thumbnail?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }, "id" | "uuid">

  export type FinalProjectOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrderInput | SortOrder
    duration_sec?: SortOrderInput | SortOrder
    video_uuid?: SortOrderInput | SortOrder
    thumbnail_uuid?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FinalProjectCountOrderByAggregateInput
    _avg?: FinalProjectAvgOrderByAggregateInput
    _max?: FinalProjectMaxOrderByAggregateInput
    _min?: FinalProjectMinOrderByAggregateInput
    _sum?: FinalProjectSumOrderByAggregateInput
  }

  export type FinalProjectScalarWhereWithAggregatesInput = {
    AND?: FinalProjectScalarWhereWithAggregatesInput | FinalProjectScalarWhereWithAggregatesInput[]
    OR?: FinalProjectScalarWhereWithAggregatesInput[]
    NOT?: FinalProjectScalarWhereWithAggregatesInput | FinalProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FinalProject"> | number
    uuid?: StringWithAggregatesFilter<"FinalProject"> | string
    user_uuid?: StringWithAggregatesFilter<"FinalProject"> | string
    project_uuid?: StringWithAggregatesFilter<"FinalProject"> | string
    title?: StringNullableWithAggregatesFilter<"FinalProject"> | string | null
    duration_sec?: IntNullableWithAggregatesFilter<"FinalProject"> | number | null
    video_uuid?: StringNullableWithAggregatesFilter<"FinalProject"> | string | null
    thumbnail_uuid?: StringNullableWithAggregatesFilter<"FinalProject"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"FinalProject"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FinalProject"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: IntFilter<"Document"> | number
    uuid?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    mimetype?: StringFilter<"Document"> | string
    size?: IntFilter<"Document"> | number
    url?: StringFilter<"Document"> | string
    path?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    order?: IntFilter<"Document"> | number
    created_at?: DateTimeFilter<"Document"> | Date | string
    updated_at?: DateTimeFilter<"Document"> | Date | string
    scene_videos?: SceneVideoListRelationFilter
    prompt_images?: SceneVariationListRelationFilter
    final_project_videos?: FinalProjectListRelationFilter
    final_project_thumbnails?: FinalProjectListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    filename?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    url?: SortOrder
    path?: SortOrder
    type?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    scene_videos?: SceneVideoOrderByRelationAggregateInput
    prompt_images?: SceneVariationOrderByRelationAggregateInput
    final_project_videos?: FinalProjectOrderByRelationAggregateInput
    final_project_thumbnails?: FinalProjectOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    filename?: StringFilter<"Document"> | string
    mimetype?: StringFilter<"Document"> | string
    size?: IntFilter<"Document"> | number
    url?: StringFilter<"Document"> | string
    path?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    order?: IntFilter<"Document"> | number
    created_at?: DateTimeFilter<"Document"> | Date | string
    updated_at?: DateTimeFilter<"Document"> | Date | string
    scene_videos?: SceneVideoListRelationFilter
    prompt_images?: SceneVariationListRelationFilter
    final_project_videos?: FinalProjectListRelationFilter
    final_project_thumbnails?: FinalProjectListRelationFilter
  }, "id" | "uuid">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    filename?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    url?: SortOrder
    path?: SortOrder
    type?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Document"> | number
    uuid?: StringWithAggregatesFilter<"Document"> | string
    filename?: StringWithAggregatesFilter<"Document"> | string
    mimetype?: StringWithAggregatesFilter<"Document"> | string
    size?: IntWithAggregatesFilter<"Document"> | number
    url?: StringWithAggregatesFilter<"Document"> | string
    path?: StringWithAggregatesFilter<"Document"> | string
    type?: EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType
    order?: IntWithAggregatesFilter<"Document"> | number
    created_at?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type UserCreateInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    scenes?: SceneCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    scenes?: SceneUncheckedCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    scenes?: SceneUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    scenes?: SceneCreateNestedManyWithoutProjectInput
    final_projects?: FinalProjectCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    scenes?: SceneUpdateManyWithoutProjectNestedInput
    final_projects?: FinalProjectUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneCreateInput = {
    uuid?: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScenesInput
    project: ProjectCreateNestedOneWithoutScenesInput
    scene_variations?: SceneVariationCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScenesNestedInput
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVariationCreateInput = {
    uuid?: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_variationsInput
    scene: SceneCreateNestedOneWithoutScene_variationsInput
    prompt_image?: DocumentCreateNestedOneWithoutPrompt_imagesInput
    scene_video?: SceneVideoCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    scene_video?: SceneVideoUncheckedCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_variationsNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_variationsNestedInput
    prompt_image?: DocumentUpdateOneWithoutPrompt_imagesNestedInput
    scene_video?: SceneVideoUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_video?: SceneVideoUncheckedUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVariationUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVariationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoCreateInput = {
    uuid?: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_videosInput
    scene: SceneCreateNestedOneWithoutScene_videosInput
    scene_variation?: SceneVariationCreateNestedOneWithoutScene_videoInput
    video?: DocumentCreateNestedOneWithoutScene_videosInput
  }

  export type SceneVideoUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_videosNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_videosNestedInput
    scene_variation?: SceneVariationUpdateOneWithoutScene_videoNestedInput
    video?: DocumentUpdateOneWithoutScene_videosNestedInput
  }

  export type SceneVideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectCreateInput = {
    uuid?: string
    title?: string | null
    duration_sec?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFinal_projectsInput
    project: ProjectCreateNestedOneWithoutFinal_projectsInput
    video?: DocumentCreateNestedOneWithoutFinal_project_videosInput
    thumbnail?: DocumentCreateNestedOneWithoutFinal_project_thumbnailsInput
  }

  export type FinalProjectUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFinal_projectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutFinal_projectsNestedInput
    video?: DocumentUpdateOneWithoutFinal_project_videosNestedInput
    thumbnail?: DocumentUpdateOneWithoutFinal_project_thumbnailsNestedInput
  }

  export type FinalProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationUncheckedCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectUncheckedCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectUncheckedCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUncheckedUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUncheckedUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUncheckedUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SceneListRelationFilter = {
    every?: SceneWhereInput
    some?: SceneWhereInput
    none?: SceneWhereInput
  }

  export type SceneVariationListRelationFilter = {
    every?: SceneVariationWhereInput
    some?: SceneVariationWhereInput
    none?: SceneVariationWhereInput
  }

  export type SceneVideoListRelationFilter = {
    every?: SceneVideoWhereInput
    some?: SceneVideoWhereInput
    none?: SceneVideoWhereInput
  }

  export type FinalProjectListRelationFilter = {
    every?: FinalProjectWhereInput
    some?: FinalProjectWhereInput
    none?: FinalProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneVariationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneVideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FinalProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    full_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    full_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    full_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    title?: SortOrder
    original_concept?: SortOrder
    enriched_concept?: SortOrder
    genres?: SortOrder
    tones?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    title?: SortOrder
    original_concept?: SortOrder
    enriched_concept?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    title?: SortOrder
    original_concept?: SortOrder
    enriched_concept?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type SceneProject_uuidOrderCompoundUniqueInput = {
    project_uuid: string
    order: number
  }

  export type SceneCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type SceneMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    description?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumVideoProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProvider | EnumVideoProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVideoProviderNullableFilter<$PrismaModel> | $Enums.VideoProvider | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SceneScalarRelationFilter = {
    is?: SceneWhereInput
    isNot?: SceneWhereInput
  }

  export type DocumentNullableScalarRelationFilter = {
    is?: DocumentWhereInput | null
    isNot?: DocumentWhereInput | null
  }

  export type SceneVideoNullableScalarRelationFilter = {
    is?: SceneVideoWhereInput | null
    isNot?: SceneVideoWhereInput | null
  }

  export type SceneVariationCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    title?: SortOrder
    prompt_text?: SortOrder
    negative_prompt?: SortOrder
    prompt_image_uuid?: SortOrder
    selected?: SortOrder
    style?: SortOrder
    tone?: SortOrder
    genre?: SortOrder
    camera_style?: SortOrder
    shot_type?: SortOrder
    camera_movement?: SortOrder
    lens_type?: SortOrder
    depth_of_field?: SortOrder
    lighting?: SortOrder
    color_grade?: SortOrder
    time_of_day?: SortOrder
    aspect_ratio?: SortOrder
    resolution?: SortOrder
    fps?: SortOrder
    duration_sec?: SortOrder
    ai_model?: SortOrder
    seed?: SortOrder
    creativity?: SortOrder
    motion_strength?: SortOrder
    guidance_scale?: SortOrder
    audio_style?: SortOrder
    include_sound?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVariationAvgOrderByAggregateInput = {
    id?: SortOrder
    fps?: SortOrder
    duration_sec?: SortOrder
    seed?: SortOrder
    creativity?: SortOrder
    motion_strength?: SortOrder
    guidance_scale?: SortOrder
  }

  export type SceneVariationMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    title?: SortOrder
    prompt_text?: SortOrder
    negative_prompt?: SortOrder
    prompt_image_uuid?: SortOrder
    selected?: SortOrder
    style?: SortOrder
    tone?: SortOrder
    genre?: SortOrder
    camera_style?: SortOrder
    shot_type?: SortOrder
    camera_movement?: SortOrder
    lens_type?: SortOrder
    depth_of_field?: SortOrder
    lighting?: SortOrder
    color_grade?: SortOrder
    time_of_day?: SortOrder
    aspect_ratio?: SortOrder
    resolution?: SortOrder
    fps?: SortOrder
    duration_sec?: SortOrder
    ai_model?: SortOrder
    seed?: SortOrder
    creativity?: SortOrder
    motion_strength?: SortOrder
    guidance_scale?: SortOrder
    audio_style?: SortOrder
    include_sound?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVariationMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    title?: SortOrder
    prompt_text?: SortOrder
    negative_prompt?: SortOrder
    prompt_image_uuid?: SortOrder
    selected?: SortOrder
    style?: SortOrder
    tone?: SortOrder
    genre?: SortOrder
    camera_style?: SortOrder
    shot_type?: SortOrder
    camera_movement?: SortOrder
    lens_type?: SortOrder
    depth_of_field?: SortOrder
    lighting?: SortOrder
    color_grade?: SortOrder
    time_of_day?: SortOrder
    aspect_ratio?: SortOrder
    resolution?: SortOrder
    fps?: SortOrder
    duration_sec?: SortOrder
    ai_model?: SortOrder
    seed?: SortOrder
    creativity?: SortOrder
    motion_strength?: SortOrder
    guidance_scale?: SortOrder
    audio_style?: SortOrder
    include_sound?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVariationSumOrderByAggregateInput = {
    id?: SortOrder
    fps?: SortOrder
    duration_sec?: SortOrder
    seed?: SortOrder
    creativity?: SortOrder
    motion_strength?: SortOrder
    guidance_scale?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumVideoProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProvider | EnumVideoProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVideoProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.VideoProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVideoProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumVideoProviderNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type SceneVariationNullableScalarRelationFilter = {
    is?: SceneVariationWhereInput | null
    isNot?: SceneVariationWhereInput | null
  }

  export type SceneVideoCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    scene_variation_uuid?: SortOrder
    provider_job_id?: SortOrder
    video_uuid?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVideoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SceneVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    scene_variation_uuid?: SortOrder
    provider_job_id?: SortOrder
    video_uuid?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVideoMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    scene_uuid?: SortOrder
    scene_variation_uuid?: SortOrder
    provider_job_id?: SortOrder
    video_uuid?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SceneVideoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type FinalProjectCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    duration_sec?: SortOrder
    video_uuid?: SortOrder
    thumbnail_uuid?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FinalProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    duration_sec?: SortOrder
  }

  export type FinalProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    duration_sec?: SortOrder
    video_uuid?: SortOrder
    thumbnail_uuid?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FinalProjectMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    project_uuid?: SortOrder
    title?: SortOrder
    duration_sec?: SortOrder
    video_uuid?: SortOrder
    thumbnail_uuid?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FinalProjectSumOrderByAggregateInput = {
    id?: SortOrder
    duration_sec?: SortOrder
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    filename?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    url?: SortOrder
    path?: SortOrder
    type?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    order?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    filename?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    url?: SortOrder
    path?: SortOrder
    type?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    filename?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    url?: SortOrder
    path?: SortOrder
    type?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    order?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SceneCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput> | SceneCreateWithoutUserInput[] | SceneUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutUserInput | SceneCreateOrConnectWithoutUserInput[]
    createMany?: SceneCreateManyUserInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type SceneVariationCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput> | SceneVariationCreateWithoutUserInput[] | SceneVariationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutUserInput | SceneVariationCreateOrConnectWithoutUserInput[]
    createMany?: SceneVariationCreateManyUserInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type SceneVideoCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput> | SceneVideoCreateWithoutUserInput[] | SceneVideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutUserInput | SceneVideoCreateOrConnectWithoutUserInput[]
    createMany?: SceneVideoCreateManyUserInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type FinalProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput> | FinalProjectCreateWithoutUserInput[] | FinalProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutUserInput | FinalProjectCreateOrConnectWithoutUserInput[]
    createMany?: FinalProjectCreateManyUserInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SceneUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput> | SceneCreateWithoutUserInput[] | SceneUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutUserInput | SceneCreateOrConnectWithoutUserInput[]
    createMany?: SceneCreateManyUserInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type SceneVariationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput> | SceneVariationCreateWithoutUserInput[] | SceneVariationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutUserInput | SceneVariationCreateOrConnectWithoutUserInput[]
    createMany?: SceneVariationCreateManyUserInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type SceneVideoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput> | SceneVideoCreateWithoutUserInput[] | SceneVideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutUserInput | SceneVideoCreateOrConnectWithoutUserInput[]
    createMany?: SceneVideoCreateManyUserInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type FinalProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput> | FinalProjectCreateWithoutUserInput[] | FinalProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutUserInput | FinalProjectCreateOrConnectWithoutUserInput[]
    createMany?: FinalProjectCreateManyUserInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthRoleFieldUpdateOperationsInput = {
    set?: $Enums.AuthRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SceneUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput> | SceneCreateWithoutUserInput[] | SceneUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutUserInput | SceneCreateOrConnectWithoutUserInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutUserInput | SceneUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneCreateManyUserInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutUserInput | SceneUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutUserInput | SceneUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type SceneVariationUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput> | SceneVariationCreateWithoutUserInput[] | SceneVariationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutUserInput | SceneVariationCreateOrConnectWithoutUserInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutUserInput | SceneVariationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneVariationCreateManyUserInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutUserInput | SceneVariationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutUserInput | SceneVariationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type SceneVideoUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput> | SceneVideoCreateWithoutUserInput[] | SceneVideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutUserInput | SceneVideoCreateOrConnectWithoutUserInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutUserInput | SceneVideoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneVideoCreateManyUserInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutUserInput | SceneVideoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutUserInput | SceneVideoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type FinalProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput> | FinalProjectCreateWithoutUserInput[] | FinalProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutUserInput | FinalProjectCreateOrConnectWithoutUserInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutUserInput | FinalProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FinalProjectCreateManyUserInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutUserInput | FinalProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutUserInput | FinalProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SceneUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput> | SceneCreateWithoutUserInput[] | SceneUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutUserInput | SceneCreateOrConnectWithoutUserInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutUserInput | SceneUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneCreateManyUserInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutUserInput | SceneUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutUserInput | SceneUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type SceneVariationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput> | SceneVariationCreateWithoutUserInput[] | SceneVariationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutUserInput | SceneVariationCreateOrConnectWithoutUserInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutUserInput | SceneVariationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneVariationCreateManyUserInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutUserInput | SceneVariationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutUserInput | SceneVariationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type SceneVideoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput> | SceneVideoCreateWithoutUserInput[] | SceneVideoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutUserInput | SceneVideoCreateOrConnectWithoutUserInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutUserInput | SceneVideoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SceneVideoCreateManyUserInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutUserInput | SceneVideoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutUserInput | SceneVideoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type FinalProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput> | FinalProjectCreateWithoutUserInput[] | FinalProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutUserInput | FinalProjectCreateOrConnectWithoutUserInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutUserInput | FinalProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FinalProjectCreateManyUserInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutUserInput | FinalProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutUserInput | FinalProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type SceneCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type FinalProjectCreateNestedManyWithoutProjectInput = {
    create?: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput> | FinalProjectCreateWithoutProjectInput[] | FinalProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutProjectInput | FinalProjectCreateOrConnectWithoutProjectInput[]
    createMany?: FinalProjectCreateManyProjectInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type SceneUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type FinalProjectUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput> | FinalProjectCreateWithoutProjectInput[] | FinalProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutProjectInput | FinalProjectCreateOrConnectWithoutProjectInput[]
    createMany?: FinalProjectCreateManyProjectInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type SceneUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type FinalProjectUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput> | FinalProjectCreateWithoutProjectInput[] | FinalProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutProjectInput | FinalProjectCreateOrConnectWithoutProjectInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutProjectInput | FinalProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FinalProjectCreateManyProjectInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutProjectInput | FinalProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutProjectInput | FinalProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type SceneUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type FinalProjectUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput> | FinalProjectCreateWithoutProjectInput[] | FinalProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutProjectInput | FinalProjectCreateOrConnectWithoutProjectInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutProjectInput | FinalProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FinalProjectCreateManyProjectInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutProjectInput | FinalProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutProjectInput | FinalProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutScenesInput = {
    create?: XOR<UserCreateWithoutScenesInput, UserUncheckedCreateWithoutScenesInput>
    connectOrCreate?: UserCreateOrConnectWithoutScenesInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutScenesInput = {
    create?: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScenesInput
    connect?: ProjectWhereUniqueInput
  }

  export type SceneVariationCreateNestedManyWithoutSceneInput = {
    create?: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput> | SceneVariationCreateWithoutSceneInput[] | SceneVariationUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutSceneInput | SceneVariationCreateOrConnectWithoutSceneInput[]
    createMany?: SceneVariationCreateManySceneInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type SceneVideoCreateNestedManyWithoutSceneInput = {
    create?: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput> | SceneVideoCreateWithoutSceneInput[] | SceneVideoUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutSceneInput | SceneVideoCreateOrConnectWithoutSceneInput[]
    createMany?: SceneVideoCreateManySceneInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type SceneVariationUncheckedCreateNestedManyWithoutSceneInput = {
    create?: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput> | SceneVariationCreateWithoutSceneInput[] | SceneVariationUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutSceneInput | SceneVariationCreateOrConnectWithoutSceneInput[]
    createMany?: SceneVariationCreateManySceneInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type SceneVideoUncheckedCreateNestedManyWithoutSceneInput = {
    create?: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput> | SceneVideoCreateWithoutSceneInput[] | SceneVideoUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutSceneInput | SceneVideoCreateOrConnectWithoutSceneInput[]
    createMany?: SceneVideoCreateManySceneInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutScenesNestedInput = {
    create?: XOR<UserCreateWithoutScenesInput, UserUncheckedCreateWithoutScenesInput>
    connectOrCreate?: UserCreateOrConnectWithoutScenesInput
    upsert?: UserUpsertWithoutScenesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScenesInput, UserUpdateWithoutScenesInput>, UserUncheckedUpdateWithoutScenesInput>
  }

  export type ProjectUpdateOneRequiredWithoutScenesNestedInput = {
    create?: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScenesInput
    upsert?: ProjectUpsertWithoutScenesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutScenesInput, ProjectUpdateWithoutScenesInput>, ProjectUncheckedUpdateWithoutScenesInput>
  }

  export type SceneVariationUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput> | SceneVariationCreateWithoutSceneInput[] | SceneVariationUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutSceneInput | SceneVariationCreateOrConnectWithoutSceneInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutSceneInput | SceneVariationUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SceneVariationCreateManySceneInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutSceneInput | SceneVariationUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutSceneInput | SceneVariationUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type SceneVideoUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput> | SceneVideoCreateWithoutSceneInput[] | SceneVideoUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutSceneInput | SceneVideoCreateOrConnectWithoutSceneInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutSceneInput | SceneVideoUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SceneVideoCreateManySceneInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutSceneInput | SceneVideoUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutSceneInput | SceneVideoUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type SceneVariationUncheckedUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput> | SceneVariationCreateWithoutSceneInput[] | SceneVariationUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutSceneInput | SceneVariationCreateOrConnectWithoutSceneInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutSceneInput | SceneVariationUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SceneVariationCreateManySceneInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutSceneInput | SceneVariationUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutSceneInput | SceneVariationUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type SceneVideoUncheckedUpdateManyWithoutSceneNestedInput = {
    create?: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput> | SceneVideoCreateWithoutSceneInput[] | SceneVideoUncheckedCreateWithoutSceneInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutSceneInput | SceneVideoCreateOrConnectWithoutSceneInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutSceneInput | SceneVideoUpsertWithWhereUniqueWithoutSceneInput[]
    createMany?: SceneVideoCreateManySceneInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutSceneInput | SceneVideoUpdateWithWhereUniqueWithoutSceneInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutSceneInput | SceneVideoUpdateManyWithWhereWithoutSceneInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutScene_variationsInput = {
    create?: XOR<UserCreateWithoutScene_variationsInput, UserUncheckedCreateWithoutScene_variationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScene_variationsInput
    connect?: UserWhereUniqueInput
  }

  export type SceneCreateNestedOneWithoutScene_variationsInput = {
    create?: XOR<SceneCreateWithoutScene_variationsInput, SceneUncheckedCreateWithoutScene_variationsInput>
    connectOrCreate?: SceneCreateOrConnectWithoutScene_variationsInput
    connect?: SceneWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutPrompt_imagesInput = {
    create?: XOR<DocumentCreateWithoutPrompt_imagesInput, DocumentUncheckedCreateWithoutPrompt_imagesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPrompt_imagesInput
    connect?: DocumentWhereUniqueInput
  }

  export type SceneVideoCreateNestedOneWithoutScene_variationInput = {
    create?: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
    connectOrCreate?: SceneVideoCreateOrConnectWithoutScene_variationInput
    connect?: SceneVideoWhereUniqueInput
  }

  export type SceneVideoUncheckedCreateNestedOneWithoutScene_variationInput = {
    create?: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
    connectOrCreate?: SceneVideoCreateOrConnectWithoutScene_variationInput
    connect?: SceneVideoWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumVideoProviderFieldUpdateOperationsInput = {
    set?: $Enums.VideoProvider | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutScene_variationsNestedInput = {
    create?: XOR<UserCreateWithoutScene_variationsInput, UserUncheckedCreateWithoutScene_variationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScene_variationsInput
    upsert?: UserUpsertWithoutScene_variationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScene_variationsInput, UserUpdateWithoutScene_variationsInput>, UserUncheckedUpdateWithoutScene_variationsInput>
  }

  export type SceneUpdateOneRequiredWithoutScene_variationsNestedInput = {
    create?: XOR<SceneCreateWithoutScene_variationsInput, SceneUncheckedCreateWithoutScene_variationsInput>
    connectOrCreate?: SceneCreateOrConnectWithoutScene_variationsInput
    upsert?: SceneUpsertWithoutScene_variationsInput
    connect?: SceneWhereUniqueInput
    update?: XOR<XOR<SceneUpdateToOneWithWhereWithoutScene_variationsInput, SceneUpdateWithoutScene_variationsInput>, SceneUncheckedUpdateWithoutScene_variationsInput>
  }

  export type DocumentUpdateOneWithoutPrompt_imagesNestedInput = {
    create?: XOR<DocumentCreateWithoutPrompt_imagesInput, DocumentUncheckedCreateWithoutPrompt_imagesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPrompt_imagesInput
    upsert?: DocumentUpsertWithoutPrompt_imagesInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutPrompt_imagesInput, DocumentUpdateWithoutPrompt_imagesInput>, DocumentUncheckedUpdateWithoutPrompt_imagesInput>
  }

  export type SceneVideoUpdateOneWithoutScene_variationNestedInput = {
    create?: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
    connectOrCreate?: SceneVideoCreateOrConnectWithoutScene_variationInput
    upsert?: SceneVideoUpsertWithoutScene_variationInput
    disconnect?: SceneVideoWhereInput | boolean
    delete?: SceneVideoWhereInput | boolean
    connect?: SceneVideoWhereUniqueInput
    update?: XOR<XOR<SceneVideoUpdateToOneWithWhereWithoutScene_variationInput, SceneVideoUpdateWithoutScene_variationInput>, SceneVideoUncheckedUpdateWithoutScene_variationInput>
  }

  export type SceneVideoUncheckedUpdateOneWithoutScene_variationNestedInput = {
    create?: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
    connectOrCreate?: SceneVideoCreateOrConnectWithoutScene_variationInput
    upsert?: SceneVideoUpsertWithoutScene_variationInput
    disconnect?: SceneVideoWhereInput | boolean
    delete?: SceneVideoWhereInput | boolean
    connect?: SceneVideoWhereUniqueInput
    update?: XOR<XOR<SceneVideoUpdateToOneWithWhereWithoutScene_variationInput, SceneVideoUpdateWithoutScene_variationInput>, SceneVideoUncheckedUpdateWithoutScene_variationInput>
  }

  export type UserCreateNestedOneWithoutScene_videosInput = {
    create?: XOR<UserCreateWithoutScene_videosInput, UserUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: UserCreateOrConnectWithoutScene_videosInput
    connect?: UserWhereUniqueInput
  }

  export type SceneCreateNestedOneWithoutScene_videosInput = {
    create?: XOR<SceneCreateWithoutScene_videosInput, SceneUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: SceneCreateOrConnectWithoutScene_videosInput
    connect?: SceneWhereUniqueInput
  }

  export type SceneVariationCreateNestedOneWithoutScene_videoInput = {
    create?: XOR<SceneVariationCreateWithoutScene_videoInput, SceneVariationUncheckedCreateWithoutScene_videoInput>
    connectOrCreate?: SceneVariationCreateOrConnectWithoutScene_videoInput
    connect?: SceneVariationWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutScene_videosInput = {
    create?: XOR<DocumentCreateWithoutScene_videosInput, DocumentUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutScene_videosInput
    connect?: DocumentWhereUniqueInput
  }

  export type EnumVideoStatusFieldUpdateOperationsInput = {
    set?: $Enums.VideoStatus
  }

  export type UserUpdateOneRequiredWithoutScene_videosNestedInput = {
    create?: XOR<UserCreateWithoutScene_videosInput, UserUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: UserCreateOrConnectWithoutScene_videosInput
    upsert?: UserUpsertWithoutScene_videosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScene_videosInput, UserUpdateWithoutScene_videosInput>, UserUncheckedUpdateWithoutScene_videosInput>
  }

  export type SceneUpdateOneRequiredWithoutScene_videosNestedInput = {
    create?: XOR<SceneCreateWithoutScene_videosInput, SceneUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: SceneCreateOrConnectWithoutScene_videosInput
    upsert?: SceneUpsertWithoutScene_videosInput
    connect?: SceneWhereUniqueInput
    update?: XOR<XOR<SceneUpdateToOneWithWhereWithoutScene_videosInput, SceneUpdateWithoutScene_videosInput>, SceneUncheckedUpdateWithoutScene_videosInput>
  }

  export type SceneVariationUpdateOneWithoutScene_videoNestedInput = {
    create?: XOR<SceneVariationCreateWithoutScene_videoInput, SceneVariationUncheckedCreateWithoutScene_videoInput>
    connectOrCreate?: SceneVariationCreateOrConnectWithoutScene_videoInput
    upsert?: SceneVariationUpsertWithoutScene_videoInput
    disconnect?: SceneVariationWhereInput | boolean
    delete?: SceneVariationWhereInput | boolean
    connect?: SceneVariationWhereUniqueInput
    update?: XOR<XOR<SceneVariationUpdateToOneWithWhereWithoutScene_videoInput, SceneVariationUpdateWithoutScene_videoInput>, SceneVariationUncheckedUpdateWithoutScene_videoInput>
  }

  export type DocumentUpdateOneWithoutScene_videosNestedInput = {
    create?: XOR<DocumentCreateWithoutScene_videosInput, DocumentUncheckedCreateWithoutScene_videosInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutScene_videosInput
    upsert?: DocumentUpsertWithoutScene_videosInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutScene_videosInput, DocumentUpdateWithoutScene_videosInput>, DocumentUncheckedUpdateWithoutScene_videosInput>
  }

  export type UserCreateNestedOneWithoutFinal_projectsInput = {
    create?: XOR<UserCreateWithoutFinal_projectsInput, UserUncheckedCreateWithoutFinal_projectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFinal_projectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutFinal_projectsInput = {
    create?: XOR<ProjectCreateWithoutFinal_projectsInput, ProjectUncheckedCreateWithoutFinal_projectsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFinal_projectsInput
    connect?: ProjectWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutFinal_project_videosInput = {
    create?: XOR<DocumentCreateWithoutFinal_project_videosInput, DocumentUncheckedCreateWithoutFinal_project_videosInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutFinal_project_videosInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutFinal_project_thumbnailsInput = {
    create?: XOR<DocumentCreateWithoutFinal_project_thumbnailsInput, DocumentUncheckedCreateWithoutFinal_project_thumbnailsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutFinal_project_thumbnailsInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFinal_projectsNestedInput = {
    create?: XOR<UserCreateWithoutFinal_projectsInput, UserUncheckedCreateWithoutFinal_projectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFinal_projectsInput
    upsert?: UserUpsertWithoutFinal_projectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFinal_projectsInput, UserUpdateWithoutFinal_projectsInput>, UserUncheckedUpdateWithoutFinal_projectsInput>
  }

  export type ProjectUpdateOneRequiredWithoutFinal_projectsNestedInput = {
    create?: XOR<ProjectCreateWithoutFinal_projectsInput, ProjectUncheckedCreateWithoutFinal_projectsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFinal_projectsInput
    upsert?: ProjectUpsertWithoutFinal_projectsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutFinal_projectsInput, ProjectUpdateWithoutFinal_projectsInput>, ProjectUncheckedUpdateWithoutFinal_projectsInput>
  }

  export type DocumentUpdateOneWithoutFinal_project_videosNestedInput = {
    create?: XOR<DocumentCreateWithoutFinal_project_videosInput, DocumentUncheckedCreateWithoutFinal_project_videosInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutFinal_project_videosInput
    upsert?: DocumentUpsertWithoutFinal_project_videosInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutFinal_project_videosInput, DocumentUpdateWithoutFinal_project_videosInput>, DocumentUncheckedUpdateWithoutFinal_project_videosInput>
  }

  export type DocumentUpdateOneWithoutFinal_project_thumbnailsNestedInput = {
    create?: XOR<DocumentCreateWithoutFinal_project_thumbnailsInput, DocumentUncheckedCreateWithoutFinal_project_thumbnailsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutFinal_project_thumbnailsInput
    upsert?: DocumentUpsertWithoutFinal_project_thumbnailsInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutFinal_project_thumbnailsInput, DocumentUpdateWithoutFinal_project_thumbnailsInput>, DocumentUncheckedUpdateWithoutFinal_project_thumbnailsInput>
  }

  export type SceneVideoCreateNestedManyWithoutVideoInput = {
    create?: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput> | SceneVideoCreateWithoutVideoInput[] | SceneVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutVideoInput | SceneVideoCreateOrConnectWithoutVideoInput[]
    createMany?: SceneVideoCreateManyVideoInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type SceneVariationCreateNestedManyWithoutPrompt_imageInput = {
    create?: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput> | SceneVariationCreateWithoutPrompt_imageInput[] | SceneVariationUncheckedCreateWithoutPrompt_imageInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutPrompt_imageInput | SceneVariationCreateOrConnectWithoutPrompt_imageInput[]
    createMany?: SceneVariationCreateManyPrompt_imageInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type FinalProjectCreateNestedManyWithoutVideoInput = {
    create?: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput> | FinalProjectCreateWithoutVideoInput[] | FinalProjectUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutVideoInput | FinalProjectCreateOrConnectWithoutVideoInput[]
    createMany?: FinalProjectCreateManyVideoInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type FinalProjectCreateNestedManyWithoutThumbnailInput = {
    create?: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput> | FinalProjectCreateWithoutThumbnailInput[] | FinalProjectUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutThumbnailInput | FinalProjectCreateOrConnectWithoutThumbnailInput[]
    createMany?: FinalProjectCreateManyThumbnailInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type SceneVideoUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput> | SceneVideoCreateWithoutVideoInput[] | SceneVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutVideoInput | SceneVideoCreateOrConnectWithoutVideoInput[]
    createMany?: SceneVideoCreateManyVideoInputEnvelope
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
  }

  export type SceneVariationUncheckedCreateNestedManyWithoutPrompt_imageInput = {
    create?: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput> | SceneVariationCreateWithoutPrompt_imageInput[] | SceneVariationUncheckedCreateWithoutPrompt_imageInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutPrompt_imageInput | SceneVariationCreateOrConnectWithoutPrompt_imageInput[]
    createMany?: SceneVariationCreateManyPrompt_imageInputEnvelope
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
  }

  export type FinalProjectUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput> | FinalProjectCreateWithoutVideoInput[] | FinalProjectUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutVideoInput | FinalProjectCreateOrConnectWithoutVideoInput[]
    createMany?: FinalProjectCreateManyVideoInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type FinalProjectUncheckedCreateNestedManyWithoutThumbnailInput = {
    create?: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput> | FinalProjectCreateWithoutThumbnailInput[] | FinalProjectUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutThumbnailInput | FinalProjectCreateOrConnectWithoutThumbnailInput[]
    createMany?: FinalProjectCreateManyThumbnailInputEnvelope
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type SceneVideoUpdateManyWithoutVideoNestedInput = {
    create?: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput> | SceneVideoCreateWithoutVideoInput[] | SceneVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutVideoInput | SceneVideoCreateOrConnectWithoutVideoInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutVideoInput | SceneVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: SceneVideoCreateManyVideoInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutVideoInput | SceneVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutVideoInput | SceneVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type SceneVariationUpdateManyWithoutPrompt_imageNestedInput = {
    create?: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput> | SceneVariationCreateWithoutPrompt_imageInput[] | SceneVariationUncheckedCreateWithoutPrompt_imageInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutPrompt_imageInput | SceneVariationCreateOrConnectWithoutPrompt_imageInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutPrompt_imageInput | SceneVariationUpsertWithWhereUniqueWithoutPrompt_imageInput[]
    createMany?: SceneVariationCreateManyPrompt_imageInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutPrompt_imageInput | SceneVariationUpdateWithWhereUniqueWithoutPrompt_imageInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutPrompt_imageInput | SceneVariationUpdateManyWithWhereWithoutPrompt_imageInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type FinalProjectUpdateManyWithoutVideoNestedInput = {
    create?: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput> | FinalProjectCreateWithoutVideoInput[] | FinalProjectUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutVideoInput | FinalProjectCreateOrConnectWithoutVideoInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutVideoInput | FinalProjectUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: FinalProjectCreateManyVideoInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutVideoInput | FinalProjectUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutVideoInput | FinalProjectUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type FinalProjectUpdateManyWithoutThumbnailNestedInput = {
    create?: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput> | FinalProjectCreateWithoutThumbnailInput[] | FinalProjectUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutThumbnailInput | FinalProjectCreateOrConnectWithoutThumbnailInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutThumbnailInput | FinalProjectUpsertWithWhereUniqueWithoutThumbnailInput[]
    createMany?: FinalProjectCreateManyThumbnailInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutThumbnailInput | FinalProjectUpdateWithWhereUniqueWithoutThumbnailInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutThumbnailInput | FinalProjectUpdateManyWithWhereWithoutThumbnailInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type SceneVideoUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput> | SceneVideoCreateWithoutVideoInput[] | SceneVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: SceneVideoCreateOrConnectWithoutVideoInput | SceneVideoCreateOrConnectWithoutVideoInput[]
    upsert?: SceneVideoUpsertWithWhereUniqueWithoutVideoInput | SceneVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: SceneVideoCreateManyVideoInputEnvelope
    set?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    disconnect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    delete?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    connect?: SceneVideoWhereUniqueInput | SceneVideoWhereUniqueInput[]
    update?: SceneVideoUpdateWithWhereUniqueWithoutVideoInput | SceneVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: SceneVideoUpdateManyWithWhereWithoutVideoInput | SceneVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
  }

  export type SceneVariationUncheckedUpdateManyWithoutPrompt_imageNestedInput = {
    create?: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput> | SceneVariationCreateWithoutPrompt_imageInput[] | SceneVariationUncheckedCreateWithoutPrompt_imageInput[]
    connectOrCreate?: SceneVariationCreateOrConnectWithoutPrompt_imageInput | SceneVariationCreateOrConnectWithoutPrompt_imageInput[]
    upsert?: SceneVariationUpsertWithWhereUniqueWithoutPrompt_imageInput | SceneVariationUpsertWithWhereUniqueWithoutPrompt_imageInput[]
    createMany?: SceneVariationCreateManyPrompt_imageInputEnvelope
    set?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    disconnect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    delete?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    connect?: SceneVariationWhereUniqueInput | SceneVariationWhereUniqueInput[]
    update?: SceneVariationUpdateWithWhereUniqueWithoutPrompt_imageInput | SceneVariationUpdateWithWhereUniqueWithoutPrompt_imageInput[]
    updateMany?: SceneVariationUpdateManyWithWhereWithoutPrompt_imageInput | SceneVariationUpdateManyWithWhereWithoutPrompt_imageInput[]
    deleteMany?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
  }

  export type FinalProjectUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput> | FinalProjectCreateWithoutVideoInput[] | FinalProjectUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutVideoInput | FinalProjectCreateOrConnectWithoutVideoInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutVideoInput | FinalProjectUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: FinalProjectCreateManyVideoInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutVideoInput | FinalProjectUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutVideoInput | FinalProjectUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type FinalProjectUncheckedUpdateManyWithoutThumbnailNestedInput = {
    create?: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput> | FinalProjectCreateWithoutThumbnailInput[] | FinalProjectUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: FinalProjectCreateOrConnectWithoutThumbnailInput | FinalProjectCreateOrConnectWithoutThumbnailInput[]
    upsert?: FinalProjectUpsertWithWhereUniqueWithoutThumbnailInput | FinalProjectUpsertWithWhereUniqueWithoutThumbnailInput[]
    createMany?: FinalProjectCreateManyThumbnailInputEnvelope
    set?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    disconnect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    delete?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    connect?: FinalProjectWhereUniqueInput | FinalProjectWhereUniqueInput[]
    update?: FinalProjectUpdateWithWhereUniqueWithoutThumbnailInput | FinalProjectUpdateWithWhereUniqueWithoutThumbnailInput[]
    updateMany?: FinalProjectUpdateManyWithWhereWithoutThumbnailInput | FinalProjectUpdateManyWithWhereWithoutThumbnailInput[]
    deleteMany?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumVideoProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProvider | EnumVideoProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVideoProviderNullableFilter<$PrismaModel> | $Enums.VideoProvider | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumVideoProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoProvider | EnumVideoProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VideoProvider[] | ListEnumVideoProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVideoProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.VideoProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVideoProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumVideoProviderNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutUserInput = {
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneCreateNestedManyWithoutProjectInput
    final_projects?: FinalProjectCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SceneCreateWithoutUserInput = {
    uuid?: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutScenesInput
    scene_variations?: SceneVariationCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneCreateOrConnectWithoutUserInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput>
  }

  export type SceneCreateManyUserInputEnvelope = {
    data: SceneCreateManyUserInput | SceneCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SceneVariationCreateWithoutUserInput = {
    uuid?: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    scene: SceneCreateNestedOneWithoutScene_variationsInput
    prompt_image?: DocumentCreateNestedOneWithoutPrompt_imagesInput
    scene_video?: SceneVideoCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    scene_video?: SceneVideoUncheckedCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationCreateOrConnectWithoutUserInput = {
    where: SceneVariationWhereUniqueInput
    create: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput>
  }

  export type SceneVariationCreateManyUserInputEnvelope = {
    data: SceneVariationCreateManyUserInput | SceneVariationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SceneVideoCreateWithoutUserInput = {
    uuid?: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    scene: SceneCreateNestedOneWithoutScene_videosInput
    scene_variation?: SceneVariationCreateNestedOneWithoutScene_videoInput
    video?: DocumentCreateNestedOneWithoutScene_videosInput
  }

  export type SceneVideoUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateOrConnectWithoutUserInput = {
    where: SceneVideoWhereUniqueInput
    create: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput>
  }

  export type SceneVideoCreateManyUserInputEnvelope = {
    data: SceneVideoCreateManyUserInput | SceneVideoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FinalProjectCreateWithoutUserInput = {
    uuid?: string
    title?: string | null
    duration_sec?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutFinal_projectsInput
    video?: DocumentCreateNestedOneWithoutFinal_project_videosInput
    thumbnail?: DocumentCreateNestedOneWithoutFinal_project_thumbnailsInput
  }

  export type FinalProjectUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateOrConnectWithoutUserInput = {
    where: FinalProjectWhereUniqueInput
    create: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput>
  }

  export type FinalProjectCreateManyUserInputEnvelope = {
    data: FinalProjectCreateManyUserInput | FinalProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    uuid?: StringFilter<"Project"> | string
    user_uuid?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    original_concept?: StringFilter<"Project"> | string
    enriched_concept?: StringNullableFilter<"Project"> | string | null
    genres?: JsonNullableFilter<"Project">
    tones?: JsonNullableFilter<"Project">
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
  }

  export type SceneUpsertWithWhereUniqueWithoutUserInput = {
    where: SceneWhereUniqueInput
    update: XOR<SceneUpdateWithoutUserInput, SceneUncheckedUpdateWithoutUserInput>
    create: XOR<SceneCreateWithoutUserInput, SceneUncheckedCreateWithoutUserInput>
  }

  export type SceneUpdateWithWhereUniqueWithoutUserInput = {
    where: SceneWhereUniqueInput
    data: XOR<SceneUpdateWithoutUserInput, SceneUncheckedUpdateWithoutUserInput>
  }

  export type SceneUpdateManyWithWhereWithoutUserInput = {
    where: SceneScalarWhereInput
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyWithoutUserInput>
  }

  export type SceneScalarWhereInput = {
    AND?: SceneScalarWhereInput | SceneScalarWhereInput[]
    OR?: SceneScalarWhereInput[]
    NOT?: SceneScalarWhereInput | SceneScalarWhereInput[]
    id?: IntFilter<"Scene"> | number
    uuid?: StringFilter<"Scene"> | string
    user_uuid?: StringFilter<"Scene"> | string
    project_uuid?: StringFilter<"Scene"> | string
    title?: StringFilter<"Scene"> | string
    description?: StringNullableFilter<"Scene"> | string | null
    order?: IntFilter<"Scene"> | number
    created_at?: DateTimeFilter<"Scene"> | Date | string
    updated_at?: DateTimeFilter<"Scene"> | Date | string
  }

  export type SceneVariationUpsertWithWhereUniqueWithoutUserInput = {
    where: SceneVariationWhereUniqueInput
    update: XOR<SceneVariationUpdateWithoutUserInput, SceneVariationUncheckedUpdateWithoutUserInput>
    create: XOR<SceneVariationCreateWithoutUserInput, SceneVariationUncheckedCreateWithoutUserInput>
  }

  export type SceneVariationUpdateWithWhereUniqueWithoutUserInput = {
    where: SceneVariationWhereUniqueInput
    data: XOR<SceneVariationUpdateWithoutUserInput, SceneVariationUncheckedUpdateWithoutUserInput>
  }

  export type SceneVariationUpdateManyWithWhereWithoutUserInput = {
    where: SceneVariationScalarWhereInput
    data: XOR<SceneVariationUpdateManyMutationInput, SceneVariationUncheckedUpdateManyWithoutUserInput>
  }

  export type SceneVariationScalarWhereInput = {
    AND?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
    OR?: SceneVariationScalarWhereInput[]
    NOT?: SceneVariationScalarWhereInput | SceneVariationScalarWhereInput[]
    id?: IntFilter<"SceneVariation"> | number
    uuid?: StringFilter<"SceneVariation"> | string
    user_uuid?: StringFilter<"SceneVariation"> | string
    scene_uuid?: StringFilter<"SceneVariation"> | string
    title?: StringFilter<"SceneVariation"> | string
    prompt_text?: StringNullableFilter<"SceneVariation"> | string | null
    negative_prompt?: StringNullableFilter<"SceneVariation"> | string | null
    prompt_image_uuid?: StringNullableFilter<"SceneVariation"> | string | null
    selected?: BoolFilter<"SceneVariation"> | boolean
    style?: StringNullableFilter<"SceneVariation"> | string | null
    tone?: StringNullableFilter<"SceneVariation"> | string | null
    genre?: StringNullableFilter<"SceneVariation"> | string | null
    camera_style?: StringNullableFilter<"SceneVariation"> | string | null
    shot_type?: StringNullableFilter<"SceneVariation"> | string | null
    camera_movement?: StringNullableFilter<"SceneVariation"> | string | null
    lens_type?: StringNullableFilter<"SceneVariation"> | string | null
    depth_of_field?: StringNullableFilter<"SceneVariation"> | string | null
    lighting?: StringNullableFilter<"SceneVariation"> | string | null
    color_grade?: StringNullableFilter<"SceneVariation"> | string | null
    time_of_day?: StringNullableFilter<"SceneVariation"> | string | null
    aspect_ratio?: StringNullableFilter<"SceneVariation"> | string | null
    resolution?: StringNullableFilter<"SceneVariation"> | string | null
    fps?: IntNullableFilter<"SceneVariation"> | number | null
    duration_sec?: IntNullableFilter<"SceneVariation"> | number | null
    ai_model?: EnumVideoProviderNullableFilter<"SceneVariation"> | $Enums.VideoProvider | null
    seed?: IntNullableFilter<"SceneVariation"> | number | null
    creativity?: FloatNullableFilter<"SceneVariation"> | number | null
    motion_strength?: FloatNullableFilter<"SceneVariation"> | number | null
    guidance_scale?: FloatNullableFilter<"SceneVariation"> | number | null
    audio_style?: StringNullableFilter<"SceneVariation"> | string | null
    include_sound?: BoolFilter<"SceneVariation"> | boolean
    created_at?: DateTimeFilter<"SceneVariation"> | Date | string
    updated_at?: DateTimeFilter<"SceneVariation"> | Date | string
  }

  export type SceneVideoUpsertWithWhereUniqueWithoutUserInput = {
    where: SceneVideoWhereUniqueInput
    update: XOR<SceneVideoUpdateWithoutUserInput, SceneVideoUncheckedUpdateWithoutUserInput>
    create: XOR<SceneVideoCreateWithoutUserInput, SceneVideoUncheckedCreateWithoutUserInput>
  }

  export type SceneVideoUpdateWithWhereUniqueWithoutUserInput = {
    where: SceneVideoWhereUniqueInput
    data: XOR<SceneVideoUpdateWithoutUserInput, SceneVideoUncheckedUpdateWithoutUserInput>
  }

  export type SceneVideoUpdateManyWithWhereWithoutUserInput = {
    where: SceneVideoScalarWhereInput
    data: XOR<SceneVideoUpdateManyMutationInput, SceneVideoUncheckedUpdateManyWithoutUserInput>
  }

  export type SceneVideoScalarWhereInput = {
    AND?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
    OR?: SceneVideoScalarWhereInput[]
    NOT?: SceneVideoScalarWhereInput | SceneVideoScalarWhereInput[]
    id?: IntFilter<"SceneVideo"> | number
    uuid?: StringFilter<"SceneVideo"> | string
    user_uuid?: StringFilter<"SceneVideo"> | string
    scene_uuid?: StringFilter<"SceneVideo"> | string
    scene_variation_uuid?: StringFilter<"SceneVideo"> | string
    provider_job_id?: StringNullableFilter<"SceneVideo"> | string | null
    video_uuid?: StringNullableFilter<"SceneVideo"> | string | null
    status?: EnumVideoStatusFilter<"SceneVideo"> | $Enums.VideoStatus
    error_message?: StringNullableFilter<"SceneVideo"> | string | null
    created_at?: DateTimeFilter<"SceneVideo"> | Date | string
    updated_at?: DateTimeFilter<"SceneVideo"> | Date | string
  }

  export type FinalProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: FinalProjectWhereUniqueInput
    update: XOR<FinalProjectUpdateWithoutUserInput, FinalProjectUncheckedUpdateWithoutUserInput>
    create: XOR<FinalProjectCreateWithoutUserInput, FinalProjectUncheckedCreateWithoutUserInput>
  }

  export type FinalProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: FinalProjectWhereUniqueInput
    data: XOR<FinalProjectUpdateWithoutUserInput, FinalProjectUncheckedUpdateWithoutUserInput>
  }

  export type FinalProjectUpdateManyWithWhereWithoutUserInput = {
    where: FinalProjectScalarWhereInput
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type FinalProjectScalarWhereInput = {
    AND?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
    OR?: FinalProjectScalarWhereInput[]
    NOT?: FinalProjectScalarWhereInput | FinalProjectScalarWhereInput[]
    id?: IntFilter<"FinalProject"> | number
    uuid?: StringFilter<"FinalProject"> | string
    user_uuid?: StringFilter<"FinalProject"> | string
    project_uuid?: StringFilter<"FinalProject"> | string
    title?: StringNullableFilter<"FinalProject"> | string | null
    duration_sec?: IntNullableFilter<"FinalProject"> | number | null
    video_uuid?: StringNullableFilter<"FinalProject"> | string | null
    thumbnail_uuid?: StringNullableFilter<"FinalProject"> | string | null
    created_at?: DateTimeFilter<"FinalProject"> | Date | string
    updated_at?: DateTimeFilter<"FinalProject"> | Date | string
  }

  export type UserCreateWithoutProjectsInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneUncheckedCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type SceneCreateWithoutProjectInput = {
    uuid?: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScenesInput
    scene_variations?: SceneVariationCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateWithoutProjectInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutSceneInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneCreateOrConnectWithoutProjectInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneCreateManyProjectInputEnvelope = {
    data: SceneCreateManyProjectInput | SceneCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type FinalProjectCreateWithoutProjectInput = {
    uuid?: string
    title?: string | null
    duration_sec?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFinal_projectsInput
    video?: DocumentCreateNestedOneWithoutFinal_project_videosInput
    thumbnail?: DocumentCreateNestedOneWithoutFinal_project_thumbnailsInput
  }

  export type FinalProjectUncheckedCreateWithoutProjectInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateOrConnectWithoutProjectInput = {
    where: FinalProjectWhereUniqueInput
    create: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput>
  }

  export type FinalProjectCreateManyProjectInputEnvelope = {
    data: FinalProjectCreateManyProjectInput | FinalProjectCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUncheckedUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SceneUpsertWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    update: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneUpdateWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    data: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
  }

  export type SceneUpdateManyWithWhereWithoutProjectInput = {
    where: SceneScalarWhereInput
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyWithoutProjectInput>
  }

  export type FinalProjectUpsertWithWhereUniqueWithoutProjectInput = {
    where: FinalProjectWhereUniqueInput
    update: XOR<FinalProjectUpdateWithoutProjectInput, FinalProjectUncheckedUpdateWithoutProjectInput>
    create: XOR<FinalProjectCreateWithoutProjectInput, FinalProjectUncheckedCreateWithoutProjectInput>
  }

  export type FinalProjectUpdateWithWhereUniqueWithoutProjectInput = {
    where: FinalProjectWhereUniqueInput
    data: XOR<FinalProjectUpdateWithoutProjectInput, FinalProjectUncheckedUpdateWithoutProjectInput>
  }

  export type FinalProjectUpdateManyWithWhereWithoutProjectInput = {
    where: FinalProjectScalarWhereInput
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserCreateWithoutScenesInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScenesInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScenesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScenesInput, UserUncheckedCreateWithoutScenesInput>
  }

  export type ProjectCreateWithoutScenesInput = {
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    final_projects?: FinalProjectCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutScenesInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutScenesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
  }

  export type SceneVariationCreateWithoutSceneInput = {
    uuid?: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_variationsInput
    prompt_image?: DocumentCreateNestedOneWithoutPrompt_imagesInput
    scene_video?: SceneVideoCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationUncheckedCreateWithoutSceneInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    scene_video?: SceneVideoUncheckedCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationCreateOrConnectWithoutSceneInput = {
    where: SceneVariationWhereUniqueInput
    create: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput>
  }

  export type SceneVariationCreateManySceneInputEnvelope = {
    data: SceneVariationCreateManySceneInput | SceneVariationCreateManySceneInput[]
    skipDuplicates?: boolean
  }

  export type SceneVideoCreateWithoutSceneInput = {
    uuid?: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_videosInput
    scene_variation?: SceneVariationCreateNestedOneWithoutScene_videoInput
    video?: DocumentCreateNestedOneWithoutScene_videosInput
  }

  export type SceneVideoUncheckedCreateWithoutSceneInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateOrConnectWithoutSceneInput = {
    where: SceneVideoWhereUniqueInput
    create: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput>
  }

  export type SceneVideoCreateManySceneInputEnvelope = {
    data: SceneVideoCreateManySceneInput | SceneVideoCreateManySceneInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutScenesInput = {
    update: XOR<UserUpdateWithoutScenesInput, UserUncheckedUpdateWithoutScenesInput>
    create: XOR<UserCreateWithoutScenesInput, UserUncheckedCreateWithoutScenesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScenesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScenesInput, UserUncheckedUpdateWithoutScenesInput>
  }

  export type UserUpdateWithoutScenesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScenesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutScenesInput = {
    update: XOR<ProjectUpdateWithoutScenesInput, ProjectUncheckedUpdateWithoutScenesInput>
    create: XOR<ProjectCreateWithoutScenesInput, ProjectUncheckedCreateWithoutScenesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutScenesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutScenesInput, ProjectUncheckedUpdateWithoutScenesInput>
  }

  export type ProjectUpdateWithoutScenesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    final_projects?: FinalProjectUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutScenesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    final_projects?: FinalProjectUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SceneVariationUpsertWithWhereUniqueWithoutSceneInput = {
    where: SceneVariationWhereUniqueInput
    update: XOR<SceneVariationUpdateWithoutSceneInput, SceneVariationUncheckedUpdateWithoutSceneInput>
    create: XOR<SceneVariationCreateWithoutSceneInput, SceneVariationUncheckedCreateWithoutSceneInput>
  }

  export type SceneVariationUpdateWithWhereUniqueWithoutSceneInput = {
    where: SceneVariationWhereUniqueInput
    data: XOR<SceneVariationUpdateWithoutSceneInput, SceneVariationUncheckedUpdateWithoutSceneInput>
  }

  export type SceneVariationUpdateManyWithWhereWithoutSceneInput = {
    where: SceneVariationScalarWhereInput
    data: XOR<SceneVariationUpdateManyMutationInput, SceneVariationUncheckedUpdateManyWithoutSceneInput>
  }

  export type SceneVideoUpsertWithWhereUniqueWithoutSceneInput = {
    where: SceneVideoWhereUniqueInput
    update: XOR<SceneVideoUpdateWithoutSceneInput, SceneVideoUncheckedUpdateWithoutSceneInput>
    create: XOR<SceneVideoCreateWithoutSceneInput, SceneVideoUncheckedCreateWithoutSceneInput>
  }

  export type SceneVideoUpdateWithWhereUniqueWithoutSceneInput = {
    where: SceneVideoWhereUniqueInput
    data: XOR<SceneVideoUpdateWithoutSceneInput, SceneVideoUncheckedUpdateWithoutSceneInput>
  }

  export type SceneVideoUpdateManyWithWhereWithoutSceneInput = {
    where: SceneVideoScalarWhereInput
    data: XOR<SceneVideoUpdateManyMutationInput, SceneVideoUncheckedUpdateManyWithoutSceneInput>
  }

  export type UserCreateWithoutScene_variationsInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    scenes?: SceneCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScene_variationsInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    scenes?: SceneUncheckedCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScene_variationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScene_variationsInput, UserUncheckedCreateWithoutScene_variationsInput>
  }

  export type SceneCreateWithoutScene_variationsInput = {
    uuid?: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScenesInput
    project: ProjectCreateNestedOneWithoutScenesInput
    scene_videos?: SceneVideoCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateWithoutScene_variationsInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneCreateOrConnectWithoutScene_variationsInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutScene_variationsInput, SceneUncheckedCreateWithoutScene_variationsInput>
  }

  export type DocumentCreateWithoutPrompt_imagesInput = {
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoCreateNestedManyWithoutVideoInput
    final_project_videos?: FinalProjectCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentUncheckedCreateWithoutPrompt_imagesInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutVideoInput
    final_project_videos?: FinalProjectUncheckedCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectUncheckedCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentCreateOrConnectWithoutPrompt_imagesInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutPrompt_imagesInput, DocumentUncheckedCreateWithoutPrompt_imagesInput>
  }

  export type SceneVideoCreateWithoutScene_variationInput = {
    uuid?: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_videosInput
    scene: SceneCreateNestedOneWithoutScene_videosInput
    video?: DocumentCreateNestedOneWithoutScene_videosInput
  }

  export type SceneVideoUncheckedCreateWithoutScene_variationInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateOrConnectWithoutScene_variationInput = {
    where: SceneVideoWhereUniqueInput
    create: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
  }

  export type UserUpsertWithoutScene_variationsInput = {
    update: XOR<UserUpdateWithoutScene_variationsInput, UserUncheckedUpdateWithoutScene_variationsInput>
    create: XOR<UserCreateWithoutScene_variationsInput, UserUncheckedCreateWithoutScene_variationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScene_variationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScene_variationsInput, UserUncheckedUpdateWithoutScene_variationsInput>
  }

  export type UserUpdateWithoutScene_variationsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    scenes?: SceneUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScene_variationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SceneUpsertWithoutScene_variationsInput = {
    update: XOR<SceneUpdateWithoutScene_variationsInput, SceneUncheckedUpdateWithoutScene_variationsInput>
    create: XOR<SceneCreateWithoutScene_variationsInput, SceneUncheckedCreateWithoutScene_variationsInput>
    where?: SceneWhereInput
  }

  export type SceneUpdateToOneWithWhereWithoutScene_variationsInput = {
    where?: SceneWhereInput
    data: XOR<SceneUpdateWithoutScene_variationsInput, SceneUncheckedUpdateWithoutScene_variationsInput>
  }

  export type SceneUpdateWithoutScene_variationsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScenesNestedInput
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateWithoutScene_variationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type DocumentUpsertWithoutPrompt_imagesInput = {
    update: XOR<DocumentUpdateWithoutPrompt_imagesInput, DocumentUncheckedUpdateWithoutPrompt_imagesInput>
    create: XOR<DocumentCreateWithoutPrompt_imagesInput, DocumentUncheckedCreateWithoutPrompt_imagesInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutPrompt_imagesInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutPrompt_imagesInput, DocumentUncheckedUpdateWithoutPrompt_imagesInput>
  }

  export type DocumentUpdateWithoutPrompt_imagesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUpdateManyWithoutVideoNestedInput
    final_project_videos?: FinalProjectUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentUncheckedUpdateWithoutPrompt_imagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutVideoNestedInput
    final_project_videos?: FinalProjectUncheckedUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUncheckedUpdateManyWithoutThumbnailNestedInput
  }

  export type SceneVideoUpsertWithoutScene_variationInput = {
    update: XOR<SceneVideoUpdateWithoutScene_variationInput, SceneVideoUncheckedUpdateWithoutScene_variationInput>
    create: XOR<SceneVideoCreateWithoutScene_variationInput, SceneVideoUncheckedCreateWithoutScene_variationInput>
    where?: SceneVideoWhereInput
  }

  export type SceneVideoUpdateToOneWithWhereWithoutScene_variationInput = {
    where?: SceneVideoWhereInput
    data: XOR<SceneVideoUpdateWithoutScene_variationInput, SceneVideoUncheckedUpdateWithoutScene_variationInput>
  }

  export type SceneVideoUpdateWithoutScene_variationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_videosNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_videosNestedInput
    video?: DocumentUpdateOneWithoutScene_videosNestedInput
  }

  export type SceneVideoUncheckedUpdateWithoutScene_variationInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutScene_videosInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    scenes?: SceneCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScene_videosInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    scenes?: SceneUncheckedCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutUserInput
    final_projects?: FinalProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScene_videosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScene_videosInput, UserUncheckedCreateWithoutScene_videosInput>
  }

  export type SceneCreateWithoutScene_videosInput = {
    uuid?: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScenesInput
    project: ProjectCreateNestedOneWithoutScenesInput
    scene_variations?: SceneVariationCreateNestedManyWithoutSceneInput
  }

  export type SceneUncheckedCreateWithoutScene_videosInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutSceneInput
  }

  export type SceneCreateOrConnectWithoutScene_videosInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutScene_videosInput, SceneUncheckedCreateWithoutScene_videosInput>
  }

  export type SceneVariationCreateWithoutScene_videoInput = {
    uuid?: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_variationsInput
    scene: SceneCreateNestedOneWithoutScene_variationsInput
    prompt_image?: DocumentCreateNestedOneWithoutPrompt_imagesInput
  }

  export type SceneVariationUncheckedCreateWithoutScene_videoInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVariationCreateOrConnectWithoutScene_videoInput = {
    where: SceneVariationWhereUniqueInput
    create: XOR<SceneVariationCreateWithoutScene_videoInput, SceneVariationUncheckedCreateWithoutScene_videoInput>
  }

  export type DocumentCreateWithoutScene_videosInput = {
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    prompt_images?: SceneVariationCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentUncheckedCreateWithoutScene_videosInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    prompt_images?: SceneVariationUncheckedCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectUncheckedCreateNestedManyWithoutVideoInput
    final_project_thumbnails?: FinalProjectUncheckedCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentCreateOrConnectWithoutScene_videosInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutScene_videosInput, DocumentUncheckedCreateWithoutScene_videosInput>
  }

  export type UserUpsertWithoutScene_videosInput = {
    update: XOR<UserUpdateWithoutScene_videosInput, UserUncheckedUpdateWithoutScene_videosInput>
    create: XOR<UserCreateWithoutScene_videosInput, UserUncheckedCreateWithoutScene_videosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScene_videosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScene_videosInput, UserUncheckedUpdateWithoutScene_videosInput>
  }

  export type UserUpdateWithoutScene_videosInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    scenes?: SceneUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScene_videosInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutUserNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SceneUpsertWithoutScene_videosInput = {
    update: XOR<SceneUpdateWithoutScene_videosInput, SceneUncheckedUpdateWithoutScene_videosInput>
    create: XOR<SceneCreateWithoutScene_videosInput, SceneUncheckedCreateWithoutScene_videosInput>
    where?: SceneWhereInput
  }

  export type SceneUpdateToOneWithWhereWithoutScene_videosInput = {
    where?: SceneWhereInput
    data: XOR<SceneUpdateWithoutScene_videosInput, SceneUncheckedUpdateWithoutScene_videosInput>
  }

  export type SceneUpdateWithoutScene_videosInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScenesNestedInput
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateWithoutScene_videosInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneVariationUpsertWithoutScene_videoInput = {
    update: XOR<SceneVariationUpdateWithoutScene_videoInput, SceneVariationUncheckedUpdateWithoutScene_videoInput>
    create: XOR<SceneVariationCreateWithoutScene_videoInput, SceneVariationUncheckedCreateWithoutScene_videoInput>
    where?: SceneVariationWhereInput
  }

  export type SceneVariationUpdateToOneWithWhereWithoutScene_videoInput = {
    where?: SceneVariationWhereInput
    data: XOR<SceneVariationUpdateWithoutScene_videoInput, SceneVariationUncheckedUpdateWithoutScene_videoInput>
  }

  export type SceneVariationUpdateWithoutScene_videoInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_variationsNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_variationsNestedInput
    prompt_image?: DocumentUpdateOneWithoutPrompt_imagesNestedInput
  }

  export type SceneVariationUncheckedUpdateWithoutScene_videoInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpsertWithoutScene_videosInput = {
    update: XOR<DocumentUpdateWithoutScene_videosInput, DocumentUncheckedUpdateWithoutScene_videosInput>
    create: XOR<DocumentCreateWithoutScene_videosInput, DocumentUncheckedCreateWithoutScene_videosInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutScene_videosInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutScene_videosInput, DocumentUncheckedUpdateWithoutScene_videosInput>
  }

  export type DocumentUpdateWithoutScene_videosInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prompt_images?: SceneVariationUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentUncheckedUpdateWithoutScene_videosInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    prompt_images?: SceneVariationUncheckedUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUncheckedUpdateManyWithoutVideoNestedInput
    final_project_thumbnails?: FinalProjectUncheckedUpdateManyWithoutThumbnailNestedInput
  }

  export type UserCreateWithoutFinal_projectsInput = {
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    scenes?: SceneCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFinal_projectsInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    full_name: string
    password: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    scenes?: SceneUncheckedCreateNestedManyWithoutUserInput
    scene_variations?: SceneVariationUncheckedCreateNestedManyWithoutUserInput
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFinal_projectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFinal_projectsInput, UserUncheckedCreateWithoutFinal_projectsInput>
  }

  export type ProjectCreateWithoutFinal_projectsInput = {
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    scenes?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutFinal_projectsInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    scenes?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutFinal_projectsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFinal_projectsInput, ProjectUncheckedCreateWithoutFinal_projectsInput>
  }

  export type DocumentCreateWithoutFinal_project_videosInput = {
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationCreateNestedManyWithoutPrompt_imageInput
    final_project_thumbnails?: FinalProjectCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentUncheckedCreateWithoutFinal_project_videosInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationUncheckedCreateNestedManyWithoutPrompt_imageInput
    final_project_thumbnails?: FinalProjectUncheckedCreateNestedManyWithoutThumbnailInput
  }

  export type DocumentCreateOrConnectWithoutFinal_project_videosInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutFinal_project_videosInput, DocumentUncheckedCreateWithoutFinal_project_videosInput>
  }

  export type DocumentCreateWithoutFinal_project_thumbnailsInput = {
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectCreateNestedManyWithoutVideoInput
  }

  export type DocumentUncheckedCreateWithoutFinal_project_thumbnailsInput = {
    id?: number
    uuid?: string
    filename: string
    mimetype: string
    size: number
    url: string
    path: string
    type?: $Enums.DocumentType
    order?: number
    created_at?: Date | string
    updated_at?: Date | string
    scene_videos?: SceneVideoUncheckedCreateNestedManyWithoutVideoInput
    prompt_images?: SceneVariationUncheckedCreateNestedManyWithoutPrompt_imageInput
    final_project_videos?: FinalProjectUncheckedCreateNestedManyWithoutVideoInput
  }

  export type DocumentCreateOrConnectWithoutFinal_project_thumbnailsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutFinal_project_thumbnailsInput, DocumentUncheckedCreateWithoutFinal_project_thumbnailsInput>
  }

  export type UserUpsertWithoutFinal_projectsInput = {
    update: XOR<UserUpdateWithoutFinal_projectsInput, UserUncheckedUpdateWithoutFinal_projectsInput>
    create: XOR<UserCreateWithoutFinal_projectsInput, UserUncheckedCreateWithoutFinal_projectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFinal_projectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFinal_projectsInput, UserUncheckedUpdateWithoutFinal_projectsInput>
  }

  export type UserUpdateWithoutFinal_projectsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    scenes?: SceneUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFinal_projectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    scenes?: SceneUncheckedUpdateManyWithoutUserNestedInput
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutUserNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutFinal_projectsInput = {
    update: XOR<ProjectUpdateWithoutFinal_projectsInput, ProjectUncheckedUpdateWithoutFinal_projectsInput>
    create: XOR<ProjectCreateWithoutFinal_projectsInput, ProjectUncheckedCreateWithoutFinal_projectsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutFinal_projectsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutFinal_projectsInput, ProjectUncheckedUpdateWithoutFinal_projectsInput>
  }

  export type ProjectUpdateWithoutFinal_projectsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    scenes?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFinal_projectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type DocumentUpsertWithoutFinal_project_videosInput = {
    update: XOR<DocumentUpdateWithoutFinal_project_videosInput, DocumentUncheckedUpdateWithoutFinal_project_videosInput>
    create: XOR<DocumentCreateWithoutFinal_project_videosInput, DocumentUncheckedCreateWithoutFinal_project_videosInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutFinal_project_videosInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutFinal_project_videosInput, DocumentUncheckedUpdateWithoutFinal_project_videosInput>
  }

  export type DocumentUpdateWithoutFinal_project_videosInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUpdateManyWithoutPrompt_imageNestedInput
    final_project_thumbnails?: FinalProjectUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentUncheckedUpdateWithoutFinal_project_videosInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUncheckedUpdateManyWithoutPrompt_imageNestedInput
    final_project_thumbnails?: FinalProjectUncheckedUpdateManyWithoutThumbnailNestedInput
  }

  export type DocumentUpsertWithoutFinal_project_thumbnailsInput = {
    update: XOR<DocumentUpdateWithoutFinal_project_thumbnailsInput, DocumentUncheckedUpdateWithoutFinal_project_thumbnailsInput>
    create: XOR<DocumentCreateWithoutFinal_project_thumbnailsInput, DocumentUncheckedCreateWithoutFinal_project_thumbnailsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutFinal_project_thumbnailsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutFinal_project_thumbnailsInput, DocumentUncheckedUpdateWithoutFinal_project_thumbnailsInput>
  }

  export type DocumentUpdateWithoutFinal_project_thumbnailsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUpdateManyWithoutVideoNestedInput
  }

  export type DocumentUncheckedUpdateWithoutFinal_project_thumbnailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutVideoNestedInput
    prompt_images?: SceneVariationUncheckedUpdateManyWithoutPrompt_imageNestedInput
    final_project_videos?: FinalProjectUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type SceneVideoCreateWithoutVideoInput = {
    uuid?: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_videosInput
    scene: SceneCreateNestedOneWithoutScene_videosInput
    scene_variation?: SceneVariationCreateNestedOneWithoutScene_videoInput
  }

  export type SceneVideoUncheckedCreateWithoutVideoInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateOrConnectWithoutVideoInput = {
    where: SceneVideoWhereUniqueInput
    create: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput>
  }

  export type SceneVideoCreateManyVideoInputEnvelope = {
    data: SceneVideoCreateManyVideoInput | SceneVideoCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type SceneVariationCreateWithoutPrompt_imageInput = {
    uuid?: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutScene_variationsInput
    scene: SceneCreateNestedOneWithoutScene_variationsInput
    scene_video?: SceneVideoCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationUncheckedCreateWithoutPrompt_imageInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    scene_video?: SceneVideoUncheckedCreateNestedOneWithoutScene_variationInput
  }

  export type SceneVariationCreateOrConnectWithoutPrompt_imageInput = {
    where: SceneVariationWhereUniqueInput
    create: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput>
  }

  export type SceneVariationCreateManyPrompt_imageInputEnvelope = {
    data: SceneVariationCreateManyPrompt_imageInput | SceneVariationCreateManyPrompt_imageInput[]
    skipDuplicates?: boolean
  }

  export type FinalProjectCreateWithoutVideoInput = {
    uuid?: string
    title?: string | null
    duration_sec?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFinal_projectsInput
    project: ProjectCreateNestedOneWithoutFinal_projectsInput
    thumbnail?: DocumentCreateNestedOneWithoutFinal_project_thumbnailsInput
  }

  export type FinalProjectUncheckedCreateWithoutVideoInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateOrConnectWithoutVideoInput = {
    where: FinalProjectWhereUniqueInput
    create: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput>
  }

  export type FinalProjectCreateManyVideoInputEnvelope = {
    data: FinalProjectCreateManyVideoInput | FinalProjectCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type FinalProjectCreateWithoutThumbnailInput = {
    uuid?: string
    title?: string | null
    duration_sec?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutFinal_projectsInput
    project: ProjectCreateNestedOneWithoutFinal_projectsInput
    video?: DocumentCreateNestedOneWithoutFinal_project_videosInput
  }

  export type FinalProjectUncheckedCreateWithoutThumbnailInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateOrConnectWithoutThumbnailInput = {
    where: FinalProjectWhereUniqueInput
    create: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput>
  }

  export type FinalProjectCreateManyThumbnailInputEnvelope = {
    data: FinalProjectCreateManyThumbnailInput | FinalProjectCreateManyThumbnailInput[]
    skipDuplicates?: boolean
  }

  export type SceneVideoUpsertWithWhereUniqueWithoutVideoInput = {
    where: SceneVideoWhereUniqueInput
    update: XOR<SceneVideoUpdateWithoutVideoInput, SceneVideoUncheckedUpdateWithoutVideoInput>
    create: XOR<SceneVideoCreateWithoutVideoInput, SceneVideoUncheckedCreateWithoutVideoInput>
  }

  export type SceneVideoUpdateWithWhereUniqueWithoutVideoInput = {
    where: SceneVideoWhereUniqueInput
    data: XOR<SceneVideoUpdateWithoutVideoInput, SceneVideoUncheckedUpdateWithoutVideoInput>
  }

  export type SceneVideoUpdateManyWithWhereWithoutVideoInput = {
    where: SceneVideoScalarWhereInput
    data: XOR<SceneVideoUpdateManyMutationInput, SceneVideoUncheckedUpdateManyWithoutVideoInput>
  }

  export type SceneVariationUpsertWithWhereUniqueWithoutPrompt_imageInput = {
    where: SceneVariationWhereUniqueInput
    update: XOR<SceneVariationUpdateWithoutPrompt_imageInput, SceneVariationUncheckedUpdateWithoutPrompt_imageInput>
    create: XOR<SceneVariationCreateWithoutPrompt_imageInput, SceneVariationUncheckedCreateWithoutPrompt_imageInput>
  }

  export type SceneVariationUpdateWithWhereUniqueWithoutPrompt_imageInput = {
    where: SceneVariationWhereUniqueInput
    data: XOR<SceneVariationUpdateWithoutPrompt_imageInput, SceneVariationUncheckedUpdateWithoutPrompt_imageInput>
  }

  export type SceneVariationUpdateManyWithWhereWithoutPrompt_imageInput = {
    where: SceneVariationScalarWhereInput
    data: XOR<SceneVariationUpdateManyMutationInput, SceneVariationUncheckedUpdateManyWithoutPrompt_imageInput>
  }

  export type FinalProjectUpsertWithWhereUniqueWithoutVideoInput = {
    where: FinalProjectWhereUniqueInput
    update: XOR<FinalProjectUpdateWithoutVideoInput, FinalProjectUncheckedUpdateWithoutVideoInput>
    create: XOR<FinalProjectCreateWithoutVideoInput, FinalProjectUncheckedCreateWithoutVideoInput>
  }

  export type FinalProjectUpdateWithWhereUniqueWithoutVideoInput = {
    where: FinalProjectWhereUniqueInput
    data: XOR<FinalProjectUpdateWithoutVideoInput, FinalProjectUncheckedUpdateWithoutVideoInput>
  }

  export type FinalProjectUpdateManyWithWhereWithoutVideoInput = {
    where: FinalProjectScalarWhereInput
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyWithoutVideoInput>
  }

  export type FinalProjectUpsertWithWhereUniqueWithoutThumbnailInput = {
    where: FinalProjectWhereUniqueInput
    update: XOR<FinalProjectUpdateWithoutThumbnailInput, FinalProjectUncheckedUpdateWithoutThumbnailInput>
    create: XOR<FinalProjectCreateWithoutThumbnailInput, FinalProjectUncheckedCreateWithoutThumbnailInput>
  }

  export type FinalProjectUpdateWithWhereUniqueWithoutThumbnailInput = {
    where: FinalProjectWhereUniqueInput
    data: XOR<FinalProjectUpdateWithoutThumbnailInput, FinalProjectUncheckedUpdateWithoutThumbnailInput>
  }

  export type FinalProjectUpdateManyWithWhereWithoutThumbnailInput = {
    where: FinalProjectScalarWhereInput
    data: XOR<FinalProjectUpdateManyMutationInput, FinalProjectUncheckedUpdateManyWithoutThumbnailInput>
  }

  export type ProjectCreateManyUserInput = {
    id?: number
    uuid?: string
    title: string
    original_concept: string
    enriched_concept?: string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneCreateManyUserInput = {
    id?: number
    uuid?: string
    project_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVariationCreateManyUserInput = {
    id?: number
    uuid?: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateManyUserInput = {
    id?: number
    uuid?: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateManyUserInput = {
    id?: number
    uuid?: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUpdateManyWithoutProjectNestedInput
    final_projects?: FinalProjectUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scenes?: SceneUncheckedUpdateManyWithoutProjectNestedInput
    final_projects?: FinalProjectUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    original_concept?: StringFieldUpdateOperationsInput | string
    enriched_concept?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: NullableJsonNullValueInput | InputJsonValue
    tones?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutScenesNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVariationUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene?: SceneUpdateOneRequiredWithoutScene_variationsNestedInput
    prompt_image?: DocumentUpdateOneWithoutPrompt_imagesNestedInput
    scene_video?: SceneVideoUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_video?: SceneVideoUncheckedUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene?: SceneUpdateOneRequiredWithoutScene_videosNestedInput
    scene_variation?: SceneVariationUpdateOneWithoutScene_videoNestedInput
    video?: DocumentUpdateOneWithoutScene_videosNestedInput
  }

  export type SceneVideoUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFinal_projectsNestedInput
    video?: DocumentUpdateOneWithoutFinal_project_videosNestedInput
    thumbnail?: DocumentUpdateOneWithoutFinal_project_thumbnailsNestedInput
  }

  export type FinalProjectUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneCreateManyProjectInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    description?: string | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateManyProjectInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneUpdateWithoutProjectInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScenesNestedInput
    scene_variations?: SceneVariationUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_variations?: SceneVariationUncheckedUpdateManyWithoutSceneNestedInput
    scene_videos?: SceneVideoUncheckedUpdateManyWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUpdateWithoutProjectInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFinal_projectsNestedInput
    video?: DocumentUpdateOneWithoutFinal_project_videosNestedInput
    thumbnail?: DocumentUpdateOneWithoutFinal_project_thumbnailsNestedInput
  }

  export type FinalProjectUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVariationCreateManySceneInput = {
    id?: number
    uuid?: string
    user_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    prompt_image_uuid?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoCreateManySceneInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    video_uuid?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVariationUpdateWithoutSceneInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_variationsNestedInput
    prompt_image?: DocumentUpdateOneWithoutPrompt_imagesNestedInput
    scene_video?: SceneVideoUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateWithoutSceneInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_video?: SceneVideoUncheckedUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateManyWithoutSceneInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    prompt_image_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUpdateWithoutSceneInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_videosNestedInput
    scene_variation?: SceneVariationUpdateOneWithoutScene_videoNestedInput
    video?: DocumentUpdateOneWithoutScene_videosNestedInput
  }

  export type SceneVideoUncheckedUpdateWithoutSceneInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUncheckedUpdateManyWithoutSceneInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoCreateManyVideoInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    scene_variation_uuid: string
    provider_job_id?: string | null
    status?: $Enums.VideoStatus
    error_message?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVariationCreateManyPrompt_imageInput = {
    id?: number
    uuid?: string
    user_uuid: string
    scene_uuid: string
    title: string
    prompt_text?: string | null
    negative_prompt?: string | null
    selected?: boolean
    style?: string | null
    tone?: string | null
    genre?: string | null
    camera_style?: string | null
    shot_type?: string | null
    camera_movement?: string | null
    lens_type?: string | null
    depth_of_field?: string | null
    lighting?: string | null
    color_grade?: string | null
    time_of_day?: string | null
    aspect_ratio?: string | null
    resolution?: string | null
    fps?: number | null
    duration_sec?: number | null
    ai_model?: $Enums.VideoProvider | null
    seed?: number | null
    creativity?: number | null
    motion_strength?: number | null
    guidance_scale?: number | null
    audio_style?: string | null
    include_sound?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateManyVideoInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    thumbnail_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FinalProjectCreateManyThumbnailInput = {
    id?: number
    uuid?: string
    user_uuid: string
    project_uuid: string
    title?: string | null
    duration_sec?: number | null
    video_uuid?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SceneVideoUpdateWithoutVideoInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_videosNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_videosNestedInput
    scene_variation?: SceneVariationUpdateOneWithoutScene_videoNestedInput
  }

  export type SceneVideoUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVideoUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    scene_variation_uuid?: StringFieldUpdateOperationsInput | string
    provider_job_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneVariationUpdateWithoutPrompt_imageInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScene_variationsNestedInput
    scene?: SceneUpdateOneRequiredWithoutScene_variationsNestedInput
    scene_video?: SceneVideoUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateWithoutPrompt_imageInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scene_video?: SceneVideoUncheckedUpdateOneWithoutScene_variationNestedInput
  }

  export type SceneVariationUncheckedUpdateManyWithoutPrompt_imageInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    scene_uuid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    prompt_text?: NullableStringFieldUpdateOperationsInput | string | null
    negative_prompt?: NullableStringFieldUpdateOperationsInput | string | null
    selected?: BoolFieldUpdateOperationsInput | boolean
    style?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    camera_style?: NullableStringFieldUpdateOperationsInput | string | null
    shot_type?: NullableStringFieldUpdateOperationsInput | string | null
    camera_movement?: NullableStringFieldUpdateOperationsInput | string | null
    lens_type?: NullableStringFieldUpdateOperationsInput | string | null
    depth_of_field?: NullableStringFieldUpdateOperationsInput | string | null
    lighting?: NullableStringFieldUpdateOperationsInput | string | null
    color_grade?: NullableStringFieldUpdateOperationsInput | string | null
    time_of_day?: NullableStringFieldUpdateOperationsInput | string | null
    aspect_ratio?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    fps?: NullableIntFieldUpdateOperationsInput | number | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    ai_model?: NullableEnumVideoProviderFieldUpdateOperationsInput | $Enums.VideoProvider | null
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    creativity?: NullableFloatFieldUpdateOperationsInput | number | null
    motion_strength?: NullableFloatFieldUpdateOperationsInput | number | null
    guidance_scale?: NullableFloatFieldUpdateOperationsInput | number | null
    audio_style?: NullableStringFieldUpdateOperationsInput | string | null
    include_sound?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUpdateWithoutVideoInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFinal_projectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutFinal_projectsNestedInput
    thumbnail?: DocumentUpdateOneWithoutFinal_project_thumbnailsNestedInput
  }

  export type FinalProjectUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUpdateWithoutThumbnailInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFinal_projectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutFinal_projectsNestedInput
    video?: DocumentUpdateOneWithoutFinal_project_videosNestedInput
  }

  export type FinalProjectUncheckedUpdateWithoutThumbnailInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinalProjectUncheckedUpdateManyWithoutThumbnailInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    project_uuid?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    duration_sec?: NullableIntFieldUpdateOperationsInput | number | null
    video_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}