import { MergedUpdate } from './types';
declare type Mapped<I, O extends object> = {
    [K in keyof O]: MergedUpdate<I, O[K]>;
};
declare type AnyFunction = (...args: any[]) => any;
export declare function map<O, R>(iteratee: (value: O, key?: number) => R, object: O[]): R[];
export declare function map<O, R>(iteratee: (value: O, key?: string) => R, object: {
    [key: string]: O;
}): R[];
export declare function map<I, O extends object>(iteratee: I extends AnyFunction ? never : I, object: O): Mapped<I, O>;
interface CurriedMap {
    <O, R>(iteratee: (value: O, key: number) => R, object: O[]): R[];
    <O, R>(iteratee: (value: O, key: number) => R): (object: O[]) => R[];
    <O, R>(iteratee: (value: O, key: string) => R, object: {
        [key: string]: O;
    }): R[];
    <O, R>(iteratee: (value: O, key: string) => R): (object: {
        [key: string]: O;
    }) => R[];
    <I, O extends object>(iteratee: I extends AnyFunction ? never : I, object: O): Mapped<I, O>;
    <I, O extends object>(iteratee: I extends AnyFunction ? never : I): (object: O) => Mapped<I, O>;
}
declare const _default: CurriedMap;
export default _default;
