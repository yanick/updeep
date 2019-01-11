import ifElse from './ifElse'
import curry from 'lodash/curry'
import { Source, Predicate, Updates } from './types';

export default curry((predicate: Predicate, trueUpdates: Updates, object: Source) =>
  ifElse(predicate, trueUpdates, (x: any) => x, object)
)
