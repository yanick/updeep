import u from './index'

describe('u.if', () => {
  it('does not update if the predicate is false', () => {
    const object = { a: 0 }
    let result = u.if(false, { b: 1 }, object)
    expect(result).toEqual(object)

    result = u({ x: u.if(false, 1) }, {})
    expect(result).toEqual({})
  })

  it('does update if the predicate is true', () => {
    const object = { a: 0 }
    const result = u.if(true, { b: 1 }, object)
    expect(result).toEqual({ a: 0, b: 1 })
  })

  it('will use the result of a function passed as a predicate', () => {
    const object = { a: 0 }
    const aIsThree = ( x: { a: number} ) => x.a === 3
    const result = u.if(aIsThree, { b: 1 }, object)

    expect(result).toEqual({ a: 0 })
  })

  it('can be partially applied', () => {
    const object = { a: 2 }
    const isEven = (x:number) => x % 2 === 0
    const inc = (x:number) => x + 1

    const result = u(
      {
        a: u.if(isEven, inc),
      },
      object
    )

    expect(result).toEqual({ a: 3 })
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(u.if(true, {}, {}))).toBeTruthy()
    expect(Object.isFrozen(u.if(false, {}, {}))).toBeTruthy()
  })
})
