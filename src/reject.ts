import _reject from 'lodash/reject'
import wrap, {Wrap} from './wrap'

export type Reject<C extends any> =
    Wrap< [ unknown,  C[] ], C[] >;

export function reject<C>(predicate: unknown, collection: C[]): C[] {
  const result = _reject(collection, predicate as any)
  const equal = collection.length === result.length

  return equal ? collection : result
}

export default wrap(reject) as Wrap<
    Parameters<typeof reject>, ReturnType<typeof reject>
>;
