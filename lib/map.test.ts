import u from './index'
import { Mapped } from './map';

const inc = (x:number) => x + 1

const r1 = u.map(inc, [1,2,3]) // $ExpectType number[]
const r2 = u.map(inc, ["potato"]) // $ExpectType number[]
// TODO  ^^^ expect error, if iteraree is a function, arg is
// the values of the object

describe('u.map', () => {
  it('applies updates to each item in an array', () => {
    const object = [0, 1, 2]
    const result = u.map(inc, object)

    expect(result).toEqual([1, 2, 3])
  })

  it('applies updates to each value in an object', () => {
    const object = { a: 0, b: 1, c: 2 }
    const result = u.map(inc, object)

    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('can update with a regular updates object', () => {
    const object = [{ a: 0 }, { a: 0 }]
    const result = u.map({ a: 1 }, object)

    expect(result).toEqual([{ a: 1 }, { a: 1 }])
  })

  it('returns the same object if no updates are made', () => {
    const array = [0, 1]
    const ident = ( x:any ) => x
    let result = u.map(ident, array)

    expect(result).toEqual(array)

    const object = { a: 0 }
    let result2 = u.map(ident, object)

    expect(result2).toEqual(object)
  })

  it('passes the key or index as the second parameter to the iteratee', () => {
    const object = {
      a: { x: 0 },
      b: [3, 3],
    }
    const setToKey = (_:any, key:any) => key
    const result = u.map(u.map(setToKey), object)

    expect(result).toEqual({
      a: { x: 'x' },
      b: [0, 1],
    })
  })

  it('can be partially applied', () => {
    const object = {
      b: [3, 3],
    }
    const setToKey = (_:any, key:any) => key
    const result = u(
      {
        b: u.map(setToKey),
      },
      object
    )

    expect(result).toEqual({
      b: [0, 1],
    })
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(u.map({}, {}))).toBeTruthy
  })
})
