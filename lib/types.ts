export type Updates = any

export type Source = any

export type PathPart = number | string

export type Path = PathPart | PathPart[]

export type TruePredicate<S=any> = true | ( (a: S) => true )
export type FalsePredicate<S=any> = false | ( (a: S) => false )

export type Predicate<S = any> = boolean | ( (arg: S) => boolean )

export type MergedUpdate<U,O> =
    O extends object ?  UpdateReturnType<U> extends object ? object : UpdateReturnType<U>;

export type UpdateReturnMap<T> = { [ K in keyof T]: UpdateReturnType<T[K]> };

export type UpdateReturnType<U> =
        U extends (object: any) => any ? ReturnType<U>
        : U extends object ? UpdateReturnMap<U>
        : U;

