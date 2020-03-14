import _omit from 'lodash/omit'
import curry from './util/curry'
import freeze from './freeze'
import { VariadicCurry } from './types';

export function omit(predicate: string[]|string, collection: object): object {
  return freeze(_omit(collection, predicate))
}

export default curry(omit) as VariadicCurry<[string[]|string, object], object>;
