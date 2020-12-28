import curry, {Curried} from './util/curry'
import freeze from './freeze'

export type Wrap<A extends any[],R> = Curried<A,Readonly<R>>

export default function wrap<A extends any[], R>(fn: (...args: A) => R, len: number = fn.length): Curried<A, Readonly<R>> {
  return curry(
      (...args) => freeze(fn(...args))
  ,len);
}
