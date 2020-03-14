export declare type Updates = any;
export declare type Source = any;
export declare type PathPart = number | string;
export declare type Path = PathPart | PathPart[];
export declare type TruePredicate<S = any> = true | ((a: S) => true);
export declare type FalsePredicate<S = any> = false | ((a: S) => false);
export declare type Predicate<S = any> = boolean | ((arg: S) => boolean);
export declare type MergedUpdate<U, O> = O extends object ? (UpdateReturnType<U> extends object ? object : UpdateReturnType<U>) : UpdateReturnType<U>;
export declare type UpdateReturnMap<T> = {
    [K in keyof T]: UpdateReturnType<T[K]>;
};
export declare type UpdateReturnType<U> = U extends (object: any) => any ? ReturnType<U> : U extends object ? UpdateReturnMap<U> : U;
export declare type ReturningFunction = (...args: any[]) => any;
export declare type ArgumentsType<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A : never;
declare type Curry1<A, R> = (a: A) => R;
declare type Curry2<A, B, R> = {
    (a: A): Curry1<B, R>;
    (a: A, b: B): R;
};
declare type Curry3<A, B, C, R> = {
    (a: A): Curry2<B, C, R>;
    (a: A, b: B): Curry1<C, R>;
    (a: A, b: B, c: C): R;
};
declare type Curry4<A, B, C, D, R> = {
    (a: A): Curry3<B, C, D, R>;
    (a: A, b: B): Curry2<C, D, R>;
    (a: A, b: B, c: C): Curry1<D, R>;
    (a: A, b: B, c: C, d: D): R;
};
export declare type VariadicCurry<T, R> = T extends [any, any, any, any] ? Curry4<T[0], T[1], T[2], T[3], R> : T extends [any, any, any] ? Curry3<T[0], T[1], T[2], R> : T extends [any, any] ? Curry2<T[0], T[1], R> : T extends [any] ? Curry1<T[0], R> : unknown;
export {};
