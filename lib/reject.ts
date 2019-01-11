import _reject from 'lodash/reject'
import curry from 'lodash/curry'
import freeze from './freeze';

function reject(predicate: boolean|Function|string, collection: any[]) {
  const result = _reject(collection, predicate as any)
  const equal = collection.length === result.length

  return equal ? collection : result
}

const frozen :typeof reject = (...args: any[]) => freeze( (reject as any)(...args) );

const wrapped = curry(frozen,2)

export default wrapped
