import splitPath from './util/splitPath'
import curry from 'lodash/curry'
import { Source, Path } from './types';

type Predicate = any

export function is(path: Path, predicate: Predicate, object: Source): boolean {
  const parts = splitPath(path)

  let rest = object
  for (let i = 0; i < parts.length; i += 1) {
    if (typeof rest === 'undefined') return false
    const part = parts[i]
    rest = (rest as any)[part]
  }

  if (typeof predicate === 'function') {
    return predicate(rest)
  }

  return predicate === rest
}

export default curry(is)
