import curry from './util/curry'
import update from './update'
import map from './map'
import splitPath from './util/splitPath'
import {Path} from './types'

const wildcard = '*'

function reducePath(acc, key) {
  if (key === wildcard) {
    return (value) =>
      Object.prototype.hasOwnProperty.call(value, wildcard)
        ? // If we actually have wildcard as a property, update that
          update({ [wildcard]: acc }, value)
        : // Otherwise map over all properties
          map(acc, value)
  }

  return { [key]: acc }
}

function updateIn(path: Path, value: any, object: object): object {
  const parts = splitPath(path)
  const updates = parts.reduceRight(reducePath, value)

  return update(updates, object)
}

export default curry(updateIn)
