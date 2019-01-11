import _omit from 'lodash/omit'
import curry from 'lodash/curry'
import freeze from './freeze'

function omit<A>(predicate: string, collection: A[]): A[] {
  return freeze(_omit(collection, predicate))
}

export default curry(omit);
