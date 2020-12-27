import u from '.'

describe('u.is', () => {
  it('returns true if path matches a value predicate', () => {
    const result = u.is('a.b', 4, { a: { b: 4 } })
    expect(result).toBeTruthy()
  })

  it('returns true if path matches a function predicate', () => {
    const isEven = (x) => x % 2 === 0
    const result = u.is('a.b', isEven, { a: { b: 6 } })
    expect(result).toBeTruthy()
  })

  it('returns false if path matches a value predicate', () => {
    const result = u.is('a.b', 4, { a: { b: 5 } })
    expect(result).toBeFalsy
  })

  it('returns false if path matches a function predicate', () => {
    const isEven = (x) => x % 2 === 0
    const result = u.is('a.b', isEven, { a: { b: 7 } })
    expect(result).toBeFalsy
  })

  it('returns false if the path does not exist', () => {
    const result = u.is('a.b.c.d', 4, { a: { b: {} } })
    expect(result).toBeFalsy
  })

  it('can test for undefined', () => {
    const result = u.is('a.b.c', undefined, { a: { b: {} } })
    expect(result).toBeTruthy()
  })

  it('tests the actual object if a blank path is given', () => {
    const result = u.is('', 4, 4)
    expect(result).toBeTruthy()
  })

  it('can use arrays as paths', () => {
    const result = u.is(['a', 'b'], 4, { a: { b: 4 } })
    expect(result).toBeTruthy()
  })

  it('can include array indexes in paths', () => {
    let result = u.is('a.1.b', 4, { a: [{}, { b: 4 }] })
    expect(result).toBeTruthy()

    result = u.is(['a', 1, 'b'], 4, { a: [{}, { b: 4 }] })
    expect(result).toBeTruthy()
  })

  it('can be partially applied', () => {
    const result = u.is('a.b')(4)({ a: { b: 4 } })
    expect(result).toBeTruthy()
  })
})
