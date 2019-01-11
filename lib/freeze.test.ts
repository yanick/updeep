import freeze from './freeze'

const u = { freeze }

describe('u.freeze', () => {
  afterEach(() => {
    delete process.env.NODE_ENV
  })

  it('freezes objects', () => {
    const object = {}
    u.freeze(object)

    expect(Object.isFrozen(object)).toBeTruthy()
  })

  it('freezes nested objects', () => {
    const object = { foo: { bar: 3 } }
    u.freeze(object)

    expect(Object.isFrozen(object.foo)).toBeTruthy()
  })

  it('freezes nested arrays', () => {
    const object = [[0]]
    u.freeze(object)

    expect(Object.isFrozen(object)).toBeTruthy()
    expect(Object.isFrozen(object[0])).toBeTruthy()
  })

  it('ignores functions', () => {
    const object = { foo: () => 1 }
    u.freeze(object)

    expect(Object.isFrozen(object.foo)).not.toBeTruthy()
  })

  it('ignores regexps', () => {
    const object = { foo: /\d/ }
    u.freeze(object)

    expect(Object.isFrozen(object.foo)).not.toBeTruthy()
  })

  it('does not freeze children if the parent is already frozen', () => {
    const object = { foo: {} }
    Object.freeze(object)
    u.freeze(object)

    expect(Object.isFrozen(object.foo)).not.toBeTruthy()
  })

  if (typeof process !== 'undefined') {
    it('does not freeze in production', () => {
      process.env.NODE_ENV = 'production'
      const object = {}
      u.freeze(object)

      expect(Object.isFrozen(object)).not.toBeTruthy()
    })
  }

  it('handles null objects', () => {
    const object = { foo: null }
    u.freeze(object)
    expect(Object.isFrozen(object)).toBeTruthy()
  })

  it('returns the same object', () => {
    const object = {}
    const result = u.freeze(object)
    expect(result).toEqual(object)
  })
})
