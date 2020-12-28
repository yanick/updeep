/* eslint no-shadow:0, no-param-reassign:0 prefer-rest-params:0 */
import _curry from 'lodash/curry';

export const _ = _curry.placeholder

export type Curried<A extends any[], R> =
  <P extends Partial<A>>(...args: P) => P extends A ? R :
    A extends [...SameLength<P>, ...infer S] ? S extends any[] ? Curried<S, R>
    : never : never;

export type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>


export default function curry<A extends any[], R>(fn: (...args: A) => R, len: number = fn.length): Curried<A, R> {
  return _curry(fn,len);
}
