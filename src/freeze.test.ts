import freeze from './freeze'

describe('freeze', () => {
  afterEach(() => {
    delete process.env.NODE_ENV
  })

  it('freezes objects', () => {
    const object = {}
    freeze(object)

    expect(Object.isFrozen(object)).toBeTruthy()
  })

  it('freezes nested objects', () => {
    const object = { foo: { bar: 3 } }
    freeze(object)

    expect(Object.isFrozen(object.foo)).toBeTruthy()
  })

  it('freezes nested arrays', () => {
    const object = [[0]]
    freeze(object)

    expect(Object.isFrozen(object)).toBeTruthy()
    expect(Object.isFrozen(object[0])).toBeTruthy()
  })

  it('ignores functions', () => {
    const object = { foo: () => 1 }
    freeze(object)

    expect(Object.isFrozen(object.foo)).toBeFalsy
  })

  it('ignores regexps', () => {
    const object = { foo: /\d/ }
    freeze(object)

    expect(Object.isFrozen(object.foo)).toBeFalsy
  })

  it('does not freeze children if the parent is already frozen', () => {
    const object = { foo: {} }
    Object.freeze(object)
    freeze(object)

    expect(Object.isFrozen(object.foo)).toBeFalsy
  })

  it('does not freeze in production', () => {
    process.env.NODE_ENV = 'production'

    const object = {}
    freeze(object)

    expect(Object.isFrozen(object)).toBeFalsy
  })

  it('handles null objects', () => {
    const object = { foo: null }
    freeze(object)
    expect(Object.isFrozen(object)).toBeTruthy()
  })

  it('returns the same object', () => {
    const object = {}
    const result = freeze(object)
    expect(result).toEqual(object)
  })
})
