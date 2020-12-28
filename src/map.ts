import forEach from 'lodash/forEach'
import mapArray from 'lodash/map'
import mapObject from 'lodash/mapValues'
import {MergedUpdate} from './types'
import update from './update'
import wrap from './wrap'

function shallowEqual(object, otherObject) {
  let equal = true
  // eslint-disable-next-line consistent-return
  forEach(otherObject, (value, key) => {
    if (value !== object[key]) {
      equal = false

      // exit early
      return false
    }
  })

  return equal
}

function map(iteratee, object) {
  const updater = typeof iteratee === 'function' ? iteratee : update(iteratee)

  const mapper : any = Array.isArray(object) ? mapArray : mapObject

  const newObject = mapper(object, updater)
  const equal = shallowEqual(object, newObject)

  return equal ? object : newObject
}

type Mapped<I,O extends object> = {
    [ K in keyof O ]: MergedUpdate<I,O[K]>
}

export interface CurriedMap {
    <O,R>( iteratee: ( value: O, key: number  ) => R, object: O[] ): R[];
    <O,R>( iteratee: ( value: O, key: number  ) => R) : ( object: O[] ) => R[];

    <O,R>( iteratee: ( value: O, key: string  ) => R, object: { [key: string]: O } ): R[];
    <O,R>( iteratee: ( value: O, key: string  ) => R ): ( object: { [key: string]: O } ) => R[];


    <I,O extends object>(iteratee: I extends Function ? never : I, object: O): Mapped<I,O>
    <I,O extends object>(iteratee: I extends Function ? never : I ): (object: O) => Mapped<I,O>
};

export default wrap(map) as CurriedMap;
