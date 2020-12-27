function isFreezable(object: unknown) {
  if (object === null) return false
  if (object instanceof RegExp) return false
  if (object instanceof ArrayBuffer) return false

  return Array.isArray(object) || typeof object === 'object'
}

function needsFreezing(object: unknown) {
  return isFreezable(object) && !Object.isFrozen(object)
}

function recur(object: unknown) {
  Object.freeze(object)

  Object.keys(object as object).forEach((key) => {
    const value = (object as object)[key]
    if (needsFreezing(value)) {
      recur(value)
    }
  })

  return object
}

/**
 * Deeply freeze a plain javascript object.
 *
 * If `process.env.NODE_ENV === 'production'`, this returns the original object
 * without freezing.
 *
 * Or if `process.env.UPDEEP_MODE === 'dangerously_never_freeze'`, this returns the original object
 * without freezing.
 *
 * @function
 * @sig a -> a
 * @param  {object} object Object to freeze.
 * @return {object} Frozen object, unless in production, then the same object.
 */
function freeze<O extends unknown>(object: O): Readonly<O> {
  // is `process` defined? I.e., are we in a browser?
  if( typeof process === 'undefined' ) {
      return object;
  }

  if (process.env.NODE_ENV === 'production') {
    return object
  }

  if (process.env.UPDEEP_MODE === 'dangerously_never_freeze') {
    return object
  }

  if (needsFreezing(object)) {
    recur(object)
  }

  return object
}

export default freeze
