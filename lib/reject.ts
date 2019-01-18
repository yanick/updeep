import _reject = require('lodash/reject');
import curry from './util/curry'
import freeze from './freeze';

function reject<C extends object>(predicate: any, collection: C): C extends any[] ? C : object
    {
  const result = (_reject as any)(collection, predicate as any)

  let equal;
  if( Array.isArray(collection) ) {
    equal = collection.length === result.length
  }
  else {
      equal = Object.keys(collection).length === Object.keys(result).length
  }


  return ( equal ? collection : result ) as C extends any[] ? C : object
}

const frozen :typeof reject = (...args: any[]) => freeze( (reject as any)(...args) );

const wrapped = curry(frozen,2)

interface CurriedReject {
    <C extends any[]>(predicate: any, collection: C): C;
    <C extends object>(predicate: any, collection: C):
        Array< C[ keyof C ] >
        ;

    <C extends any[]>(predicate: any ): ( collection: C) => C;
    <C extends object>(predicate: any):( collection: C) =>
        Array< C[ keyof C ] >
        ;
}

export default wrapped as CurriedReject
