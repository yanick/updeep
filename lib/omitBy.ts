import _omitBy from 'lodash/omitBy'
import curry from 'lodash/curry'

function omitBy(predicate: any, collection: object) {
  return _omitBy(collection, predicate)
}

export default curry(omitBy)
