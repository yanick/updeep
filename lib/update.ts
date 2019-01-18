import isPlainObject = require( 'lodash/isPlainObject' )
import _omitBy = require( 'lodash/omitBy' )

import wrap from './wrap'
import constant from './constant'
import { Updates, Source, MergedUpdate, UpdateReturnType } from './types';

const innerOmitted = { __omitted: true }
export const omitted = constant(innerOmitted)

function isEmpty(object : object) {
  return !Object.keys(object).length
}

function reduce(object: object, callback: Function, initialValue: any) {
  return Object.keys(object).reduce(
    (acc, key) => callback(acc, (object as any)[key], key),
    initialValue
  )
}

function resolveUpdates(updates: Updates, object: Source) {
  return reduce(
    updates,
    (acc: any, value: any, key: any) => {
      let updatedValue = value

      if (
        !Array.isArray(value) &&
        value !== null &&
        typeof value === 'object'
      ) {
        updatedValue = update(value, (object as any)[key]) // eslint-disable-line no-use-before-define
      } else if (typeof value === 'function') {
        updatedValue = value( (object as any)[key])
      }

      if ( (object as any)[key] !== updatedValue) {
        (acc as any)[key] = updatedValue // eslint-disable-line no-param-reassign
      }

      return acc
    },
    {}
  )
}

function updateArray(updates: object, object: any[]) {
  const newArray = [...object]

  Object.keys(updates).forEach( (key: string) => {
    (newArray as any)[key] = (updates as any)[key]
  })

  return newArray
}

/**
 * Recursively update an object or array.
 *
 * Can update with values:
 * update({ foo: 3 }, { foo: 1, bar: 2 });
 * // => { foo: 3, bar: 2 }
 *
 * Or with a function:
 * update({ foo: x => (x + 1) }, { foo: 2 });
 * // => { foo: 3 }
 *
 * @function
 * @name update
 * @param {Object|Function} updates
 * @param {Object|Array}    object to update
 * @return {Object|Array}   new object with modifications
 */
function update<U>(updates: U extends object ? never: U, object: any ): U;
function update<U,O>(updates: U, object: O extends object ? never : O ): UpdateReturnType<U>;
function update<U,O>(updates: U, object: O, ...args: any[]): MergedUpdate<U,O>;
function update(updates: any, object: any, ...args: any[]): any {
  if (typeof updates === 'function') {
    return updates(object, ...args)
  }

  if (!isPlainObject(updates)) {
    return updates
  }

  const defaultedObject =
    typeof object === 'undefined' || object === null ? {} : object

  const resolvedUpdates = resolveUpdates(updates, defaultedObject)

  if (isEmpty(resolvedUpdates)) {
    return defaultedObject
  }

  if (Array.isArray(defaultedObject)) {
    return updateArray(resolvedUpdates, defaultedObject).filter(
      value => value !== innerOmitted
    )
  }

  return _omitBy(
    { ...defaultedObject, ...resolvedUpdates },
    (value:any) => value === innerOmitted
  )
}

const wrapped = wrap(update,2)

interface CurriedUpdate1<U> {
    <O>( object: O extends object ? never : O ): UpdateReturnType<U>;
    <O>( object: O, ...args: any[]):  MergedUpdate<U,O>;
}

interface CurriedUpdate {
    <U>(updates: U extends object ? never: U, object: any ): U;
    <U,O>(updates: U, object: O extends object ? never : O ): UpdateReturnType<U>;
    <U,O>(updates: U, object: O, ...args: any[]): MergedUpdate<U,O>;

    <U>(updates: U extends object ? never: U ): ( object: any ) => U;
    <U>(updates: U ): CurriedUpdate1<U>
}


export default wrapped as CurriedUpdate;
