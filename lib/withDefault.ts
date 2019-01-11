import update from './update'
import curry from 'lodash/curry'

function withDefault(defaultValue: object, updates: any, object: any) {
  if (typeof object === 'undefined') {
    return update(updates, defaultValue)
  }

  return update(updates, object)
}

export default curry(withDefault)
