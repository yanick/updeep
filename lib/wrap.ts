import _ = require('lodash')
import freeze from './freeze'
import { ReturningFunction } from './types';

export default function wrap<F extends ReturningFunction,N extends number>(func: F, l? :N) {
  const frozen : unknown = (...args: any ) => freeze( func(...args) );
  const g = frozen as F;
  return _.curry(g, l)
}
