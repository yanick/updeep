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
declare function freeze<O>(object: O): O;
export default freeze;
