import splitPath from './util/splitPath'
import curry from './util/curry'
import { Source, Path } from './types';

export function is(path: Path, predicate: any, object: any): boolean {
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

interface CurriedIs {
    ( path: Path, predicate: any, object: any ): boolean;
    ( path: Path, predicate: any ): (object: any ) => boolean;
    ( path: Path ):( predicate: any ) => (object: any ) => boolean;
}

export default curry(is) as CurriedIs;
