import _omit from 'lodash/omit'
import wrap from './wrap'

function omit(predicate: string[]|string, collection:object): object {
  return _omit(collection, predicate)
}

export default wrap(omit)
