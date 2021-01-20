import u from '.'

describe('u.if', () => {
  test('does not update if the predicate is false', () => {
    const object = {a: 0}
    let result = u.if(false, {b: 1}, object)
    expect(result).toEqual(object)

    result = (u as any)({x: u.if(false, 1)}, {})
    expect(result).toEqual({})
  })

  test('does update if the predicate is true', () => {
    const object = {a: 0}
    const result = u.if(true, {b: 1}, object)
    expect(result).toEqual({a: 0, b: 1})
  })

  test('will use the result of a function passed as a predicate', () => {
    const object = {a: 0}
    const aIsThree = (x) => x.a === 3
    const result = u.if(aIsThree, {b: 1}, object)

    expect(result).toEqual({a: 0})
  })

  test('plain objects are used as matches', () => {
    expect(u.if({a: 1}, {b: 2}, {a: 3, b: 1})).toMatchObject({a: 3, b: 1})

    expect(u.if({a: 1}, {b: 2}, {a: 1})).toMatchObject({a: 1, b: 2})
  })

  test('can be partially applied', () => {
    const object = {a: 2}
    const isEven = (x) => x % 2 === 0
    const inc = (x) => x + 1

    const result = u(
      {
        a: u.if(isEven, inc),
      },
      object
    )

    expect(result).toEqual({a: 3})
  })

  test('freezes the result', () => {
    expect(Object.isFrozen(u.if(true, {}, {}))).toBeTruthy()
    expect(Object.isFrozen(u.if(false, {}, {}))).toBeTruthy()
  })
})
