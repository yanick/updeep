import forEach from 'lodash/forEach'
import mapArray from 'lodash/map'
import mapObject from 'lodash/mapValues'
import curry from './util/curry'
import update from './update'
import freeze from './freeze';
import { Source, Updates, MergedUpdate } from './types';

function shallowEqual(object: object, otherObject: object) {
  let equal = true
  // eslint-disable-next-line consistent-return
  forEach(otherObject, (value, key) => {
    if (value !== (object as any)[key]) {
      equal = false

      // exit early
      return false
    }
  })

  return equal
}

export type Mapped<I,O extends object> = {
    [ K in keyof O ]: O[K] //MergedUpdate<I,O[K]>
}

function map<I,O extends object>(iteratee: I, object: O): Mapped<I,O> {
  const updater = typeof iteratee === 'function' ? iteratee : update(iteratee)

  const mapper = Array.isArray(object) ? mapArray : mapObject

  const newObject = ( mapper as any )(object, updater )
  const equal = shallowEqual(object, newObject)

  return equal ? object : newObject
}

const frozen :typeof map = (...args: any[]) => freeze( (map as any)(...args) );

const wrapped = curry(frozen,2)

interface CurriedMap {
    <I,O extends object>(iteratee: I, object: O): Mapped<I,O>
};

export default wrapped as CurriedMap
