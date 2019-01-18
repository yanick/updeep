import { MergedUpdate, UpdateReturnType } from './types';
export declare const omitted: (...args: any[]) => {
    __omitted: boolean;
};
interface CurriedUpdate1<U> {
    <O>(object: O extends object ? never : O): UpdateReturnType<U>;
    <O>(object: O, ...args: any[]): MergedUpdate<U, O>;
}
interface CurriedUpdate {
    <U>(updates: U extends object ? never : U, object: any): U;
    <U, O>(updates: U, object: O extends object ? never : O): UpdateReturnType<U>;
    <U, O>(updates: U, object: O, ...args: any[]): MergedUpdate<U, O>;
    <U>(updates: U extends object ? never : U): (object: any) => U;
    <U>(updates: U): CurriedUpdate1<U>;
}
declare const _default: CurriedUpdate;
export default _default;
