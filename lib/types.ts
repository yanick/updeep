export type Updates = any

export type Source = any

export type PathPart = number | string

export type Path = PathPart | PathPart[]

export type TruePredicate<S=any> = true | ( (a: S) => true )
export type FalsePredicate<S=any> = false | ( (a: S) => false )

export type Predicate<S = any> = boolean | ( (arg: S) => boolean )

export type MergedUpdate<U,O> =
    O extends object ?  ( UpdateReturnType<U> extends object ? object : UpdateReturnType<U> ):
    UpdateReturnType<U>;

export type UpdateReturnMap<T> = { [ K in keyof T]: UpdateReturnType<T[K]> };

export type UpdateReturnType<U> =
        U extends (object: any) => any ? ReturnType<U>
        : U extends object ? UpdateReturnMap<U>
        : U;

export type ReturningFunction = (...args: any[]) => any;

export type ArgumentsType<F extends (...args: any[])=>any> = F extends (...args: infer A) => any ? A : never;

type Curry1<A, R> = (a: A) => R;

type Curry2<A, B, R> = {
    (a: A): Curry1<B, R>;
    (a: A, b: B): R;
};

type Curry3<A, B, C, R> = {
    (a: A): Curry2<B, C, R>;
    (a: A, b: B): Curry1<C, R>;
    (a: A, b: B, c: C): R;
};

type Curry4<A, B, C, D, R> = {
    (a: A): Curry3<B, C, D, R>;
    (a: A, b: B): Curry2<C, D, R>;
    (a: A, b: B, c: C): Curry1<D, R>;
    (a: A, b: B, c: C, d: D): R;
};

export type VariadicCurry<T, R> =
    T extends [any, any, any, any] ? Curry4<T[0], T[1], T[2], T[3], R> :
    T extends [any, any, any] ? Curry3<T[0], T[1], T[2], R> :
    T extends [any, any] ? Curry2<T[0], T[1], R> :
    T extends [any] ? Curry1<T[0], R> :
    unknown
;
