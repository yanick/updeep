import _omitBy from 'lodash/omitBy'
import wrap from './wrap'

function omitBy<O extends object>(predicate: Function, collection: O): Partial<O> {
  return _omitBy(collection, predicate as any)
}

export default wrap(omitBy)
