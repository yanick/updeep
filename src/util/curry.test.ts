import curry, { _ } from './curry'
import _curry from 'lodash/curry'

describe('curry1', () => {
  it('can curry one arguments', () => {
    const addOne = curry((x) => x + 1)
    expect(addOne(3)).toEqual(4)
    expect(addOne()(3)).toEqual(4)
  })

  it('will take up to two extra arguments', () => {
    const curried :any = curry((a, b, c) => [a, b, c])
    expect(curried(1, 2, 3, 4)).toEqual([1, 2, 3])
  })

  it('returns a fn with arity of 1', () => {
    const curried = curry((a, b, c) => [a, b, c])
  })
})

describe('curry2', () => {
  it('can curry two arguments', () => {
    const add = curry((x:number, y:number) => x + y)

    expect(add(3)(4)).toEqual(7)
    expect(add()(3)()(4)).toEqual(7)
    expect(add(3, 4)).toEqual(7)
  })

  it('will take up to two extra arguments', () => {
    const curried: any = curry((a, b, c, d) => [a, b, c, d])
    expect(curried(1, 2, 3, 4, 5)).toEqual([1, 2, 3, 4])
  })

  it('can use the placeholder', () => {
    const curried: any = curry((a, b, c, d) => [a, b, c, d])
    expect(curried(_, 2)(1, 3, 4)).toEqual([1, 2, 3, 4])
  })

  it('returns a fn with arity of 2', () => {
    const curried:any = curry((a, b, c, d) => [a, b, c, d])
  })
})

describe('curry3', () => {
  it('can curry three arguments', () => {
    const add = curry((x, y, z) => x + y + z)
    expect(add(3, _)(4)(5)).toEqual(12)
    expect(add()(3)()(4, 5)).toEqual(12)
    expect(add(3, 4, 5)).toEqual(12)
  })

  it('will take up to two extra arguments', () => {
    const curried :any= curry((a, b, c, d, e) => [a, b, c, d, e])
    expect(curried(1, 2, 3, 4, 5, 6)).toEqual([1, 2, 3, 4, 5])
  })

  it('can use the placeholder', () => {
    const curried:any = curry((a, b, c, d, e) => [a, b, c, d, e])
    expect(curried(_, 2)('a', 3, 4, 5)).toEqual(['a', 2, 3, 4, 5])
    expect(curried('b', _, 3)(2, 4, 5)).toEqual(['b', 2, 3, 4, 5])
    expect(curried(_, 2, 3)('c', 4, 5)).toEqual(['c', 2, 3, 4, 5])
    expect(curried(_, _, 3)('d', 2, 4, 5)).toEqual(['d', 2, 3, 4, 5])
  })

  it('returns a fn with arity of 3', () => {
    const curried: any = curry((a, b, c, d, e) => [a, b, c, d, e])
  })
})

describe('curry4', () => {
  it('can curry four arguments', () => {
    const add = curry((x, y, z, u) => x + y + z + u)
    expect(add(3, _)(4)(5)(6)).toEqual(18)
    expect(add()(3)()(4, 5, 6)).toEqual(18)
    expect(add(3, 4, 5, 6)).toEqual(18)
  })

  it('will take up to two extra arguments', () => {
    const curried :any= curry((a, b, c, d, e, f) => [a, b, c, d, e, f])
    expect(curried(1, 2, 3, 4, 5, 6, 7)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('can use the placeholder', () => {
    const curried :any= curry((a, b, c, d, e, f) => [a, b, c, d, e, f])
    expect(curried(_, 2)('a', 3, 4, 5, 6)).toEqual(['a', 2, 3, 4, 5, 6])
    expect(curried(_, 2, 3)('b', 4, 5, 6)).toEqual(['b', 2, 3, 4, 5, 6])
    expect(curried(_, 2, 3, 4)('c', 5, 6)).toEqual(['c', 2, 3, 4, 5, 6])

    expect(curried('d', _, 3)(2, 4, 5, 6)).toEqual(['d', 2, 3, 4, 5, 6])
    expect(curried('e', _, 3, 4)(2, 5, 6)).toEqual(['e', 2, 3, 4, 5, 6])

    expect(curried('f', 2, _, 4)(3, 5, 6)).toEqual(['f', 2, 3, 4, 5, 6])

    expect(curried(_, _, 3)('g', 2, 4, 5, 6)).toEqual(['g', 2, 3, 4, 5, 6])
    expect(curried(_, _, 3, 4)('h', 2, 5, 6)).toEqual(['h', 2, 3, 4, 5, 6])
    expect(curried(_, 2, _, 4)('i', 3, 5, 6)).toEqual(['i', 2, 3, 4, 5, 6])

    expect(curried('j', _, _, 4)(2, 3, 5, 6)).toEqual(['j', 2, 3, 4, 5, 6])

    expect(curried(_, _, _, 4)('k', 2, 3, 5, 6)).toEqual(['k', 2, 3, 4, 5, 6])
  })

  it('returns a fn with arity of 4', () => {
    const curried :any = curry((a, b, c, d, e, f) => [a, b, c, d, e, f])
  })
})
