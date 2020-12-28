import _reject from 'lodash/reject'
import wrap, {Wrap} from './wrap'

interface CurriedReject {
    <C extends any[]>(predicate: any, collection: C): C;
    <C extends object>(predicate: any, collection: C): Array< C[ keyof C ] >
        ;

    <C extends any[]>(predicate: any ): ( collection: C) => C;
    <C extends object>(predicate: any):( collection: C) => Array< C[ keyof C ] >
        ;
}


function reject(predicate: any, collection: any) {
  const result = _reject(collection, predicate as any)
  const equal = collection.length === result.length

  return equal ? collection : result
}

export default wrap(reject) as CurriedReject;
