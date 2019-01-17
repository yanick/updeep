import _ = require('lodash')
import freeze from './freeze'

type ReturningFunction = (...args: any[]) => any;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export default function wrap<F extends ReturningFunction,N extends number>(func: F, l? :N) {
  const frozen : unknown = (...args: any ) => freeze( func(...args) );
  const g = frozen as F;
  return _.curry(g, l)
}
