import curry from 'lodash/curry'
import update from './update'
import map from './map'
import splitPath from './util/splitPath'
import { Path, Updates, Source, PathPart } from './types';

const wildcard = '*'

function reducePath(acc:Updates, key: PathPart) {
  if (key === wildcard) {
    return ( value: any ) =>
      Object.prototype.hasOwnProperty.call(value, wildcard)
        ? // If we actually have wildcard as a property, update that
          update({ [wildcard]: acc }, value)
        : // Otherwise map over all properties
          map(acc, value)
  }

  return { [key]: acc }
}

function updateIn(path: Path, value: Updates, object: Source) {
  const parts = splitPath(path)
  const updates = parts.reduceRight(reducePath, value)

  return update(updates, object)
}


export default curry(updateIn)
