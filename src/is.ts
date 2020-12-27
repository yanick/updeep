import splitPath from './util/splitPath'
import curry, {Curried} from './util/curry'

import { Path } from './types'

type Mix<C> = (x: C, y: C) => C;

function is(path: Path, predicate: unknown, object: unknown) {
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
