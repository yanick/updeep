import reject from './reject'
import update from './update'

describe('reject', () => {
  it('can reject by index', () => {
    const result = reject((_, index) => index === 1, [3, 4, 5])

    expect(result).toEqual([3, 5])
  })

  it('can reject with callback shorthand', () => {
    const result = reject('bad', [{ bad: true }, { bad: false }])

    expect(result).toEqual([{ bad: false }])
  })

  it("returns the same instance if reject doesn't make changes", () => {
    const object = { foo: [1, 2, 3] }
    const result = update(
      {
        foo: reject((x) => x === 'Justin Bieber'),
      },
      object
    )

    expect(result).toEqual(object)
  })

  it('returns a different instance if reject makes changes', () => {
    const object = { foo: [1, 2, 3, 4] }
    const result = update(
      {
        foo: reject((x) => x === 4),
      },
      object
    )

    expect(result).not.toEqual(object)
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(reject('a', []))).toBeTruthy()
  })
})
