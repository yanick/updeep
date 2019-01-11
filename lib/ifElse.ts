import update from './update'
import curry from 'lodash/curry';
import { Predicate, Updates, Source } from './types';

export function updateIfElse<S extends Source>(predicate: Predicate<S>, trueUpdates: Updates, falseUpdates: Updates, object: S) {
  const test = typeof predicate === 'function' ? predicate(object) : predicate

  const updates = test ? trueUpdates : falseUpdates

  return update(updates, object)
}

export default curry(updateIfElse)
