import u from '.'

describe('u.omitBy', () => {
  it('can omitBy with a function', () => {
    const predicate = (value, key) => value === 7 && key === 'bar'
    const result = u(
      { foo: u.omitBy(predicate) },
      { foo: { bar: 7, baz: 'a' } }
    )

    expect(result).toEqual({ foo: { baz: 'a' } })
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(u.omit('a', {}))).toBeTruthy()
  })
})
