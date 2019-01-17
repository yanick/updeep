import reject from 'lodash/reject'
import { Path } from '../types';

export default function splitPath(path: Path ): Array<string|number> {
  return Array.isArray(path) ? path : reject(`${path}`.split('.'), x => !x)
}
